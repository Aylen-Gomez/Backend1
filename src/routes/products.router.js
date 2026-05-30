import { Router } from "express"

import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/products.controller.js"

import uploader from "../middlewares/uploader.js"
import ProductsMongo from "../dao/mongo/ProductsMongo.js"

const router = Router()

const productManager =
    new ProductsMongo()

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

        try {
            console.log("=== PETICION RECIBIDA ===")

            console.log("BODY:")
            console.log(req.body)

            console.log("FILE:")
            console.log(req.file)

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

                thumbnails:
                    req.file
                        ? [
                            `/images/products/${req.file.filename}`
                        ]
                        : []

            }
            console.log("PRODUCTO A GUARDAR:")
            console.log(product)
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

            res.status(201).json(
                newProduct
            )

        } catch (error) {

            console.log(error)

            res.status(500).json({

                status: "error",

                message:
                    "Error interno del servidor"

            })

        }

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