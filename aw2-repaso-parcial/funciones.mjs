import http from 'node:http';
import path from 'node:path';
import fsp from 'node:fs/promises';

//const ruta = path.join("publica", "index.html")
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
const raizSaludo = 'saludos'
async function leerArchivo(respuesta){
    const ruta = path.join(raizSaludo, 'saludos.json');
    try {
        const datos = await fsp.readFile(ruta);
        respuesta.statusCode = 200;
        respuesta.end(datos);
    } catch (error) {
        console.log(error);
        respuesta.statusCode = 500;
        respuesta.end('hubo un error en el servidor2');
    }
}


export { gestionarIndex, gestionarRecursos, leerArchivo };