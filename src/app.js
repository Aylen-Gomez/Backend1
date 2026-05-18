import dotenv from "dotenv"
dotenv.config()

import express from "express"
import { engine } from "express-handlebars"
import { createServer } from "http"
import { Server } from "socket.io"
import path from "path"
import { fileURLToPath } from "url"

import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import viewsRouter from "./routes/views.router.js"
// import ProductManager from "./dao/filesystem/ProductManager.js"
import ProductsMongo from "./dao/mongo/ProductsMongo.js"
import connectDB from "./config/db.js"
import errorHandler from "./middlewares/errorHandler.js"
import { configureSocket } from "./sockets/socket.js"

const app = express()
connectDB()

const httpServer = createServer(app)

const io = new Server(httpServer)
// const productManager = new ProductManager()
const productManager = new ProductsMongo()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, "public")))

const hbs = engine({

    partialsDir:
        path.join(__dirname, "views/partials"),

    helpers: {

        eq: function (a, b) {

            return a === b

        }

    }

})

app.engine("handlebars", hbs)
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter)
app.use(errorHandler)

const PORT = 8080

httpServer.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
})