const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
});
const Product =
  mongoose.models?.Product || mongoose.model("Product", ProductSchema);

module.exports = Product;
