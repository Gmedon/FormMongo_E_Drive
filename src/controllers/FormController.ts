import { Request, Response } from 'express';
import sharp from "sharp"
import { unlink } from "fs/promises"
import axios from 'axios'
import fs from 'fs'
import {google} from 'googleapis'

import User from "../models/User"

let GOOGLE_API_FOLDER_ID = "1kXwMk1vGSGRrQBnF5sp7C1-sbJQslJSy"


export const Landing = async (req: Request, res: Response) => {
    let usuarios = await User.find({})
    console.log("Usuarios", usuarios)
    res.render("Landing")
}

export const Send = async (req: Request, res: Response) => {
    let {nome, idade, email, telefone, endereco, linkedin, github, sobre, projetodestaque} = req.body
    if(req.file){
        
        const auth = new google.auth.GoogleAuth({
            keyFile: './drive.json',
            scopes: 'https://www.googleapis.com/auth/drive' 
        });

        const driveService = google.drive({
            version: 'v3',
            auth
        });

        const fileMetaData = {
            'name': `${req.file.filename}.jpg`,
            "parents": [GOOGLE_API_FOLDER_ID]
        }

        const media = {
            mimeType: 'image/jpg',
            body: fs.createReadStream(`./public/midia/${req.file.filename}.jpg`)
        }

        const response = await driveService.files.create({
            fields: 'id',
            media: media,
            requestBody: fileMetaData
        })



        let img = req.file.filename;

        User.create({
            nome,
            idade,
            email,
            telefone,
            endereco,
            linkedin,
            github,
            sobre,
            projetodestaque,
            img
        })

        res.redirect("/seila")
    }else {
        let erro = true
        res.render("Landing", {
            erro
        })
    }

}

export const Erro = (req: Request, res: Response) => {
    res.render("Erro")
}
