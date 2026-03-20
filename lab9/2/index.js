const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const db = new sqlite3.Database('./questions.db');


app.get('/', (req, res) => {
    db.all("SELECT * FROM questions", [], (err, rows) => {
        if (err) return res.send("Database Error");
        res.render('show', { questions: rows });
    });
});


app.post('/submit', (req, res) => {

    db.all("SELECT QID, Correct FROM questions", [], (err, rows) => {
        if (err) return res.send("Database Error");

        let score = 0;
        const total = rows.length;

        rows.forEach(q => {
            const userAnswer = req.body["q" + q.QID];

            if (userAnswer === q.Correct) {
                score++;
            }
        });

        res.render('result', { score, total });
    });
});


app.listen(3000, () => {
    console.log("Quiz running http://localhost:3000");
});
