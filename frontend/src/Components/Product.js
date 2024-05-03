import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const Product = () => {
const [products, setProducts] = useState([]);
const [selectedProduct, setSelectedProduct] = useState(null);
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');

    const fetchProducts = async () => {
        const authToken = localStorage.getItem("auth-Token")
        console.log("Here is the token", authToken)
        const response = await fetch('http://localhost:3000/product/getProducts', {
            method: 'GET',
            headers: {
                'Authorization': `${authToken}`
            }
        })
        const data = await response.json();
        setProducts(data)
    }

    useEffect(() => {
      fetchProducts()
    }, [])


const handleUpdate = async () => {
    const authToken = localStorage.getItem("auth-Token")
if(selectedProduct){
    const response = await fetch (`http://localhost:3000/product/updateProduct/${selectedProduct._id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            'Authorization': `${authToken}`
        },
        body: JSON.stringify({product_name: name, product_description: description, product_price: price})
    })
    fetchProducts();
    console.log("price is", price)
    setName('');
    setDescription('');
    setPrice('')
}
}

const handleInputChange = (event) => {

const {name, value} = event.target;
if(name==='name'){
    setName(value)
}else if(name==='description'){
    setDescription(value)
}else if(name==='price'){
    setPrice(value)
}

}






const handleEdit = (product) => {

setSelectedProduct(product);
setName(product.product_name);
setDescription(product.product_description);
setPrice(product.product_price)

console.log("selectedProduct", selectedProduct)
} 


const handleAddProduct = async (event) => {
    event.preventDefault();
    const authToken = localStorage.getItem("auth-Token")
    const response = await fetch ('http://localhost:3000/product/createProduct', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        'Authorization': `${authToken}`
    },
    body: JSON.stringify({product_name: name, product_description: description, product_price: price})
})
const data = await response.json();
fetchProducts();
setName('');
setDescription('');
setPrice('')
}




const handleDelete = async (id) => {
    const authToken = localStorage.getItem("auth-Token")
    const response = await fetch(`http://localhost:3000/product/deleteProduct/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `${authToken}`
        }
    })
    fetchProducts();
}

  return (
    <div>

<div>
    <h3>Add Product Here</h3>
    <form className="product">
        <input type="text" className="form-control my-3" name="name" value={name} id="name" onChange =  {handleInputChange} placeholder="Product-name"/>
        <input type="text" className="form-control my-3" name="description" value={description} id="description" onChange = {handleInputChange} placeholder="Product-description"/>
        <input type="text" className="form-control my-3" name="price" id="price" value={price} onChange = {handleInputChange} placeholder="Product-price"/>
        <button className="btn btn-primary btns mx-4 my-4" type="button" onClick={handleAddProduct}>Add Product</button>
    </form>

    <div className="row">
        {Array.isArray(products) && products.map((product) => (
            <div key={product._id} className="col-md-4">
                <div className="card my-4">
                 <div className="card-body">
                    <span><h5 style={{color:"green"}}>Product Name </h5></span><span><li>{product.product_name}</li></span>
                    <h5 style={{color:"green"}}>Product Description </h5><span><li>{product.product_description}</li></span>
                    <h5 style={{color:"green"}}>Product Price </h5><span><li>{product.product_price}</li></span>
                  </div>
                </div>
                <button className="btn btn-success mx-1" type="button" onClick={handleUpdate}>Update</button>
                <button className="btn btn-success mx-1" type="button" onClick={() => handleDelete(product._id)}>Delete</button>
                <button className="btn btn-success mx-1" type="button" onClick={() => handleEdit(product)}>Edit</button>
                </div>
        ))}
    </div>
</div>




    </div>
  )
}

export default Product