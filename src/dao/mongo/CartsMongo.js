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

    }

    async addProductToCart(cartId, productId) {

        const cart =
            await Cart.findById(cartId)

        const existingProduct =
            cart.products.find(
                item =>
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

}

export default CartsMongo