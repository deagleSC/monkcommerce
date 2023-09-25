// const mongoose = require('mongoose');
import mongoose from "mongoose";

// Category schema
const categorySchema = new mongoose.Schema({
    categoryID: String,
    name: String,
    productCount: {type: Number, default: 0},
    products: [{type: String}],
  });

export default mongoose.model("Category", categorySchema);