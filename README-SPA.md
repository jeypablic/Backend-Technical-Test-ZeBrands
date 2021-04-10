# zebrands
Resolución de Prueba Zebrands - Luuna

## Descripción

Desarrollo de API Rest para el manejo de un catalogo de productos.

### Pre-requisitos

Para la ejecucion de este sistema, es necesario contar con la instalacion de docker en el equipo donde se ejecutara.

Ademas de contar con el software Postman, con la finalidad de ejecutar las llamadas a las API REST.

### Construido con

* [NodeJs](https://nodejs.org/es/) - Entorno de ejecución 
* [Express](https://expressjs.com/es/) - Infrestructura para aplicaciones web NodeJs
* [Docker](https://docker.com) - Para la contenerización de la aplicación
* [MongoDB](https://mongodb.com) - Base de datos no relacional
* [Postman](https://www.postman.com/) - Para la ejecucion de las APIs

### Ejecución

Para la ejecución de este contenedor se realiza con las siguientes instrucciones en un terminal (CMD para Windows):

```
docker-compose build
docker-compose up
```

úna vez iniciado el contenedor, se visualizara el siguiente mensaje en el terminal:

```
backend  | [nodemon] 2.0.7
backend  | [nodemon] to restart at any time, enter `rs`
backend  | [nodemon] watching path(s): *.*
backend  | [nodemon] watching extensions: js,mjs,json
backend  | [nodemon] starting `node src / app.js apidoc -o doc/`
backend  | server iniciado
backend  | DB conectada a  mongo
backend  | Usuario administrador creado
backend  | usr: test@gmail.com
backend  | password: adm1234
```

Este mensaje nos indica que ya se encuentra disponible, y despliega los datos del primer usuario creado, que se necesitará para la interacción de la API

En un navegador de preferencia, entre a la siguiente URL.

```
http://localhost:7000
```

Se desplegará la documentación de la API REST.

Para la ejecucion de cada API, se debe utilizar el software Postman e importar el archivo que se encuentra en este repositorio, en la siguiente ruta:

```
./postman-examples/zebrands.postman_collection.json
```

Al cargar este archivo, Postman quedara configurado con cada una de las solicitudes a la API, con datos de pruebas.

Para comenzar a utilizar la API desde el Postman, se debe ejecutar la api de login, con las credenciales entregadas en la consola del docker.

Esto les respondera los datos del usuario y los token de acceso, uno de ello, se debe utilizar en la pestaña Authorizations, seleccinando el typo de autorización "Bearer Token", y pegar el token que se obtuvo en el login.

Para la ejecución de todas las APIs de debe cargar el tocken.