import fs from "fs"

const baseFolders = [
    "src",
    "src/routes",
    "src/controllers",
    "src/dao",
    "src/dao/filesystem",
    "src/models",
    "src/data",
    "src/views",
    "src/views/layouts",
    "src/public",
    "src/public/js",
    "src/public/css",
    "src/sockets",
    "src/middlewares",
    "src/utils"
]

const files = {
    "src/app.js": "",

    "src/routes/products.router.js": "",
    "src/routes/carts.router.js": "",
    "src/routes/views.router.js": "",

    "src/controllers/products.controller.js": "",
    "src/controllers/carts.controller.js": "",

    "src/dao/filesystem/ProductManager.js": "",
    "src/dao/filesystem/CartManager.js": "",

    "src/models/Product.js": "",
    "src/models/Cart.js": "",

    "src/data/products.json": "[]",
    "src/data/carts.json": "[]",

    "src/views/layouts/main.handlebars": "",

    "src/views/home.handlebars": "",
    "src/views/products.handlebars": "",
    "src/views/productDetail.handlebars": "",
    "src/views/cart.handlebars": "",
    "src/views/realTimeProducts.handlebars": "",

    "src/public/js/realtime.js": "",
    "src/public/js/cart.js": "",

    "src/public/css/styles.css": "",

    "src/sockets/socket.js": "",

    "src/middlewares/errorHandler.js": "",

    "src/utils/generateId.js": "",
    "src/utils/paginate.js": "",

    "README.md": ""
}

baseFolders.forEach(folder => {

    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true } )
    }

})

for (const file in files) {

    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, files[file])
    }

}

console.log("Estructura del proyecto creada correctamente")