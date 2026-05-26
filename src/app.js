import dotenv from "dotenv"
dotenv.config()
import express from "express"
import session from "express-session"
import { engine } from "express-handlebars"
import { createServer } from "http"
import { Server } from "socket.io"
import path from "path"
import { fileURLToPath } from "url"
import bcrypt from "bcrypt"
import connectDB from "./config/db.js"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import ProductsMongo from "./dao/mongo/ProductsMongo.js"
import User from "./models/User.js"
import errorHandler from "./middlewares/errorHandler.js"
import { configureSocket }
from "./sockets/socket.js"

const app = express()

connectDB()


const httpServer =
    createServer(app)

const io =
    new Server(httpServer)
    app.set("io", io)

configureSocket(io)

const __filename =
    fileURLToPath(import.meta.url)

const __dirname =
    path.dirname(__filename)

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

app.use(session({

    secret: "borealSecret",

    resave: false,

    saveUninitialized: false

}))

app.use((req, res, next) => {

    res.locals.user =
        req.session.user || null 

    next()

})

app.use(
    express.static(
        path.join(
            __dirname,
            "public"
        )
    )
)

const hbs = engine({

    partialsDir:
        path.join(
            __dirname,
            "views/partials"
        ),

    helpers: {

        eq: function(a, b) {

            return a === b

        }

    }

})

app.engine(
    "handlebars",
    hbs
)

app.set(
    "view engine",
    "handlebars"
)

app.set(
    "views",
    path.join(__dirname, "views")
)

const createAdmin = async () => {

    const adminExists =
        await User.findOne({

            email:
                "admin@boreal.com"

        })

    if (!adminExists) {

        await User.create({

            first_name: "Admin",

            email:
                "admin@boreal.com",

            password:
                bcrypt.hashSync(
                    "1234",
                    10
                ),

            role: "admin"

        })

        console.log(
            "Admin creado"
        )

    }

}

createAdmin()

app.use(
    "/api/sessions",
    sessionsRouter
)

app.use(
    "/api/products",
    productsRouter
)

app.use(
    "/api/carts",
    cartsRouter
)

app.use(
    "/",
    viewsRouter
)

app.use(errorHandler)

const PORT = 8080

httpServer.listen(PORT, () => {

    console.log(
        `Servidor funcionando en puerto ${PORT}`
    )

})