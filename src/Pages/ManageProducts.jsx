import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ManageProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
    const[quantity,SetQuantity]= useState(1);
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://6a4a0bc3edfa6a2b5fd784a6.mockapi.io/users"
      );

      setProducts(response.data.filter((product) => product.type !== "cart" && product.type !== "admin"));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `https://6a4a0bc3edfa6a2b5fd784a6.mockapi.io/users/${id}`
      );

      await Swal.fire({
        title: "Deleted!",
        text: "Product deleted successfully.",
        icon: "success",
      });

      fetchProducts();
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="text-center mb-4">Manage Products</h2>

      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Rating</th>
            <th>Price</th>
            <th>Manage</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>

              <td>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name || "Product"}
                    width="70"
                    height="70"
                    style={{ objectFit: "cover", borderRadius: "8px" }}
                  />
                ) : (
                  <span className="text-muted">No image</span>
                )}
              </td>

              <td>{product.name || "No name"}</td>
              <td>{product.rating ?? "—"}</td>
              <td>{product.price ? `₹${product.price}` : "—"}</td>
             

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() =>
                    navigate("/addproducts", {
                      state: product,
                    })
                  }
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default ManageProducts;
