const express = require('express');
const app = express();
app.use(express.json());
var cors = require('cors');
const connectToMongo = require('./Db');

app.use(cors());
const PORT = 3000;
const UserRoutes = require('./routes/UserRoutes');
const ProductRoutes = require('./routes/ProductRoutes');

app.use('/user', UserRoutes)
app.use('/product', ProductRoutes)



app.listen(PORT, () => {
    console.log(`App is listening at the port  ${PORT}`)
})