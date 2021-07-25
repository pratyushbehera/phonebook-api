require('dotenv').config();
let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
const { PhoneBook, createPhoneEntry,getAllPhoneEntries,getPhoneEntryByNumber, updatePhoneEntryByNumber } = require('./phoneNumberModel');

let app = express();
let port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {  
  res.send("Welcome to Phonebook API")
});


app.get("/getallphoneentries", (req, res) => {
  
  getAllPhoneEntries((err, data) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err.toString()
      });
    }
    res.json({
      error: false,
      phoneEntries: data,
    })
  })
});


app.post("/createphoneentry", (req, res) => {
  
  let phoneEntry = req.body.phoneEntry;
  
  createPhoneEntry(phoneEntry, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: err.toString()
      });
    }
    res.json({
      error: false,
      message: "Add Successfully",
    })
  })
})

app.post("/updatephoneentry", (req, res) => {
  
  let phoneEntry = req.body.phoneEntry;
  
    updatePhoneEntryByNumber(phoneEntry.number, phoneEntry, (err, data) => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: "Update failed"
        });
      }
      res.json({ status: "Updated" });
    })

});

app.listen(port, () => console.log(`Server started at ${port}`))


module.exports = app