import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sumit@0410",
  database: "crudapp",
});

app.use(cors());

//get all users...
app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//create new user...

app.post("/addUser", (req, res) => {
  const q =
    "INSERT INTO users (`name`,`email`,`dateOfBirth`,`phone`) VALUES (?)";
  const values = [
    req.body.name,
    req.body.email,
    req.body.dateOfBirth,
    req.body.phone,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ msg: "user created successfully", data });
  });
});
//delete user..

app.delete("/deleteUser/:id", (req, res) => {
  const userId = req.params.id;
  const q = "DELETE FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.json(err);
    return res.json({ msg: "user Deleted successfully", data });
  });
});

//update Person...
app.put("/updateUser/:id", (req, res) => {
  const userId = req.params.id;
  const q =
    "UPDATE users SET `name` = ?, `email`= ?, `dateOfBirth`= ?,`phone`=? WHERE id = ?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.dateOfBirth,
    req.body.phone,
  ];

  db.query(q, [...values, userId], (err, data) => {
    if (err) return res.json(err);
    return res.json({ msg: "user Updated successfully", data });
  });
});

//get single user...

app.get("/singleUser/:id", (req, res) => {
  const userId = req.params.id;
  const q = "SELECT * FROM users WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.json(err);
    return res.json({ msg: "single user get successfully", data });
  });
});

app.listen(8800, () => {
  console.log("server is running on port 8800");
});
