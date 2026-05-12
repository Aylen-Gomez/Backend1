import mongoose from "mongoose"

const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI)

        console.log("MongoDB conectado")

    } catch (error) {

        console.log(error)

    }

}

export default connectDB
//mongodb+srv://Aylengomez:Aylug123@cluster0.lcqxw5r.mongodb.net/?appName=Cluster0