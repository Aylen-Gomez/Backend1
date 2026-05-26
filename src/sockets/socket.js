import ProductsMongo from "../dao/mongo/ProductsMongo.js"

const productManager =
    new ProductsMongo()

export const configureSocket = (io) => {

    io.on("connection", async socket => {

        console.log("Cliente conectado")

        const result =
            await productManager.getProducts({

                limit: 100

            })

        socket.emit(
            "updateProducts",
            result.payload
        )

        socket.on("message", message => {

            io.emit("message", {

                user: "Usuario",

                text: message

            })

            let botResponse =
                "No entendí tu consulta 😅"

            if (
                message
                    .toLowerCase()
                    .includes("hola")
            ) {

                botResponse =
                    "¡Hola! 👋 Bienvenido a Boreal"

            }

            if (
                message
                    .toLowerCase()
                    .includes("termo")
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