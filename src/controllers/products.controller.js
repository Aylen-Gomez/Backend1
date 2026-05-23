import ProductsMongo
from "../dao/mongo/ProductsMongo.js"

const productManager =
    new ProductsMongo()

export const getProducts =
    async (req, res) => {

        const {
            limit = 10,
            page = 1,
            query,
            sort
        } = req.query

        const products =
            await productManager.getProducts({

                limit:
                    Number(limit),

                page:
                    Number(page),

                query,
                sort

            })

        res.json(products)

}

export const getProductById =
    async (req, res) => {

        const { pid } = req.params

        const product =
            await productManager.getProductById(pid)

        if (!product) {

            return res.status(404).json({

                error:
                    "Producto no encontrado"

            })

        }

        res.json(product)

}

export const createProduct =
    async (req, res) => {

        const {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
        } = req.body

        if (
            !title ||
            !description ||
            !code ||
            price === undefined ||
            status === undefined ||
            stock === undefined ||
            !category
        ) {

            return res.status(400).json({

                error:
                    "Faltan campos obligatorios"

            })

        }

        const newProduct =
            await productManager.addProduct({

                title,
                description,
                code,
                price,
                status,
                stock,
                category,

                thumbnails:
                    thumbnails || []

            })

        res.status(201).json(newProduct)

}

export const updateProduct =
    async (req, res) => {

        const { pid } = req.params

        const updatedProduct =
            await productManager.updateProduct(
                pid,
                req.body
            )

        if (!updatedProduct) {

            return res.status(404).json({

                error:
                    "Producto no encontrado"

            })

        }

        res.json(updatedProduct)

}

export const deleteProduct =
    async (req, res) => {

        const { pid } = req.params

        const deleted =
            await productManager.deleteProduct(pid)

        if (!deleted) {

            return res.status(404).json({

                error:
                    "Producto no encontrado"

            })

        }

        res.json({

            message:
                "Producto eliminado"

        })

}