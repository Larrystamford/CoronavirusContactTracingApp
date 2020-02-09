const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactsSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    currentStatus: {
      type: String,
      required: true
    },
    contacts: {
      type: Array
    }
  },
  { 
    timestamps: true
  }
);

const Contacts = mongoose.model("Contacts", contactsSchema);

module.exports = Contacts;
