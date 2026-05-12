import { Router } from "express"

import ProductManager from "../dao/filesystem/ProductManager.js"

const router = Router()

const productManager = new ProductManager()

router.get("/", (req, res) => {

    res.redirect("/products")

})

router.get("/products", async (req, res) => {

    const result = await productManager.getProducts()

    res.render("products", {
        products: result.payload
    })

})

router.get("/products/:pid", async (req, res) => {

    const { pid } = req.params

    const product = await productManager.getProductById(pid)

    if (!product) {

        return res.status(404).send("Producto no encontrado")

    }

    res.render("productDetail", {
        product
    })

})

router.get("/realtimeproducts", (req, res) => {

    res.render("realTimeProducts")

})
export default router