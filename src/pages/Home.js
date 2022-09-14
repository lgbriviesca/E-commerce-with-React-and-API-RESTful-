import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  filterCategoryThunk,
  getCategoriesThunk,
  getProductsThunk,
  filterTitleThunk,
} from '../redux/actions';
import '../App.css';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const categories = useSelector(state => state.categories);
  const [title, setTitle] = useState('');

  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(getCategoriesThunk());
  }, []);

  const searchProduct = e => {
    e.preventDefault();
    dispatch(filterTitleThunk(title));
  };

  console.log(title);

  return (
    <div>
      <body className="body">
        <aside>
          <h5>Category</h5>
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => dispatch(filterCategoryThunk(category.id))}
            >
              {category.name}
            </button>
          ))}
        </aside>

        <main>
          <div className="search">
            <form onSubmit={searchProduct}>
              <input
                type="text"
                placeholder="what are you looking for?"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="input"
              />
              <button className="search-button">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
          <div className="products-grid">
            <ul className="grid">
              {products.map(productItem => (
                <article key={productItem.id} className="card">
                  <Link className="link" to={`/product/${productItem.id}`}>
                    <div className="card-img-container">
                      {' '}
                      <img
                        className="card-img"
                        src={productItem.productImgs[0]}
                        alt=""
                      />
                    </div>
                    <div className="card-text">
                      <h6>{productItem.title}</h6>
                      <p>Price</p>
                      <h6>$ {productItem.price}</h6>
                    </div>
                  </Link>
                </article>
              ))}
            </ul>
          </div>
        </main>
      </body>
      <footer>
        <p>Luis Guerrero 2022</p>
      </footer>
    </div>
  );
};

export default Home;
