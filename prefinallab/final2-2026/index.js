const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('userdata.db', (err) => {    
  if (err) {
      return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true })); //รับ form

// routing path
app.get('/', (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) return res.send(err.message);
        res.render('show', { data: rows }); //<% data.forEach((item)=>{ %> เลยส่งdata
    });
});

app.get('/edit/:id',(req,res)=>{
    const id = req.params.id;
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) return res.send("Database Error");
        res.render('edit', { item:row }); //ไม่มี<% data.forEach((item)=>{ %>เลยต้องส่งเป็น item เพราะ <%=item.id %>
    });
});

//update
app.post("/update", (req, res) => {
    const { id, first_name, last_name, email } = req.body;

    let sql = `
        UPDATE users 
        SET first_name = ?, last_name = ?, email = ?
        WHERE id = ?
    `;

    db.run(sql, [first_name, last_name, email, id], (err) => {
        if (err) return console.error(err.message);
        res.redirect("/");
    });
});

// Deleting Data
app.get("/delete/:id", (req, res) => {
  let id = req.params.id;
  let sql = `DELETE FROM Users WHERE id = ?`;
  //delete from id
  db.run(sql, [id], function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log("Deleted:", id);
    res.redirect("/");
  });
});

//insert data
app.post("/insert", (req, res) => {
  const { first_name, last_name, username, password, email } = req.body;

  let sql = `
    INSERT INTO users 
    (first_name, last_name, username, password, email)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(sql, [first_name, last_name, username, password, email], function(err) {
    if (err) {
      return console.error(err.message);
    }
    res.redirect("/");
  });
});


// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})