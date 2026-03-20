const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get("/", async (req, res) => {
    try {
        const response = await fetch("http://webdev.it.kmitl.ac.th:4000/restaurant");
        const data = await response.json();

        res.render("show", { products: data, detail: null });
    } catch (err) {
        res.send("Error fetching data");
    }
});


app.get("/detail/:id", async (req, res) => {
    try {
        const response = await fetch(
            `http://webdev.it.kmitl.ac.th:4000/detail/${req.params.id}`
        );
        const data = await response.json();

        res.render("show", { products: null, detail: data });
    } catch (err) {
        res.send("Error fetching detail");
    }
});

app.listen(port, () => {
    console.log("Users running http://localhost:3000");
});