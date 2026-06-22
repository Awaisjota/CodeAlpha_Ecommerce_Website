import Product from "../models/Product.js"

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product created successfully!",
      product,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllProducts = async (req, res) => {
  try {

    const {search, category, brand, minPrice, maxPrice } = req.query;

    let filter = {};

    if (category) {
        filter.category = category
    }

    if (minPrice || maxPrice) {
        filter.price = {};

        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (brand) {
        filter.brand = brand
    }

    if (search) {
        filter.name = {$regex: search, $options: "i"};
    }

    const products = await Product.find(filter);

    res.status(200).json({
      message: "Products fetched successfully!",
      products,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product fetched successfully!",
      product,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const editProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully!",
      updatedProduct,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully!",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};