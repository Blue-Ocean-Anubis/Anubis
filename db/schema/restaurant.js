const mongoose = require("mongoose");
const { Schema } = mongoose;

const restaurantSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  state: String,
  country: {
    type: String,
    required: true
  },
  coordinates: [{
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
  }]
  dataAdded: {
    type: Date,
    required: true
  },
  apiResult: {
    type: String,
    required: true
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
