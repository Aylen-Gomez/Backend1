import { Router } from "express"

import ProductsMongo from "../dao/mongo/ProductsMongo.js"
import CartsMongo from "../dao/mongo/CartsMongo.js"

const router = Router()

const productManager = new ProductsMongo()
const cartManager = new CartsMongo()

router.get("/", (req, res) => {

    res.redirect("/products")

})

router.get("/products", async (req, res) => {

    const {
        limit = 10,
        page = 1,
        query,
        sort
    } = req.query

    const result =
        await productManager.getProducts({

            limit: Number(limit),
            page: Number(page),
            query,
            sort

        })

    res.render("products", {

        products: result.payload,

        totalPages: result.totalPages,

        page: result.page,

        hasPrevPage: result.hasPrevPage,

        hasNextPage: result.hasNextPage,

        prevLink: result.prevLink,

        nextLink: result.nextLink

    })

})

router.get("/products/:pid", async (req, res) => {

    const { pid } = req.params

    const product =
        await productManager.getProductById(pid)

    if (!product) {

        return res
            .status(404)
            .send("Producto no encontrado")

    }

    res.render("productDetail", {
        product
    })

})

router.get("/carts/:cid", async (req, res) => {

    const { cid } = req.params

    const cart =
        await cartManager.getCartById(cid)

    if (!cart) {

        return res
            .status(404)
            .send("Carrito no encontrado")

    }

    res.render("cart", {
        cart
    })

})

router.get("/realtimeproducts", (req, res) => {

    res.render("realTimeProducts")

})

export default router