import { Router } from "express"

import CartsMongo from "../dao/mongo/CartsMongo.js"

const router = Router()

const cartManager = new CartsMongo()

router.post("/", async (req, res) => {

    const newCart = await cartManager.createCart()

    res.status(201).json(newCart)

})

router.get("/:cid", async (req, res) => {

    const { cid } = req.params

    const cart = await cartManager.getCartById(cid)

    if (!cart) {

        return res.status(404).json({
            error: "Carrito no encontrado"
        })

    }

    res.json(cart)

})

router.post("/:cid/products/:pid", async (req, res) => {

    const { cid, pid } = req.params

    const updatedCart = await cartManager.addProductToCart(
        cid,
        pid
    )

    if (!updatedCart) {

        return res.status(404).json({
            error: "Carrito no encontrado"
        })

    }

    res.json(updatedCart)

})

router.delete("/:cid/products/:pid", async (req, res) => {

    const { cid, pid } = req.params

    const updatedCart = await cartManager.removeProductFromCart(
        cid,
        pid
    )

    if (!updatedCart) {

        return res.status(404).json({
            error: "Carrito no encontrado"
        })

    }

    res.json(updatedCart)

})

router.put("/:cid", async (req, res) => {

    const { cid } = req.params

    const updatedCart = await cartManager.updateCart(
        cid,
        req.body.products
    )

    if (!updatedCart) {

        return res.status(404).json({
            error: "Carrito no encontrado"
        })

    }

    res.json(updatedCart)

})

router.put("/:cid/products/:pid", async (req, res) => {

    const { cid, pid } = req.params

    const { quantity } = req.body

    const updatedCart =
        await cartManager.updateProductQuantity(
            cid,
            pid,
            quantity
        )

    if (!updatedCart) {

        return res.status(404).json({
            error: "Carrito o producto no encontrado"
        })

    }

    res.json(updatedCart)

})

router.delete("/:cid", async (req, res) => {

    const { cid } = req.params

    const clearedCart = await cartManager.clearCart(cid)

    if (!clearedCart) {

        return res.status(404).json({
            error: "Carrito no encontrado"
        })

    }

    res.json(clearedCart)

})

export default router