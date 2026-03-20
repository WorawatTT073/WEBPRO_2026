const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", async (req, res) => {
    try {
        const response = await fetch("http://webdev.it.kmitl.ac.th:4000/books");
        const data = await response.json();

        res.render("show", { books: data });
    } catch (err) {
        res.send("Error fetching data");
    }
});

app.listen(port, () => {
    console.log("Server running at http://localhost:3000");
});