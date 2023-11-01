const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API",
      description: "API Application alloMedia",

      contact: {
        name: "Rachid Daoudi",
      },
      servers: [
        {
          url: "http://localhost:5000/",
        },
      ],

      version: "1.0.0",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = swaggerDocs;
