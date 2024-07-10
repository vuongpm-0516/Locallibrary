const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.all("/secret", function (req, res, next) {
    console.log("Accessing the secret section…");
    next(); // pass control to the next handler
});

app.listen(port, function () {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});
