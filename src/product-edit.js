import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory,useParams } from "react-router-dom";

function ProductEdit(props) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const {id} = useParams();
  
    // console.log(params)

  useEffect( () => {
    let fetchData = async () => {
      try {
        let product = await axios.put(
          `https://60efffc0f587af00179d3c17.mockapi.io/products/${id}`
        );
        setProductName(product.data.productName);
        setPrice(product.data.price);
      } catch (error) {}
    }
    fetchData()
    // eslint-disable-next-line
  }, []);

  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(
        `https://60efffc0f587af00179d3c17.mockapi.io/products/${id}`,
        { productName, price }
      );
      setLoading(false);
      history.push("/product");
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  return (
    <div>
      {/* *****************************/}
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h6 class="h3 mb-0 text-gray-800">Edit Product</h6>
      </div>
      {/* *****************************/}
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/******************************/}
            <div className="col-lg-6">
              <label>Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={e => {
                  setProductName(e.target.value);
                }}
                className="form-control"
              />
            </div>
            {/* *****************************/}
            <div className="col-lg-6">
              <label>Price</label>
              <input
                type="text"
                value={price}
                onChange={e => {
                  setPrice(e.target.value);
                }}
                className="form-control"
              />
            </div>
            <div className="col-lg-12">
              <input
                type="submit"
                value="Update"
                disabled={isLoading}
                className="btn btn-primary mt-3"
              />
            </div>

            {/* *****************************/}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductEdit;
