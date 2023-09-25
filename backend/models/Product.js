// const mongoose = require('mongoose');
import mongoose from "mongoose";

// Product schema
const productSchema = new mongoose.Schema({
  sku: Number,
  name: String,
  salePrice: Number,
  images: [{href: String}],
  digital: Boolean,
  shippingCost: Number,
  description: String,
  customerReviewCount: Number,
  category: String
});

export default mongoose.model("Product", productSchema);