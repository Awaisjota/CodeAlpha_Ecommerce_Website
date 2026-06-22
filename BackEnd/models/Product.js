import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
  },

  stock: {
    type: Number,
    required: true,
    min: 0,
  },

  category: {
    type: String,
    required: true,
    trim: true,
  },

  brand: {
    type: String,
    trim: true,
  },

  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },

  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },

  isFeatured: {
    type: Boolean,
    default: false,
  },

  discount: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Product', productSchema);


import fs from "fs";

const products = JSON.parse(
  fs.readFileSync("./products.json", "utf-8")
);

console.log("Products seeded");
