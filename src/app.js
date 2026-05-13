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

app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)
app.use("/", viewsRouter)
app.use(errorHandler)

io.on("connection", async socket => {

    console.log("Cliente conectado")

    const result = await productManager.getProducts()

    socket.emit("updateProducts", result.payload)

    socket.on("newProduct", async product => {

        const completeProduct = {
            description: "Sin descripcion",
            code: `CODE${Date.now()}`,
            status: true,
            stock: 10,
            category: "General",
            thumbnails: [],
            ...product
        }

        await productManager.addProduct(
            completeProduct
        )

        const updatedProducts =
            await productManager.getProducts()

        io.emit(
            "updateProducts",
            updatedProducts.payload
        )

    })

})

const PORT = 8080

httpServer.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`)
})