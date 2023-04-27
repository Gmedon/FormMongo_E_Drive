import mongoose, { Schema, connection, model } from 'mongoose'

type UserType  = {
    id: number,
    nome: string,
    idade: string,
    email: string,
    telefone: string,
    endereco: string,
    linkedin: string,
    github: string,
    sobre: string,
    projetodestaque: string,
    img: string
}

const schema = new Schema<UserType>({
    nome: {type: String, required: true},
    idade: {type: String, required: true},
    email: {type: String, required: true},
    telefone: {type: String, required: true},
    endereco: {type: String, required: true},
    linkedin: {type: String, required: true},
    github: {type: String, required: true},
    sobre: {type: String, required: true},
    projetodestaque: {type: String, required: true},
    img: {type: String, required: true}
})

const User = model("User", schema)

export default User