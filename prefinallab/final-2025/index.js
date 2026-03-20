const express = require('express')
const app = express()
const port = 3000
const sqlite3 = require('sqlite3')
const session = require('express-session')

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000, secure: false }
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')


let db = new sqlite3.Database('userdata.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

app.get('/', (req, res) => {
    res.render('1', { err: "" })
})

app.get('/students', (req, res) => {

    if (!req.session.user) {
        return res.redirect('/')
    }

    db.get(`SELECT * FROM users WHERE id = ?`,
        [req.session.user.id], (err, data) => {

        if (err) return res.send("DB error");

        if (!data) return res.send("No user");

        res.render('1_1', { data: data })
    })
})

app.post('/login', (req, res) => {
    const { username, password } = req.body

    db.get(`select * from users where username = ?`, [username], (err, data) => {

        if (err) {
            console.log(err);
            return res.send("Database error");
        }

        if (!data || password !== data.password) {
            return res.render('1', { err: "Username or Password was wrong" })
        }

        req.session.user = {
            id: data.id,
            username: username,
            thumbnail: data.thumbnail
        }

        res.redirect('/students')
    })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})