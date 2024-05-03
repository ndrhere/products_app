const mongoose = require('mongoose');
const {Schema} = require('mongoose');


const ProductSchema = new Schema ({
    product_name: {
        type: String,
        
    },
    product_description: {
        type: String,
      
    },
    product_price: {
        type: String,
        
    }
})

const Product = mongoose.model('product', ProductSchema);
module.exports = Product