const Product = require('../models/Product');

// Function to create a new product (Admin only)
const createProduct = async (req, res) => {
  const { prodName, prodDesc, prodPrice } = req.body;

  try {
    // Check if the authenticated user is an admin
    if (req.user.isAdmin) {
      // Create a new product record
      const newProduct = new Product({
        prodName,
        prodDesc,
        prodPrice,
      });

      // Save the product record to the database
      await newProduct.save();

      return res.status(201).json({ message: 'Product created successfully.', product: newProduct });
    } else {
      return res.status(403).json({ message: 'You do not have permission to create a product.' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error while creating the product.', error: error.message });
  }
};

// Function to retrieve all products
const getAllProducts = async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find();

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: 'Error while retrieving products.', error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.findById(req.params.id);

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ message: 'Error while retrieving products.', error: error.message });
  }
};


module.exports = {
  createProduct,
  getAllProducts,
  getProduct,

};
