const express = require("express");
const path = require("path");
const os = require("os");
const multer = require("multer");
const app = express();
const port = 8080;

const DIR = process.env.UPLOAD_PATH;
let storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, `.${DIR}`);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    } 
});

let upload = multer({ storage });

app.post("/upload", upload.single("photo"), (req, res) =>{
    if(!req.file){
        console.log("No file uploaded");
        return res.send({
            success: false
        });
    }else{
        console.log("file received", req.file.filename);
        return res.json({
            success: true,
            hostname: os.hostname(),
            filename: req.file.filename
        });
    }
});

app.get("/upload/:file", (req, res) =>{
    res.sendFile(`${__dirname}/${DIR}/${req.params.file}`);
});

app.get("/", (req, res) =>{
    res.json({
        hostname: os.hostname(),
        message: "Hot reloading with nodemon in docker compose!!!",
        success: true
    })
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});