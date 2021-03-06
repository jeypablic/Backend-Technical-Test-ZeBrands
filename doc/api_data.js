define({ "api": [
  {
    "type": "post",
    "url": "/add",
    "title": "Registrar un Producto",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.0.1",
    "name": "Producto",
    "group": "Producto",
    "description": "<p>Se encarga de registrar un producto del sistema.</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"sku\" : \"1\",\n   \"nombre\": \"uno\",\n   \"marca\" : \"marca uno\",\n   \"precio\" : 1000\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\" : \"Producto registrado correctamente\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controller/productoController.js",
    "groupTitle": "Producto",
    "groupDescription": "<p>API necesaria para gestionar los productos.</p>",
    "sampleRequest": [
      {
        "url": "https://localhost:7000/add"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/delete/1",
    "title": "Eliminar Producto",
    "version": "0.0.1",
    "name": "Producto",
    "group": "Producto",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>Se encarga de eliminar un producto del sistema.</p>",
    "query": [
      {
        "group": "Query",
        "type": "String",
        "optional": false,
        "field": "sku",
        "description": "<p>SKU del producto</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\" : \"Producto eliminado correctamente\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controller/productoController.js",
    "groupTitle": "Producto",
    "groupDescription": "<p>API necesaria para gestionar los productos.</p>",
    "sampleRequest": [
      {
        "url": "https://localhost:7000/delete/1"
      }
    ]
  },
  {
    "type": "get",
    "url": "/findBy/sku/1",
    "title": "Busca un Producto",
    "version": "0.0.1",
    "name": "Producto",
    "group": "Producto",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Se encarga de buscar un producto por algun parametro indicado</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"_id\": \"605e9d2dd0eaaa0033c68b41\",\n   \"sku\": \"2\",\n   \"nombre\": \"dos\",\n   \"marca\": \"marca Dos\",\n   \"precio\": 2000,\n   \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controller/productoController.js",
    "groupTitle": "Producto",
    "groupDescription": "<p>API necesaria para gestionar los productos.</p>",
    "sampleRequest": [
      {
        "url": "https://localhost:7000/findBy/sku/1"
      }
    ]
  },
  {
    "type": "post",
    "url": "/findAll",
    "title": "Lista los Producto",
    "version": "0.0.1",
    "name": "Producto",
    "group": "Producto",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Se encarga de listar todos los producto</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n [{\n      \"_id\": \"605e9d2dd0eaaa0033c68b41\",\n      \"sku\": \"2\",\n      \"nombre\": \"dos\",\n      \"marca\": \"marca Dos\",\n      \"precio\": 2000,\n      \"__v\": 0\n  }, {\n      \"_id\": \"605ea5a35bd2140033baa82c\",\n      \"sku\": \"1\",\n      \"nombre\": \"uno\",\n      \"marca\": \"marca uno\",\n      \"precio\": 1000,\n      \"__v\": 0\n  }]",
          "type": "json"
        }
      ]
    },
    "filename": "src/controller/productoController.js",
    "groupTitle": "Producto",
    "groupDescription": "<p>API necesaria para gestionar los productos.</p>",
    "sampleRequest": [
      {
        "url": "https://localhost:7000/findAll"
      }
    ]
  },
  {
    "type": "put",
    "url": "/edit/1",
    "title": "Editar un Producto",
    "version": "0.0.1",
    "name": "Producto",
    "group": "Producto",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>Se encarga de editar un producto del sistema.</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"sku\" : \"1\",\n   \"nombre\": \"uno\",\n   \"marca\" : \"marca uno\",\n   \"precio\" : 1000\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\" : \"Producto editado correctamente\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controller/productoController.js",
    "groupTitle": "Producto",
    "groupDescription": "<p>API necesaria para gestionar los productos.</p>",
    "sampleRequest": [
      {
        "url": "https://localhost:7000/edit/1"
      }
    ]
  },
  {
    "type": "post",
    "url": "/tracking",
    "title": "Registrar un evento",
    "version": "0.0.1",
    "name": "Tracking",
    "group": "Tracking",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Se encarga de registrar una accion ejecutada en el sistema.</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"nombre\" : \"Consulta Producto\",\n   \"codigo\": 100,\n   \"sku\" : 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\" : \"Registro guardado correctamente\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controller/trackingController.js",
    "groupTitle": "Tracking",
    "groupDescription": "<p>API necesaria para registrar eventos.</p>",
    "sampleRequest": [
      {
        "url": "https://localhost:7000/tracking"
      }
    ]
  },
  {
    "type": "post",
    "url": "/add",
    "title": "Registrar un Usuario",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "version": "0.0.1",
    "name": "Usuario",
    "group": "Usuario",
    "description": "<p>Se encarga de registrar un usuario del sistema.</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"rut\" : \"18-0\",\n   \"nombre\" : \"Administrador\",\n   \"aPaterno\" : \"Zbrands\",\n   \"aMaterno\" : \"luuna\",\n   \"perfil\" : 1,\n   \"email\" : \"jtest@gmail.com\",\n   \"password\" : \"adm1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\" : \"Usuario registrado correctamente\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controller/userController.js",
    "groupTitle": "Usuario",
    "groupDescription": "<p>API necesaria para gestionar los usuarios.</p>",
    "sampleRequest": [
      {
        "url": "https://localhost:7000/add"
      }
    ]
  },
  {
    "type": "post",
    "url": "/findAll",
    "title": "Lista los Usuarios",
    "version": "0.0.1",
    "name": "Usuario",
    "group": "Usuario",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Se encarga de listar todos los Usuario</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n [{\n      \"_id\": \"605e9d2dd0eaaa0033c68b41\",\n      \"rut\" : \"18-0\",\n      \"nombre\" : \"Administrador\",\n      \"aPaterno\" : \"Zbrands\",\n      \"aMaterno\" : \"luuna\",\n      \"perfil\" : 1,\n      \"email\" : \"jtest@gmail.com\",\n      \"password\": \"$2a$08$tnPC5JA0rGYie8OqoWsiLuujczZKlvjH.JLbYOVsYf/43HSt8x.SC\",\n      \"tokens\": [{\n          \"_id\": \"605e6761033ee200339f3ef1\",\n          \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVlNjc2MTAzM2VlMjAwMzM5ZjNlZjAiLCJpYXQiOjE2MTY3OTk1ODV9.Z6guh8_stfwPZH7eiEPjIveHyA9uEo_Z3aLcmZsnlnU\"\n       }],\n      \"__v\": 0\n  }, {\n      \"_id\": \"605e89e500c6cc003359fcf0\",\n      \"rut\" : \"15-0\",\n      \"nombre\" : \"Administrador\",\n      \"aPaterno\" : \"Zbrands\",\n      \"aMaterno\" : \"luuna\",\n      \"perfil\" : 1,\n      \"email\" : \"anonym@test.cl\",\n      \"password\": \"$2a$08$rFIXdn3s1M9A5IiMmh7FHeqPR1Gpo150E6Rui3hMI0Yk3KlQ7imCq\",\n      \"tokens\": [{\n          \"_id\": \"605e89e500c6cc003359fcf1\",\n          \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVlODllNTAwYzZjYzAwMzM1OWZjZjAiLCJpYXQiOjE2MTY4MDg0MjF9.6StI8XugSxzChTejYu_8P6YvPczO9_Ya3srK107lYKQ\"\n       }],\n }]",
          "type": "json"
        }
      ]
    },
    "filename": "src/controller/userController.js",
    "groupTitle": "Usuario",
    "groupDescription": "<p>API necesaria para gestionar los usuarios.</p>",
    "sampleRequest": [
      {
        "url": "https://localhost:7000/findAll"
      }
    ]
  },
  {
    "type": "delete",
    "url": "/delete/1",
    "title": "Eliminar Usuario",
    "version": "0.0.1",
    "name": "Usuario",
    "group": "Usuario",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>Se encarga de eliminar un usuario del sistema.</p>",
    "query": [
      {
        "group": "Query",
        "type": "String",
        "optional": false,
        "field": "rut",
        "description": "<p>RUT del Usuario</p>"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\" : \"Usuario eliminado correctamente\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controller/userController.js",
    "groupTitle": "Usuario",
    "groupDescription": "<p>API necesaria para gestionar los usuarios.</p>",
    "sampleRequest": [
      {
        "url": "https://localhost:7000/delete/1"
      }
    ]
  },
  {
    "type": "get",
    "url": "/findBy/nombre/Administrador",
    "title": "Busca un usuario",
    "version": "0.0.1",
    "name": "Usuario",
    "group": "Usuario",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Se encarga de buscar un usuario por algun parametro indicado</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"_id\": \"605e9d2dd0eaaa0033c68b41\",\n   \"rut\" : \"18-0\",\n   \"nombre\" : \"Administrador\",\n   \"aPaterno\" : \"Zbrands\",\n   \"aMaterno\" : \"luuna\",\n   \"perfil\" : 1,\n   \"email\" : \"jtest@gmail.com\",\n   \"password\" : \"adm1234\",\n   \"__v\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controller/userController.js",
    "groupTitle": "Usuario",
    "groupDescription": "<p>API necesaria para gestionar los usuarios.</p>",
    "sampleRequest": [
      {
        "url": "https://localhost:7000/findBy/nombre/Administrador"
      }
    ]
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Inicio de sesi??n en el sistema",
    "version": "0.0.1",
    "name": "Usuario",
    "group": "Usuario",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Se encarga de iniciar la sesi??n del usuario en el sistema</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"email\" : \"test@test.cl\",\n   \"password\": \"test1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"user\": {\n     \"_id\": \"605eae55146c98003337153a\",\n     \"rut\": \"18-0\",\n     \"nombre\": \"Administrador\",\n     \"aPaterno\": \"Zbrands\",\n     \"aMaterno\": \"luuna\",\n     \"perfil\": 1,\n     \"email\": \"juanpablo.rodriguezyanez@gmail.com\",\n     \"password\": \"$2a$08$DT2QK6OGoedYE/aXpAziu.I6R3xzZJRRnBs00zOz1ZNk2.IUCgmNm\",\n     \"tokens\": [{\n          \"_id\": \"605eae55146c98003337153b\",\n          \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVlYWU1NTE0NmM5ODAwMzMzNzE1M2EiLCJpYXQiOjE2MTY4MTc3NDl9.hYkhLG5N3DQAwU6dlx0XvFR7IjAYSRwauiJ3htI2Tdg\"\n      }, {\n          \"_id\": \"605ebe21256cc200349112f9\",\n          \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVlYWU1NTE0NmM5ODAwMzMzNzE1M2EiLCJpYXQiOjE2MTY4MjE3OTN9.7KNQTb4V0DKd-kS5e9w2LveNU1UCUZo1pv8uG6zEuUw\"\n      }],\n      \"__v\": 2\n    },\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVlYWU1NTE0NmM5ODAwMzMzNzE1M2EiLCJpYXQiOjE2MTY4MjE3OTN9.7KNQTb4V0DKd-kS5e9w2LveNU1UCUZo1pv8uG6zEuUw\"",
          "type": "json"
        }
      ]
    },
    "filename": "src/controller/userController.js",
    "groupTitle": "Usuario",
    "groupDescription": "<p>API necesaria para gestionar los usuarios.</p>",
    "sampleRequest": [
      {
        "url": "https://localhost:7000/login"
      }
    ]
  },
  {
    "type": "post",
    "url": "/logout",
    "title": "Cierre de sesion",
    "version": "0.0.1",
    "name": "Usuario",
    "group": "Usuario",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Se encarga de cerrar de la sesion del Usuario</p>",
    "filename": "src/controller/userController.js",
    "groupTitle": "Usuario",
    "groupDescription": "<p>API necesaria para gestionar los usuarios.</p>",
    "sampleRequest": [
      {
        "url": "https://localhost:7000/logout"
      }
    ]
  },
  {
    "type": "post",
    "url": "/logout-all",
    "title": "Cierre de todas las sesiones",
    "version": "0.0.1",
    "name": "Usuario",
    "group": "Usuario",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Se encarga de cerrar todas las sesiones iniciadas</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"email\" : \"test@test.cl\",\n   \"password\": \"test1234\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controller/userController.js",
    "groupTitle": "Usuario",
    "groupDescription": "<p>API necesaria para gestionar los usuarios.</p>",
    "sampleRequest": [
      {
        "url": "https://localhost:7000/logout-all"
      }
    ]
  },
  {
    "type": "put",
    "url": "/edit/1",
    "title": "Editar un Usuario",
    "version": "0.0.1",
    "name": "Usuario",
    "group": "Usuario",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "description": "<p>Se encarga de editar un usuario del sistema.</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"rut\" : \"18-0\",\n   \"nombre\" : \"Administrador\",\n   \"aPaterno\" : \"Zbrands\",\n   \"aMaterno\" : \"luuna\",\n   \"perfil\" : 1,\n   \"email\" : \"jtest@gmail.com\",\n   \"password\" : \"adm1234\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"message\" : \"Usuario editado correctamente\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controller/userController.js",
    "groupTitle": "Usuario",
    "groupDescription": "<p>API necesaria para gestionar los usuarios.</p>",
    "sampleRequest": [
      {
        "url": "https://localhost:7000/edit/1"
      }
    ]
  }
] });
