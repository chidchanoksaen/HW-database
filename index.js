const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Middleware - บอกวิธีการที่ client ส่งข้อมูลผ่าน middleware
app.use(bodyParser.urlencoded({extended:false})) // ส่งผ่าน Form
app.use(bodyParser.json()) // ส่งด้วย Data JSON



// app.set('view engine', 'ejs');

app.use(express.static("public"))

const mysql = require("mysql2/promise");
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root', // <== ระบุให้ถูกต้อง
    password: '',  // <== ระบุให้ถูกต้อง
    database: 'student_database',
    port: 3306  // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)
});

//  GET students

// app.get('/students', async (req,res) => {
//     res.sendFile(__dirname + "/submitInsert.html")
// })
app.get("/", (req, res)=>{
    //res.send("Hello World");
    res.sendFile(__dirname + "/index.html")
  } );

app.post("/students", async (req, res) => {
    // ส่งข้อมูลผ่าน body-parser (Middleware)
    const name = req.body.name;
    const age = req.body.age;
    const phone = req.body.phone;
    const email = req.body.email;
    const connection = await dbConn
     await connection.query("insert into students (name,age,phone,email) values('"+name+"','"+age+"',"+phone+",'"+email+"')")
    // res.status(201).send(rows)
    res.sendFile(__dirname + "/submitInsert.html")
    // res.send("คุณได้ทำการเพิ่มข้อมูลสำเร็จ");
})

app.listen(3000, () => {
    console.log("Server is running at port 3000")
})