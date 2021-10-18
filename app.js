const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const config = require("./config");
const fs = require("fs");
const Acronym = require("./acronymModel");
require("dotenv").config();
app.use(helmet());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cors());


// Swagger Open Api Options Definition 
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "World Texting Foundation",
        description: "This is the swagger documentation for the World Texting Foundation API",
        contact: {
          name: "Nwigwe Uzochukwu"
        },
        servers: [ 
            {
                url:`http://${config.db.host}:${config.db.port}`, 
                description: "Development server"
            } 
        ]
      }
    },
    
    apis: ['./acronymRoute.js']
  };
  
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
 
  // Bring in the route
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use(require('./acronymRoute'));

    // Connect the database
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.database}`, { useNewUrlParser: true }).then(() => {
      console.log(`Database connected successfully`)
  }).catch(err => { 
      console.log(`Unable to connect with the database ${err}`)
  });
  
  const populateData = async () => {

    let adminData = await Acronym.findOne({ name: "admin" })

    if (!adminData) {

      // Load the data from the json file
      const dataFromJsonFile = JSON.parse(
        fs.readFileSync(`${__dirname}/acronym.json`, "utf-8")
      ).map((acr) => {
        const entry = Object.entries(acr)[0];
        return {
          acronym: entry[0],
          definition: entry[1],
        };
      })

      // console.log(dataFromJsonFile);
      
      const newAcronym = new Acronym({
        data: dataFromJsonFile,
        name: "admin"
      })

      newAcronym.save()

    }

  }

  populateData();

module.exports = app;