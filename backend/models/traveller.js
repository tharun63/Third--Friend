const mongoose = require("mongoose");

const TravellerSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "",
  },
  origin: {
    type: String,
    default: "",
  },
  destination: {
    type: String,
    default: "",
  },
  startJourneyDate: {
    type: String,
    default: "",
  },
  startJourneyTime: {
    type: String,
    default: "",
  },
  endJourneyDate: {
    type: String,
    default: "",
  },
  endJourneyTime: {
    type: String,
    default: "",
  },
  mobile: {
    type: String,
    default: "",
  },
  maxWeight: {
    type: String,
    default: "",
  },
  modeOfTransport: {
    type: String,
    default: "",
  },
  dealPrice: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("traveller", TravellerSchema);
