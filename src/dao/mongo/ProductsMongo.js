import Product from "../../models/Product.js"

class ProductsMongo {

async getProducts({
    limit = 10,
    page = 1,
    query,
    sort
} = {}) {

    const filter = {}

    if (query) {

        filter.category = query

    }

    const options = {

        page,
        limit,
        lean: true

    }

    if (sort === "asc") {

        options.sort = {
            price: 1
        }

    }

    if (sort === "desc") {

        options.sort = {
            price: -1
        }

    }

    const result =
        await Product.paginate(
            filter,
            options
        )

    return {

        status: "success",

        payload: result.docs,

        totalPages: result.totalPages,

        prevPage: result.prevPage,

        nextPage: result.nextPage,

        page: result.page,

        hasPrevPage: result.hasPrevPage,

        hasNextPage: result.hasNextPage,

        prevLink:
            result.hasPrevPage
                ? `/api/products?page=${result.prevPage}`
                : null,

        nextLink:
            result.hasNextPage
                ? `/api/products?page=${result.nextPage}`
                : null

    }

}

async getProductById(id) {

    return await Product
        .findById(id)
        .lean()

}

    async addProduct(productData) {

        return await Product.create(productData)

    }

    async updateProduct(id, updatedData) {

        return await Product.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        )

    }

    async deleteProduct(id) {

        return await Product.findByIdAndDelete(id)

    }

}

export default ProductsMongo