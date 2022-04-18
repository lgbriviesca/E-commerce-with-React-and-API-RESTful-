import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getProductsThunk, addCartThunk, } from "../redux/actions";
import axios from "axios";
import ImageGallery from 'react-image-gallery';
import "../styles/product-detail.css";

const ProductDetail = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [productFiltered, setProductFiltered] = useState([]);

  const [quantity, setQuantity] = useState(0);

  const product = useSelector((state) => state.products);

  useEffect(() => dispatch(getProductsThunk()), [dispatch]);

  const productFound = product.find((productItem) => productItem.id === Number(id));

  useEffect(() => {
    if (productFound) {
      axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${productFound?.category.id}`)
        .then((res) => setProductFiltered(res.data.data?.products));
    }
  }, [dispatch, productFound]);


  const addProduct = () => {
    const product = {
      id,
      quantity
    };
     console.log(product) 
    dispatch(addCartThunk(product));
  };

  console.log(productFound)
  console.log(productFiltered)

//----

const images = [
  {
    original: productFound?.productImgs[0],
    thumbnail: productFound?.productImgs[0],
    originalHeight: "200px",
    thumbnailClass:"test",
  },
  {
    original: productFound?.productImgs[1],
    thumbnail: productFound?.productImgs[1],
    originalHeight: "200px",
    thumbnailClass:"test2",
  },
  {
    original: productFound?.productImgs[2],
    thumbnail: productFound?.productImgs[2],
    originalHeight: "200px",
    thumbnailClass:"test3",
  },
];

  return (
    <div>
<div className="product-detail-container">

       <div className="img-detail-container">
  {/* 
        <img src={productFound?.productImgs[0]} alt="" />
        <img src={productFound?.productImgs[1]} alt="" />
        <img src={productFound?.productImgs[2]} alt="" />  */}

<ImageGallery items={images} autoPlay={true}/>

      </div>

      <div className="description-detail-container">
        <h2>{productFound?.title}</h2>
        <p>{productFound?.description}</p>


<div className="price-quantity-text">
  <p>Price</p>
  <p className="quantity-text">Quantity</p>
</div>

        <div className="price-quantity-form">
        <p>$ {productFound?.price}</p>  
        <div className="input-container">
          <input
          className="quantity"
            type="number" 
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div> 

        </div>
        <button onClick={addProduct} className="add-to-cart">Add to cart <i className="fa-solid fa-cart-shopping"></i></button>
      </div>
</div>

<div className="other-products-container">
<ul className="other-products-grid">
        {productFiltered.map((productItem) => (
          <div className="other-products-card" key={productItem.id}>
            <Link className="link-to-other-products" to={`/product/${productItem.id}`}>
           <div className="link-img-container"> <img src={productItem.productImgs[0]} alt="" /></div>
           <div className='others-card-text'>
                <h6>{productItem.title}</h6>
                <p>Price</p>
                <h6>$ {productItem.price}</h6>
                </div> 
            </Link>
          </div>
        ))}
      </ul>
</div>

<footer>
        <p>Luis Guerrero 2022</p>
      </footer>
    
    </div>
  );
};

export default ProductDetail;