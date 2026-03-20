const express = require("express");
// 👉 framework สำหรับสร้าง web server
const session = require("express-session");
// 👉 ใช้จัดการ SESSION (เก็บข้อมูลผู้ใช้ฝั่ง server)
const app = express();

app.use(express.urlencoded({ extended: true }));
// 👉 ทำให้รับค่าจาก form ได้ (req.body)
// ================= SESSION =================
app.use(
  session({
    secret: "lab11",
    // 👉 key สำหรับเข้ารหัส session
    resave: false,
    // 👉 ไม่ต้อง save session ซ้ำ ถ้าไม่มีการแก้ไข
    saveUninitialized: true,
    // 👉 สร้าง session แม้ยังไม่มีข้อมูล
  }),
);
// 🔥 ตรงนี้สำคัญมาก
// - server จะสร้าง session id
// - ส่งกลับไปเป็น COOKIE (เช่น connect.sid)
// - browser จะเก็บ cookie นี้ไว้
// - ทุก request ต่อไป browser จะส่ง cookie กลับมา
// 👉 ทำให้ server "จำ user ได้"

app.use(express.static("public"));
// 👉 ใช้เรียกไฟล์ static เช่น css, js, รูปภาพ

app.set("view engine", "ejs");
// 👉 ใช้ EJS เป็น template engine

// ================= MENU =================
app.get("/", (req, res) => {
  fetch("http://10.110.194.140:8000/menu")
    .then((response) => response.json())
    .then((data) => {
      res.render("menu", { foods: data });
    })
    .catch((err) => console.error(err));
});

// ================= ADD TO CART =================
app.get("/add/:id", (req, res) => {
  const id = req.params.id;

  fetch(`http://10.110.194.140:8000/items/${id}`)
    .then((response) => response.json())
    .then((item) => {
      // 👉 ถ้ายังไม่มี cart ให้สร้างก่อน
      if (!req.session.cart) {
        req.session.cart = [];
      }
      // 👉 เพิ่ม item ลง cart
      req.session.cart.push(item);
      // 👉 redirect ไปหน้า cart
      res.redirect("/cart");
    })
    .catch((err) => console.error(err));
});

// ================= CART PAGE =================
app.get("/cart", (req, res) => {
  const cart = req.session.cart || [];
  // 👉 อ่าน cart จาก SESSION
  // 👉 ถ้าไม่มีให้เป็น []
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
    // 👉 รวมราคาสินค้า
  });
  // 👉 ส่งข้อมูลไปแสดงที่ cart.ejs
  res.render("cart", { cart, total });
});
// ================= CONFIRM ORDER =================
app.get("/confirm", (req, res) => {
  req.session.cart = [];
  // 👉 ล้าง cart ใน SESSION
  // 👉 เหมือนกดสั่งซื้อแล้วเคลียร์ตะกร้า
  res.redirect("/");
});

// ================= START SERVER =================
app.listen(3000, () => {
  console.log("Server running http://localhost:3000");
});
