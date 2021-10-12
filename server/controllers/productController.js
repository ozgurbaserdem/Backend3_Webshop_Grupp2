const Product = require("./../models/ProductModel");

exports.getAllProducts = (req, res) => {};

exports.getSingleProduct = async (req, res) => {
  const productId = req.params.id;
  console.log(productId);

  const product = await Product.findById(productId);
  res.status(200).json(product);
};

exports.deleteSingleProduct = async (req, res) => {
  const productId = req.params.id;

  await Product.findByIdAndDelete(productId);
};

exports.addProduct = async (req, res) => {
  const images = [];
  const image1 = req.body.image1 ? req.body.image1 : "defaultimage.jpg";
  const image2 = req.body.image2 ? req.body.image2 : "defaultimage2.jpg";
  const image3 = req.body.image3 ? req.body.image3 : "defaultimage3.jpg";
  images.push(image1, image2, image3);

  const newProduct = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    weight: req.body.weight,
    manufacturer: req.body.manufacturer,
    thumbnail: req.body.thumbnail,
    images: images
  };

  const product = await new Product(newProduct);
  product.save();
  res.status(200).json(product);
};