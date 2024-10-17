const express = require("express");
// Make an instance of the Express system
// so we can configure it
// eg. routes, settings
const app = express();

// GET localhost:3000
// .get("/", (req, res) => {})
// .get("/", (banana, elephant) => {})

// instance.verb(routePath,
//  middleware,
//  middleware,
//  route handler
// )

function kimMiddleWare(request, response, next) {
    console.log("Kim middleware is now running!!");
    request.coolCoderAcademyStuff = {
        ...request.coolCoderAcademyStuff,
        kim: "cool programmer"
    };
    // This doesn't work becasue request.coolCoderAcademyStuff wasn't defined
    // request.coolCoderAcademyStuff.kim = "cool programmer!!";
    next();
}

app.get("/",
    // middleware function goes here
    kimMiddleWare,
    (request, response) => {
    // response.send("<h1>Hello world!!</h1>");
    response.json({
        message: "Hello world!!",
        customStuff: request.coolCoderAcademyStuff
    });
});

app.post("/", kimMiddleWare, (request, response) => {
    response.json({
        message: "POST request received!!"
    });
});

// http://localhost:3000/bananas
app.post("/bananas",
    (request, response, next) => {
        console.log("Bananas route has run");
        next();
    },
    (request, response) => {
    response.json({
        message: "POST bananas received!!"
    });
});

const PokemonController = require("./controllers/pokemonController.js");
// localhost:3000/pokemon/
app.use("/pokemon", PokemonController);

module.exports = {
    app
}