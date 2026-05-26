import { Router } from "express"

import {

    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct

} from "../controllers/products.controller.js"
import uploader from "../middlewares/uploader.js"

const router = Router()

router.get(
    "/",
    getProducts
)

router.get(
    "/:pid",
    getProductById
)

router.post(
    "/realtime",
    uploader.single("thumbnail"),
    async (req, res) => {

        const io =
            req.app.get("io")

        const product = {

            title:
                req.body.title,

            description:
                req.body.description,

            code:
                `CODE${Date.now()}`,

            price:
                Number(req.body.price),

            status: true,

            stock:
                Number(req.body.stock),

            category:
                req.body.category,

            thumbnails: [

                `/images/products/${req.file.filename}`

            ]

        }

        const newProduct =
            await productManager.addProduct(
                product
            )

        const updatedProducts =
            await productManager.getProducts({

                limit: 100

            })

        io.emit(
            "updateProducts",
            updatedProducts.payload
        )

        res.json(newProduct)

    }
)

router.post(
    "/",
    createProduct
)

router.put(
    "/:pid",
    updateProduct
)

router.delete(
    "/:pid",
    deleteProduct
)

export default router