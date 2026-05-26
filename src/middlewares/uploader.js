import multer from "multer"
import path from "path"

const storage = multer.diskStorage({

    destination: function (
        req,
        file,
        cb
    ) {

        cb(
            null,
            "src/public/images/products"
        )

    },

    filename: function (
        req,
        file,
        cb
    ) {

        const uniqueName =
            Date.now()
            + "-"
            + file.originalname

        cb(
            null,
            uniqueName
        )

    }

})

const uploader =
    multer({ storage })

export default uploader