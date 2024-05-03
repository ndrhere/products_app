const Product = require('../Schema/ProductSchema');



exports.getProducts = async (req, res) => {
const product = await Product.find();
res.status(201).json(product)
}



exports.createProduct = async (req, res) => {
const {product_name, product_description, product_price} = req.body;
console.log(req.body)
const product = await Product.create({
    product_name: product_name,
    product_description: product_description,
    product_price: product_price
})
res.status(201).json(product)
}




exports.updateProduct = async (req, res) => {
    const productId = req.params.id;
    const {product_name, product_description, product_price} = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(productId, {product_name, product_description, product_price}, {new:true});
    if(!updatedProduct){
        return res.json({message: "No product to update"})
    }
    res.status(201).send(updatedProduct)
}




exports.deleteProduct = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId)
    res.end();

}