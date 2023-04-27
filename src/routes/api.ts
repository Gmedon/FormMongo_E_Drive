import { Router } from 'express';
import multer from 'multer'

import * as FormController from '../controllers/FormController';

const StorageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./temp");
    },
    filename: (req, file, cb) => {
        let numberandom = Math.floor(Math.random() * 99999)
        cb(null, numberandom+"2023")
    }
})

const upload = multer({
    storage: StorageConfig
})

const router = Router();


router.get("/", FormController.Landing)
router.post("/cadastro", upload.single("file"), FormController.Send)
router.get("*", FormController.Erro)

export default router;