const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const db = new sqlite3.Database('./userdata.db');


app.get('/', (req, res) => {

    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) return res.send(err.message);

        res.render('show', { data: rows });
    });

});

app.get('/detail/:id', (req, res) => {

    const id = req.params.id;

    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) return res.send("Database Error");

        res.render('detail', { user: row });
    });

});


app.listen(3000, () => {
    console.log("Users running http://localhost:3000");
});
