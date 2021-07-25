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
  res.sendFile('doc/index.html', {root: __dirname })
});


app.get("/getallphoneentries", (req, res) => {
  
  getAllPhoneEntries((err, data) => {
    if (err) {
      return res.status(400).json({
        error: true,
        message: "Unable to fetch"
      });
    }
    res.json({
      phoneEntries: data,
    })
  })
});


app.post("/createphoneentry", (req, res) => {
  
  let phoneEntry = req.body.phoneEntry;
  
  createPhoneEntry(phoneEntry, (err, data) => {
    if (err) {
      return res.json({
        error: true,
        message: "Phone entry addition failed"
      });
    }
    res.json({
      message: "Phone entry addition successful",
    })
  })
})

app.post("/updatephoneentry", (req, res) => {
  
  let phoneEntry = req.body.phoneEntry;
  
    updatePhoneEntryByNumber(phoneEntry.number, phoneEntry, (err, data) => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: "Phone entry update failed"
        });
      }
      res.json({ message: "Phone entry update Successful" });
    })

});

app.listen(port, () => console.log(`Server started at ${port}`))


module.exports = app