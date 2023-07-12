//---------------IMPORTACIONES--------------
import express from "express";
import handlebars from 'express-handlebars'
import __dirname from "./utils.js";
import routerViews from "./router/views.router.js";
import { Server } from "socket.io";

//---------------IMPORTACIONES--------------


//------------CONSTANTES-------------
const app = express()
const httpServer = app.listen(9999, () => console.log("El proyecto esta corriendo"))
const io = new Server(httpServer)
const messages = []

//------------CONSTANTES-------------



//------------CONFIGURACION DE HANDLEBARS-----------
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
//------------CONFIGURACION DE HANDLEBARS-----------


//--------------------APPS USES----------------
app.use('/static', express.static(__dirname + '/public'))


app.get('/health', (req, res) => res.send('/HEALTH PAGINA BASE 9999'))
app.use('/', routerViews)

//--------------------APPS USES----------------


//---------------CONEXIONES AL SERVIDOR------------

io.on('connection', socket =>{
    socket.on('new', user => console.log(`${user} HA INICIADO UNA NUEVA CONEXION ` )) //ESTO IMPRIME EN CONSOLA LOS QUE ESTAN CONECTADOS

    socket.on('message', data =>{
        messages.push(data)
        io.emit('logs', messages)
    })
    
})