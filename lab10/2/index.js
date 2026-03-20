const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

// connect DB
let db = new sqlite3.Database("todo.db", (err) => {
    if (err) return console.error(err.message);
    console.log("Connected to SQLite");
});

// create table
db.run(`
CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    deadline TEXT,
    status TEXT DEFAULT 'Pending'
)
`);

// 👉 redirect root
app.get("/", (req, res) => {
    res.redirect("/todos");
});

// 👉 READ
app.get("/todos", (req, res) => {
    db.all("SELECT * FROM todos", (err, rows) => {
        if (err) return console.log(err.message);
        res.render("show", { todos: rows });
    });
});

// 👉 CREATE (REST style)
app.post("/todos", (req, res) => {
    const { title, description, deadline } = req.body;

    db.run(
        `INSERT INTO todos (title, description, deadline)
         VALUES (?, ?, ?)`,
        [title, description, deadline],
        function (err) {
            if (err) return console.log(err.message);
            res.redirect("/todos");
        }
    );
});

// 👉 UPDATE (ใช้ POST แทน PUT เพื่อให้ form ใช้ง่าย)
app.post("/todos/:id", (req, res) => {
    const id = req.params.id;
    const status = req.body.status;

    db.run(
        `UPDATE todos SET status = ? WHERE id = ?`,
        [status, id],
        function (err) {
            if (err) return console.log(err.message);
            res.redirect("/todos");
        }
    );
});

// 👉 DELETE
app.get("/todos/delete/:id", (req, res) => {
    const id = req.params.id;

    db.run(`DELETE FROM todos WHERE id = ?`, id, function (err) {
        if (err) return console.log(err.message);
        res.redirect("/todos");
    });
});

// start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});