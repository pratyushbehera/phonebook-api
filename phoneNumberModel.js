require('dotenv').config();

var mongoose = require('mongoose');
const MONGO_URI = process.env['MONGO_URI'];
console.log(MONGO_URI)
const { Schema } = mongoose;
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const phonebookSchema = new Schema({
  number: String,
  type: String,
  extn: String,
  city: String,
  state: String,
  desc: String,
  date: Date,
  isActive: { type: Boolean, default: false }
},{ collection: 'phonebook' });

let PhoneBook = mongoose.model('phonebook', phonebookSchema);

const createPhoneEntry = (phoneEntry, done) => {
  
  let document = new PhoneBook(phoneEntry);
  
  document.save((err, data) => {
    if (err)
      done(err);
    done(null, data);
  });
};


const getAllPhoneEntries = (done) => {
  PhoneBook.find(
      (err, doc) => {
      if (err)
        done(err);
      done(null, doc);
    })
    
};

const getPhoneEntryByNumber = (number, done) => {
  PhoneBook.findById(personId, (err, p) => {
    if (err)
      done(err);
    done(null, p);
  });
};

const updatePhoneEntryByNumber = (number, entry, done) => {
  PhoneBook.findOneAndUpdate({ number: number }, entry, { 'new': true }, (err, doc) => {
    if (err)
      done(err);
    done(null, doc);
  });
}


//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PhoneBook = PhoneBook;
exports.createPhoneEntry = createPhoneEntry;
exports.getAllPhoneEntries = getAllPhoneEntries;
exports.getPhoneEntryByNumber = getPhoneEntryByNumber;
exports.updatePhoneEntryByNumber = updatePhoneEntryByNumber;
