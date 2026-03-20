const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const cookieParser = require('cookie-parser')
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

let db = new sqlite3.Database('customers.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

app.set('view engine', 'ejs')


// (A)
app.get('/', (req, res) => {
    db.get("SELECT * FROM customers ORDER BY RANDOM() LIMIT 1", (err, row) => {
        res.render('show', { data: row })
    })
})


// (B)
app.post('/save', (req, res) => {
    res.cookie('customer', req.body)
    res.render('show', { data: null })

})


// (C)
app.get('/show', (req, res) => {
    const data = req.cookies.customer
    res.render('show', { data: data })

})


// (D) 
app.get('/clear', (req, res) => {
    res.clearCookie('customer')
    res.render('show', { data: null })
})


app.listen(3000, () => {
    console.log("Server running at http://localhost:3000")
})