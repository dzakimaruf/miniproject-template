import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import models from './models/index'
import routes from './routes/IndexRoute'



const app = express()

// parse body params and attache them to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// use helmet spy bisa dikenali SEO
app.use(helmet())
// secure apps by setting various HTTP headers
app.use(compress())
// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// 1. client-side 
// import React from 'react'
// import ReactDOMServer from 'react-dom/server'
// import MainRouter from './../client/MainRouter'
// import { StaticRouter } from 'react-router-dom'
// import Template from './../template'
import devBundle from './devBundle'
//comment script dibawah before building for productio?
devBundle.compile(app)

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))


app.use("/minpro/", (req, res) => {
    res.send("Hello HR-Fullstack JS")
});

// #middleware
app.use(async (req, res, next) => {
    req.context = {models};
    next();
});
app.use('/api/villas', routes.VillaRoute);
app.use('/api/users', routes.UserRoute);
//app.use('/api/orders', routes.OrderRoute);
//app.use('/api/carts', routes.VicaRoute);
app.use('/api/comments', routes.VicoRoute);
app.use('/api/uploads', routes.UploadRoute);
app.use('/api/lite', routes.CheckoutRoute);






// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
        console.log(err)
    }
})

export default app