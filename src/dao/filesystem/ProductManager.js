import fs from "fs/promises"
import path from "path"

class ProductManager {

    constructor() {

        this.path = path.resolve("src/data/products.json")

    }
async readProductsFile() {

    try {

        const data = await fs.readFile(this.path, "utf-8")

        return JSON.parse(data)

    } catch (error) {

        return []

    }

}


async getProducts({
    limit = 10,
    page = 1,
    query,
    sort
} = {}) {

    try {

        let products = await this.readProductsFile()

        if (query) {

            products = products.filter(product =>

                product.category?.toLowerCase() === query.toLowerCase()
                ||
                product.status?.toString() === query

            )

        }

        if (sort === "asc") {

            products.sort((a, b) => a.price - b.price)

        }

        if (sort === "desc") {

            products.sort((a, b) => b.price - a.price)

        }

        const totalProducts = products.length

        const totalPages = Math.ceil(totalProducts / limit)

        const startIndex = (page - 1) * limit

        const endIndex = startIndex + limit

        const paginatedProducts = products.slice(
            startIndex,
            endIndex
        )

        return {
            status: "success",
            payload: paginatedProducts,
            totalPages,
            prevPage: page > 1 ? page - 1 : null,
            nextPage: page < totalPages ? page + 1 : null,
            page,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
            prevLink: page > 1
                ? `/api/products?page=${page - 1}`
                : null,
            nextLink: page < totalPages
                ? `/api/products?page=${page + 1}`
                : null
        }

    } catch (error) {

        return {
            status: "error",
            payload: []
        }

    }

}

    async getProductById(id) {

        const products = await this.readProductsFile()

        return products.find(
            product => product.id === Number(id)
        )

    }

    async addProduct(productData) {

        const products = await this.readProductsFile()

        const newProduct = {
            id: products.length > 0
                ? products[products.length - 1].id + 1
                : 1,
            ...productData
        }

        products.push(newProduct)

        await fs.writeFile(
            this.path,
            JSON.stringify(products, null, 2)
        )

        return newProduct

    }

    async updateProduct(id, updatedData) {

        const products = await this.readProductsFile()

        const productIndex = products.findIndex(
            product => product.id === Number(id)
        )

        if (productIndex === -1) {

            return null

        }

        products[productIndex] = {
            ...products[productIndex],
            ...updatedData,
            id: products[productIndex].id
        }

        await fs.writeFile(
            this.path,
            JSON.stringify(products, null, 2)
        )

        return products[productIndex]

    }

    async deleteProduct(id) {

        const products = await this.readProductsFile()

        const filteredProducts = products.filter(
            product => product.id !== Number(id)
        )

        if (products.length === filteredProducts.length) {

            return false

        }

        await fs.writeFile(
            this.path,
            JSON.stringify(filteredProducts, null, 2)
        )

        return true

    }

}

export default ProductManager