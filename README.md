#zebrands
Zebrands Test Resolution - Luuna

## Description

Development of API Rest for managing a product catalog.

### Pre requirements

To run this system, it is necessary to have docker installed on the computer where it will run.

In addition to having the Postman software, in order to execute the calls to the REST APIs.

### Built with

* [NodeJs] (https://nodejs.org/es/) - Execution environment
* [Express] (https://expressjs.com/es/) - Infrastructure for NodeJs web applications
* [Docker] (https://docker.com) - For application containerization
* [MongoDB] (https://mongodb.com) - Non-relational database
* [Postman] (https://www.postman.com/) - For the execution of the APIs

### Execution

To execute this container, it is done with the following instructions in a terminal (CMD for Windows):

```
docker-compose build
docker-compose up
```

Once the container is started, the following message will be displayed on the terminal:

```
backend | [nodemon] 2.0.7
backend | [nodemon] to restart at any time, enter `rs`
backend | [nodemon] watching path (s): *. *
backend | [nodemon] watching extensions: js, mjs, json
backend | [nodemon] starting `node src / app.js apidoc -o doc /`
backend | server started
backend | DB connected to mongo
backend | Admin user created
backend | user: test@gmail.com
backend | password: adm1234
```

This message tells us that it is already available, and displays the data of the first user created, which will be needed for the API interaction

In a preferred browser, enter the following URL.

```
http: // localhost: 7000
```

The REST API documentation will be displayed.

For the execution of each API, you must use the Postman software and import the file found in this repository, in the following path:

```
./postman-examples/zebrands.postman_collection.json
```

By loading this file, Postman will be configured with each of the requests to the API, with test data.

To start using the API from Postman, you must run the login api, with the credentials provided in the docker console.

This will respond to the user data and the access tokens, one of which must be used in the Authorizations tab, selecting the authorization type "Bearer Token", and paste the token obtained at login.

For the execution of all the APIs the tocken must be loaded.