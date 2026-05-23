const socket = io()

const form =
    document.getElementById("productForm")

const productsContainer =
    document.getElementById("productsContainer")

form.addEventListener(
    "submit",
    async event => {

        event.preventDefault()

        const formData =
            new FormData(form)

        const file =
            document.getElementById(
                "thumbnailInput"
            ).files[0]

        let imageBase64 = ""

        if (file) {

            imageBase64 =
                await toBase64(file)

        }

        const product = {

            title:
                formData.get("title"),

            price:
                Number(
                    formData.get("price")
                ),

            category:
                formData.get("category"),

            stock:
                Number(
                    formData.get("stock")
                ),

            description:
                formData.get("description"),

            thumbnails: [
                imageBase64
            ]

        }

        socket.emit(
            "newProduct",
            product
        )

        form.reset()

    }

)

function toBase64(file) {

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader()

            reader.readAsDataURL(file)

            reader.onload =
                () => resolve(reader.result)

            reader.onerror =
                error => reject(error)

        }
    )

}

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