const socket = io()

window.addEventListener(
    "DOMContentLoaded",
    () => {

        const form =
            document.getElementById(
                "productForm"
            )

        const productsContainer =
            document.getElementById(
                "productsContainer"
            )

        form.addEventListener(
            "submit",
            async event => {

                event.preventDefault()

                const formData =
                    new FormData(form)

                try {

                    const response =
                        await fetch(
                            "/api/products/realtime",
                            {

                                method: "POST",

                                body: formData

                            }
                        )

                    const result =
                        await response.json()

                    console.log(result)

                    form.reset()

                } catch (error) {

                    console.log(error)

                }

            }
        )

        socket.on(
            "updateProducts",
            products => {

                productsContainer.innerHTML = ""

                products.forEach(product => {

                    productsContainer.innerHTML += `

                        <div class="product-card">

                            <img
                                src="${
                                    product.thumbnails?.[0]
                                    || "/images/default.png"
                                }"
                                class="product-image"
                            >

                            <h3 class="product-title">

                                ${product.title}

                            </h3>

                            <p class="product-price">

                                $${product.price}

                            </p>

                            <p class="product-installments">

                                ${product.description || ""}
                            </p>

                        </div>

                    `

                })

            }

        )

    }
)