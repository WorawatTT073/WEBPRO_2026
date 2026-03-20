# 📘 WEBPRO_2026

## 🧠 ทฤษฎี Final

---

## 🧩 1. Web Service Architecture

<img width="477" height="524" alt="image" src="https://github.com/user-attachments/assets/355ecf8c-8c50-4e90-a93b-cfaaa1423a67" />

### 🔹 1.1 Publish Operation
- Service Provider นำ service ไปลงทะเบียนใน **Service Registry**

### 🔹 1.2 Find Operation
- Service Requestor ค้นหา service จาก **Service Registry**

### 🔹 1.3 Bind Operation
- Service Requestor เรียกใช้ service จาก **Service Provider**

---

## ⚙️ 2. Server-side Script มีข้อดีอะไร

- สร้างเว็บแบบ Dynamic (Dynamic Web Page)
- เชื่อมต่อและจัดการฐานข้อมูล
- เพิ่มความปลอดภัย (ซ่อน logic ไว้ที่ server)
- จัดการ session / login / authentication
- ประมวลผลข้อมูลก่อนส่งกลับ client

---

## 🗃️ 3. SQL

### 🔹 3.1 DQL (Data Query Language)
ใช้สำหรับ “ดึงข้อมูล”

```sql
SELECT * FROM users;

ได้เลยครับ นี่คือไฟล์ **README.md ฉบับเต็ม** ที่ “เอาของคุณ + ส่วนที่เติม” รวมกันเรียบร้อย เอาไปวางทับได้เลย 👇

````md id="finalready01"
# 📘 WEBPRO_2026

## 🧠 ทฤษฎี Final

---

## 🧩 1. Web Service Architecture

<img width="477" height="524" alt="image" src="https://github.com/user-attachments/assets/355ecf8c-8c50-4e90-a93b-cfaaa1423a67" />

### 🔹 1.1 Publish Operation
- Service Provider นำ service ไปลงทะเบียนใน **Service Registry**

### 🔹 1.2 Find Operation
- Service Requestor ค้นหา service จาก **Service Registry**

### 🔹 1.3 Bind Operation
- Service Requestor เรียกใช้ service จาก **Service Provider**

---

## ⚙️ 2. Server-side Script มีข้อดีอะไร

- สร้างเว็บแบบ Dynamic (Dynamic Web Page)
- เชื่อมต่อและจัดการฐานข้อมูล
- เพิ่มความปลอดภัย (ซ่อน logic ไว้ที่ server)
- จัดการ session / login / authentication
- ประมวลผลข้อมูลก่อนส่งกลับ client

---

## 🗃️ 3. SQL

### 🔹 3.1 DQL (Data Query Language)
ใช้สำหรับ “ดึงข้อมูล”

```sql
SELECT * FROM users;
````

### 🔹 3.2 DML (Data Manipulation Language)

ใช้สำหรับ “แก้ไขข้อมูล”

```sql
INSERT INTO users VALUES (1, 'A');
UPDATE users SET name='B' WHERE id=1;
DELETE FROM users WHERE id=1;
```

### 🔹 3.3 DDL (Data Definition Language)

ใช้สำหรับ “จัดการโครงสร้าง”

```sql
CREATE TABLE users (
  id INT,
  name VARCHAR(50)
);

ALTER TABLE users ADD email VARCHAR(100);

DROP TABLE users;
```

---

## 🔐 4. Session vs Cookie

| Session         | Cookie          |
| --------------- | --------------- |
| เก็บที่ Server  | เก็บที่ Browser |
| ปลอดภัยกว่า     | เสี่ยงโดนแก้ไข  |
| เก็บ session id | เก็บข้อมูลจริง  |
| หมดเมื่อ logout | ตั้งเวลาได้     |

---

## 🧩 5. Template Engine ทำอะไร

คือ: เครื่องมือช่วยสร้าง HTML แบบ Dynamic โดยฝังข้อมูลจาก server

### ✅ ตัวอย่าง (EJS)

```ejs
<h1><%= name %></h1>
```

### 🎯 ประโยชน์ (4 ข้อ)

1. แยก Logic กับ UI
2. สร้าง HTML แบบ Dynamic
3. ลดการเขียนโค้ดซ้ำ
4. ทำให้โค้ดอ่านง่ายและจัดการง่าย

---

```

 

ถ้ายังโดนหักคะแนนอีก บอกผม เดี๋ยวผมจัดเวอร์ชัน “อาจารย์ชอบแน่” ให้ 😏
```
