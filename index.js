// ====================================================================
// SERVIDOR EN NODE.JS (Arquitectura MVC)
// ====================================================================
const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Tipos de archivo reconocidos para el navegador
const TIPOS_MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.json': 'application/json'
};

const servidor = http.createServer((peticion, respuesta) => {
  const urlLimpia = peticion.url.split('?')[0];
  const archivo = urlLimpia === '/' ? 'index.html' : urlLimpia.slice(1);
  const rutaArchivo = path.join(__dirname, archivo);
  const extension = path.extname(rutaArchivo);
  const tipoMime = TIPOS_MIME[extension] || 'text/plain';

  fs.readFile(rutaArchivo, (error, contenido) => {
    if (error) {
      respuesta.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return respuesta.end('Archivo no encontrado');
    }
    respuesta.writeHead(200, { 'Content-Type': `${tipoMime}; charset=utf-8` });
    respuesta.end(contenido);
  });
});

const PUERTO = 3000;
servidor.listen(PUERTO, () => {
  console.log('='.repeat(55));
  console.log('   SISTEMA DE GESTION DE GIMNASIO - SERVIDOR ACTIVO');
  console.log('='.repeat(55));
  console.log(`Accede en tu navegador: http://localhost:${PUERTO}`);
  console.log('Abriendo el sistema automaticamente en tu navegador...');
  console.log('='.repeat(55));

  // Abre automaticamente el navegador predeterminado en Windows
  exec(`start http://localhost:${PUERTO}`);
});
