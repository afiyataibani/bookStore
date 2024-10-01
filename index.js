const express = require("express");
const db = require("./config/database");
const bodyParser = require("body-parser");
const bookModel = require("./models/bookSchema");

const port = 8082;

const app = express();

app.set("view engine", "ejs");

app.use(express.static("node_modules"));

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  bookModel
    .find({})
    .then((data) => {
      console.log(data);
      return res.render("index", {
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
});


app.post("/insertData", (req, res) => {
  let editId = req.body.editId;

  if (editId) {
    bookModel
      .findByIdAndUpdate(editId, { ...req.body })
      .then((data) => {
        console.log("Data Updated Successfully");
        return res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  } else {
    bookModel
      .create({ ...req.body })
      .then((data) => {
        return res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
});


app.get("/deleteData/:id", (req, res) => {
  let { id } = req.params;
  bookModel
    .findByIdAndDelete(id)
    .then((data) => {
      console.log("Data Deleted Successfully");
      return res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
});

app.get("/editData/:id", (req, res) => {
  let { id } = req.params;
  bookModel
    .findById(id)
    .then((data) => {
      console.log(data);
      return res.render("edit", {
        data,
      });
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
});

app.listen(port, (err) => {
  if (!err) {
    db;
    console.log("Server Start \nhttp://localhost:" + port);
  }
});
