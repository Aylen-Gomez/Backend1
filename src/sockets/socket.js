import ProductsMongo
from "../dao/mongo/ProductsMongo.js"

const productManager =
    new ProductsMongo()

export const configureSocket = (io) => {

    io.on("connection", async socket => {

        console.log("Cliente conectado")

        /* ========================= */
        /* REALTIME PRODUCTS */
        /* ========================= */

        const result =
            await productManager.getProducts()

        socket.emit(
            "updateProducts",
            result.payload
        )

        socket.on(
            "newProduct",
            async product => {

                const completeProduct = {

                    description:
                        product.description
                        || "Sin descripcion",

                    code:
                        `CODE${Date.now()}`,

                    status: true,

                    stock:
                        product.stock || 0,

                    category:
                        product.category
                        || "General",

                    thumbnails:
                        product.thumbnails || [],

                    ...product

                }

                await productManager.addProduct(
                    completeProduct
                )

                const updatedProducts =
                    await productManager.getProducts()

                io.emit(
                    "updateProducts",
                    updatedProducts.payload
                )

            }

        )

        /* ========================= */
        /* CHAT BOT */
        /* ========================= */

        socket.on("message", message => {

            io.emit("message", {

                user: "Usuario",

                text: message

            })

            let botResponse =
                "No entendí tu consulta 😅"

            if (
                message.toLowerCase().includes("hola")
            ) {

                botResponse =
                    "¡Hola! 👋 Bienvenido a Boreal"

            }

            if (
                message.toLowerCase().includes("termo")
            ) {

                botResponse =
                    "Tenemos termos de 1L y 1.2L ❄"

            }

            io.emit("message", {

                user: "Bot Boreal",

                text: botResponse

            })

        })

    })

}