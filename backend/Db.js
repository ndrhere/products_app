const mongoose = require('mongoose');
const mongoURI = 'mongodb://127.0.0.1:27017/products_app?directConnection=true';


async function connectToMongo () {
try{
    await mongoose.connect(mongoURI);
    console.log("MongoDb connected successfully")
}catch(error){
    console.error("Error occured", error)
}
}

module.exports = connectToMongo()