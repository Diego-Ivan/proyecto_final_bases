# Proyecto Final de Matemáticas Discretas

Este es un repositorio que contiene el proyecto final de bases de datos y de matemáticas discretas.
Contiene tanto el frontend del proyecto como el backend.

Autores:

* Isabela Constantino
* Victor Dávila
* Emma Duarte
* Diego Iván M. E.

## Instalación y Ejecución

Este proyecto requiere de NodeJS y de NPM, así que necesitan ser instalados
antes de ejecutar el código. Consulte la [documentación de Node JS](https://nodejs.org/es)
para instalarlo en su computadora y ejecutarlo.

### Frontend

Para el frontend, se utilizó Vite y React. Para instalar las dependencias
necesarias, solo ejecute:

```
npm install
```

Y para arrancar la página web de manera local, solamente necesita
utilizar:

```
npm run dev 
```

Esto abrirá una página web en su host local.

### Backend

Para el servidor, se utilizó Express, para facilitar la creación de rutas
para peticiones HTTP.

#### Conexión con la base de datos

Primero, se necesita establecer una conexión con una base de datos MySQL, la
cual viene en el archivo .sql de la carpeta raíz del proyecto.

Después, necesita configurar su ambiente. Cree un archivo .env en la
carpeta `server/` que contenga la siguiente información:

```
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
```

#### Arrancar el servidor

Arranque el servidor utilizando:

```
cd server
npm install
node index.js
```

Esto abrirá el servidor y las conexiones con la base de datos.

Para verificar que el servidor está abierto, puede hacer una petición
usando `curl`

`curl https://localhost:3000/api/conexiones`
