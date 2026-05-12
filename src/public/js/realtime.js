const socket = io()

const form = document.getElementById("productForm")

const productsContainer =
    document.getElementById("productsContainer")

form.addEventListener("submit", event => {

    event.preventDefault()

    const formData = new FormData(form)

    const product = {
        title: formData.get("title"),
        price: Number(formData.get("price"))
    }

    socket.emit("newProduct", product)

    form.reset()

})

socket.on("updateProducts", products => {

    productsContainer.innerHTML = ""

    products.forEach(product => {

        productsContainer.innerHTML += `
        
            <div>

                <h3>${product.title}</h3>

                <p>$${product.price}</p>

            </div>

            <hr>
        
        `

    })

})