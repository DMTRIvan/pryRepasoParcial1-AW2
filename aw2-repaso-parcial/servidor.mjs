import http from 'node:http';
import path from 'node:path';
import fsp from 'node:fs/promises';
import {gestionarIndex, gestionarRecursos, leerArchivo} from "./funciones.mjs";
/*
No utilizar computadora propia ni celular
No iniciar whatsapp web

CONSIGNAS

- El la carpeta del proyecto crear un archivo "servidor.mjs"
- Uso obligatorio de los modulos http, fs o fs/promises, path
- Creacion de servidor y escuchar en el puerto 3000

- Agrupar las peticiones que atiendan los métodos (verbos) GET y POST, capturar 
las peticiones que no vengan con ninguno de esos verbos.

- Crear funciones para desacoplar el código y gestionar las peticiones
Cada función manejará las resspuestas al servidor (comentar el objetivo de la función)
- Crear un módulo que contenga todas las funcionalidades y poder importarlas
al archivo de inicio "servidor.mjs"
- En GET: 
---- Crear una ruta de petición estática en la raíz / que devuelva un index.html 
---- Crear una ruta de petición dinámica (construir la ruta del sistema operativo con la ruta de petición) para atender la carga del archivo css
- En POST:
---- Crear una ruta de petición que cree y escriba un archivo .json en la carpeta "saludos" con el contenido:

CODIGOS DE ESTADO:
500 error de servidor ej: error de lectura del archivo
404 Recurso no encontrado
200 Recurso entregado al cliente
201 recurso creado
*/

const contenido ={
    saludos : [
        "Buenos días",
        "Buenas tardes",
        "Buenas noches"
    ]
}


const puerto = 3000;
/*
const ruta = path.join("publica", "index.html")
const raizDelSitio = 'publica'
const gestionarIndex = async (peticion, respuesta) => {
    const ruta = path.join(raizDelSitio, 'index.html');
    try {
        const datos = await fsp.readFile(ruta);
        respuesta.statusCode = 200;
        respuesta.end(datos);
    } catch (error) {
        console.log(error);
        respuesta.statusCode = 500;
        respuesta.end('hubo un error en el servidor3');
    }
};


const gestionarRecursos = async (peticion, respuesta) => {
    const ruta = path.join(raizDelSitio, peticion.url);
    try {
        const datos = await fsp.readFile(ruta);
        respuesta.statusCode = 200;
        respuesta.end(datos);
    } catch (error) {
        console.log(error);
        respuesta.statusCode = 500;
        respuesta.end('hubo un error en el servidor2');
    }
};

*/
const raizSaludo = 'saludos'

const gestionarSaludo = async(peticion,respuesta) =>{
    const ruta = path.join(raizSaludo, "saludos.json");
    try {
        const contenidoJSON = JSON.stringify(contenido)
        await fsp.writeFile(ruta,contenidoJSON);
        respuesta.statusCode = 200;       
    } catch (error) {
        console.log(error);
        respuesta.statusCode = 404;
        respuesta.end('Error en la escritura');
     }
}


const servidor = http.createServer((peticion, respuesta)=>{
    
    if(peticion.method === 'GET'){
        if((peticion.url === "/") || (peticion.url === "index.html")){
            gestionarIndex(peticion,respuesta);
        }else if(peticion.url === "/saludos"){
            leerArchivo(respuesta);
        }
        else{
            gestionarRecursos(peticion, respuesta);
        }
    }else if(peticion.method === 'POST'){
        if(peticion.url === "/saludos"){
            gestionarSaludo(peticion, respuesta);
        }else{
            console.log('Otra ruta');
            respuesta.end('Otra ruta');
        }
    }else{
        console.log('otro metodo');
        respuesta.end('otro metodo');
    }
    
})

servidor.listen(3000);