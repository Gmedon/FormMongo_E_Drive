import mongoose from "mongoose"

export const ConectDataBase = async () => {

await mongoose.connect('mongodb+srv://Medon:guika7807@cluster0.c5edilg.mongodb.net/?retryWrites=true&w=majority')
.then(() => console.log("Conexão estabelecida"))
.catch((error) => console.log(error))

}