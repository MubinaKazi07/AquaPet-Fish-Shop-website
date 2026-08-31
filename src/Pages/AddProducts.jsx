import React, { useState,useEffect } from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Rating from "@mui/material/Rating";
function AddProducts() {
   const location = useLocation();
  const editProduct = location.state;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

   useEffect(() => {
  if (editProduct) {
    
    setName(editProduct.name);
    setPrice(editProduct.price);
    setImage(editProduct.image);
    setDescription(editProduct.description);
    setRating(editProduct.rating);
  }
}, [editProduct]);
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      type: "product",
      name,
      price,
      image,
      description,
      rating,
    };

    try {
      if (editProduct) {
  await axios.put(
    `https://6a4a0bc3edfa6a2b5fd784a6.mockapi.io/users/${editProduct.id}`,
    product
  );

  Swal.fire({
    icon: "success",
    title: "Updated!",
    text: "Product updated successfully.",
    timer: 1500,
    showConfirmButton: false,
  });

} else {
  await axios.post(
    "https://6a4a0bc3edfa6a2b5fd784a6.mockapi.io/users",
    product
  );

  Swal.fire({
    icon: "success",
    title: "Added!",
    text: "Product added successfully.",
    timer: 1500,
    showConfirmButton: false,
  });
}


      setName("");
      setPrice("");
      setImage("");
      setDescription("");
      setRating("");
    } catch (error) {
      console.log(error);
      Swal.fire({
  icon: "error",
  title: "Oops...",
  text: "Something went wrong!",
  footer: "<a href=\"#\">Why do I have this issue?</a>"
});
    }
  };

return (
  <section className="py-5">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">

          <div className="card shadow p-4 rounded-4">
            <h2 className="text-center mb-4">Add Product</h2>

            <form onSubmit={handleSubmit}>

              {/* Name */}
              <div className="mb-3">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Price */}
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* Image */}
              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {/* Rating*/}
              <div className="mb-3">
                <label className="form-label">
             Rating</label>
             <div className="form-control d-flex align-items-center" >
             <Rating
                  value={rating}
                  onChange={(event,newValue) => setRating(newValue)}
                />
              </div>
              </div>
<div className="d-flex justify-content-center mt-3">
<button type="submit" className="btn btn-primary ">
  {editProduct ? "Update Product" : "Add Product"}
 
</button>
 </div>
</form>
</div>
</div>
</div>
</div>
        
          </section>

);
}

export default AddProducts;
