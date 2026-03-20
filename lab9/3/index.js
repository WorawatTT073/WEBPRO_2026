const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const db = new sqlite3.Database('./orders.db');

app.get('/', (req, res) => {
    db.all("SELECT * FROM orders", [], (err, rows) => {
        if (err) return res.send("DB ERROR");
        res.render('orders', { orders: rows });
    });
});

app.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const status = req.body.status;

    db.run("UPDATE orders SET status=? WHERE id=?", [status, id], () => {
        res.redirect('/');
    });
});

app.listen(4000, () => {
    console.log("Orders app running http://localhost:3000");
});
