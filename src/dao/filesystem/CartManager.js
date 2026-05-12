import fs from "fs/promises"
import path from "path"

class CartManager {

    constructor() {

        this.path = path.resolve("src/data/carts.json")

    }

    async getCarts() {

        try {

            const data = await fs.readFile(this.path, "utf-8")

            return JSON.parse(data)

        } catch (error) {

            return []

        }

    }

    async createCart() {

        const carts = await this.getCarts()

        const newCart = {
            id: carts.length > 0
                ? carts[carts.length - 1].id + 1
                : 1,
            products: []
        }

        carts.push(newCart)

        await fs.writeFile(
            this.path,
            JSON.stringify(carts, null, 2)
        )

        return newCart

    }

    async getCartById(id) {

        const carts = await this.getCarts()

        return carts.find(
            cart => cart.id === Number(id)
        )

    }

    async addProductToCart(cartId, productId) {

        const carts = await this.getCarts()

        const cartIndex = carts.findIndex(
            cart => cart.id === Number(cartId)
        )

        if (cartIndex === -1) {

            return null

        }

        const productIndex = carts[cartIndex].products.findIndex(
            product => product.product === Number(productId)
        )

        if (productIndex !== -1) {

            carts[cartIndex].products[productIndex].quantity += 1

        } else {

            carts[cartIndex].products.push({
                product: Number(productId),
                quantity: 1
            })

        }

        await fs.writeFile(
            this.path,
            JSON.stringify(carts, null, 2)
        )

        return carts[cartIndex]

    }

    async removeProductFromCart(cartId, productId) {

        const carts = await this.getCarts()

        const cartIndex = carts.findIndex(
            cart => cart.id === Number(cartId)
        )

        if (cartIndex === -1) {

            return null

        }

        carts[cartIndex].products =
            carts[cartIndex].products.filter(
                product => product.product !== Number(productId)
            )

        await fs.writeFile(
            this.path,
            JSON.stringify(carts, null, 2)
        )

        return carts[cartIndex]

    }

    async updateCart(cartId, products) {

        const carts = await this.getCarts()

        const cartIndex = carts.findIndex(
            cart => cart.id === Number(cartId)
        )

        if (cartIndex === -1) {

            return null

        }

        carts[cartIndex].products = products

        await fs.writeFile(
            this.path,
            JSON.stringify(carts, null, 2)
        )

        return carts[cartIndex]

    }

    async updateProductQuantity(cartId, productId, quantity) {

        const carts = await this.getCarts()

        const cartIndex = carts.findIndex(
            cart => cart.id === Number(cartId)
        )

        if (cartIndex === -1) {

            return null

        }

        const productIndex = carts[cartIndex].products.findIndex(
            product => product.product === Number(productId)
        )

        if (productIndex === -1) {

            return null

        }

        carts[cartIndex].products[productIndex].quantity = quantity

        await fs.writeFile(
            this.path,
            JSON.stringify(carts, null, 2)
        )

        return carts[cartIndex]

    }

    async clearCart(cartId) {

        const carts = await this.getCarts()

        const cartIndex = carts.findIndex(
            cart => cart.id === Number(cartId)
        )

        if (cartIndex === -1) {

            return null

        }

        carts[cartIndex].products = []

        await fs.writeFile(
            this.path,
            JSON.stringify(carts, null, 2)
        )

        return carts[cartIndex]

    }

}

export default CartManager