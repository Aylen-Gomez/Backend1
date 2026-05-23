import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    first_name: String,

    email: {
        type: String,
        unique: true
    },

    password: String,

    role: {
        type: String,
        default: "user"
    }

})

export default mongoose.model(
    "users",
    userSchema
)