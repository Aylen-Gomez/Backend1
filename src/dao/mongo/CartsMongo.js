import Cart from "../../models/Cart.js"

class CartsMongo {

    async createCart() {

        return await Cart.create({

            products: []

        })

    }

    async getCartById(id) {

        return await Cart.findById(id)

            .populate("products.product")

            .lean()

    }

    async addProductToCart(cartId, productId) {

        console.log("CART ID:", cartId)

        console.log("PRODUCT ID:", productId)

        const cart =
            await Cart.findById(cartId)

        console.log("FOUND CART:", cart)

        if (!cart) {

            return null

        }

        const existingProduct =
            cart.products.find(

                item =>

                    item.product &&
                    item.product.toString() === productId

            )

        if (existingProduct) {

            existingProduct.quantity++

        } else {

            cart.products.push({

                product: productId,

                quantity: 1

            })

        }

        await cart.save()

        return cart

    }

    async removeProductFromCart(cartId, productId) {

        const cart =
            await Cart.findById(cartId)

        if (!cart) {

            return null

        }

        cart.products =
            cart.products.filter(

                item =>

                    item.product &&
                    item.product.toString() !== productId

            )

        await cart.save()

        return cart

    }

    async updateCart(cartId, products) {

        const updatedCart =
            await Cart.findByIdAndUpdate(

                cartId,

                { products },

                { new: true }

            )

        return updatedCart

    }

    async updateProductQuantity(

        cartId,
        productId,
        quantity

    ) {

        const cart =
            await Cart.findById(cartId)

        if (!cart) {

            return null

        }

        const product =
            cart.products.find(

                item =>

                    item.product &&
                    item.product.toString() === productId

            )

        if (!product) {

            return null

        }

        product.quantity = quantity

        await cart.save()

        return cart

    }

    async clearCart(cartId) {

        const cart =
            await Cart.findById(cartId)

        if (!cart) {

            return null

        }

        cart.products = []

        await cart.save()

        return cart

    }

}

export default CartsMongo