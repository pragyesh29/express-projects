// Import the express module
const express = require("express");
// Create an instance of express as app.
const app = express();

// Create a PORT variable to ensure the PORT on which your application will run on.
const PORT = 3000;

// Set view engines for the files that will be rendered by the server.
app.set("views", "./views");
// Here pug is used, hence view engine is set to pug.
app.set("view engine", "pug");

// Listning for the GET request at root route of application.
// After recieving a request from a client a index.pug file will be served as response.
app.get("/", (req, res) => {
  res.render("index", { title: "Welcome" });
});

// listening at PORT specified so that application could be started.
app.listen(PORT, () => {
  console.log(`Application started at http://localhost:${PORT}`);
});
