// 1. crear la propiedad en el objeto actions
// 2. creamos el case en el reducer por la propiedad que creamos en el paso 1
// 3. crear la función en el archivo actions
// 4. despachar en un componente o un thunk

import axios from 'axios';

export const actions = {
  setProducts: 'SET_PRODUCTS',
  setIsLoading: 'SET_ISLOADING',
  setCategories: 'SET_CATEGORIES',
  setCart: 'SET_CART',
  setPurchases: 'SET_PURCHASES',
  setPurchasesDone: 'SET_PURCHASES_DONE',
};

const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
});

export const setProducts = product => ({
  type: actions.setProducts,
  payload: product,
});

export const setIsLoading = isLoading => ({
  type: actions.setIsLoading,
  payload: isLoading,
});

export const setCategories = categories => ({
  type: actions.setCategories,
  payload: categories,
});

export const setCart = cart => ({
  type: actions.setCart,
  payload: cart,
});

export const setPurchases = purchases => ({
  type: actions.setPurchases,
  payload: purchases,
});

export const setPurchasesDone = purchasesDone => ({
  type: actions.setPurchasesDone,
  payload: purchasesDone,
});

export const getProductsThunk = () => {
  return dispatch => {
    dispatch(setIsLoading(true));
    return axios
      .get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
      .then(res => dispatch(setProducts(res.data.data?.products)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const getCategoriesThunk = () => {
  return dispatch => {
    dispatch(setIsLoading(true));
    return (
      axios
        .get(
          'https://ecommerce-api-react.herokuapp.com/api/v1/products/categories/'
        )
        .then(res => dispatch(setCategories(res.data.data?.categories)))
        /* .then((res) => dispatch(console.log(res.data.data?.categories))) */
        .finally(() => dispatch(setIsLoading(false)))
    );
  };
};

export const filterCategoryThunk = id => {
  return dispatch => {
    dispatch(setIsLoading(true));
    return (
      axios
        .get(
          `https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${id}`
        )
        .then(res => dispatch(setProducts(res.data.data?.products)))
        /*   .then((res) => dispatch(console.log(res.data.data?.products))) */
        .finally(() => dispatch(setIsLoading(false)))
    );
  };
};

export const filterTitleThunk = title => {
  return dispatch => {
    dispatch(setIsLoading(true));
    return (
      axios
        .get(
          `https://ecommerce-api-react.herokuapp.com/api/v1/products/?query=${title}`
        )
        .then(res => dispatch(setProducts(res.data.data?.products)))
        /* .then(res => dispatch(console.log(res.data.data?.products))) */
        .finally(() => dispatch(setIsLoading(false)))
    );
  };
};

export const loginThunk = credentials => {
  return dispatch => {
    dispatch(setIsLoading(true));
    return axios
      .post(
        'https://ecommerce-api-react.herokuapp.com/api/v1/users/login',
        credentials
      )
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const addCartThunk = product => {
  return dispatch => {
    dispatch(setIsLoading(true));
    return axios
      .post(
        'https://ecommerce-api-react.herokuapp.com/api/v1/cart',
        product,
        getConfig()
      )
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const getCartThunk = () => {
  return dispatch => {
    dispatch(setIsLoading(true));
    return (
      axios
        .get(
          'https://ecommerce-api-react.herokuapp.com/api/v1/cart/',
          getConfig()
        )
        .then(res => dispatch(setCart(res.data.data?.cart)))
        /*  .then(res => dispatch(console.log(res.data))) */
        .catch(error => {
          if (error.response?.status === 404) {
            console.log('El carrito esta vacio');
          }
        })
        .finally(() => dispatch(setIsLoading(false)))
    );
  };
};

export const deleteProductInCartThunk = id => {
  return dispatch => {
    dispatch(setIsLoading(true));
    return axios
      .delete(
        `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`,
        getConfig()
      )
      .then(() => dispatch(getCartThunk()))
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const addPurchasesThunk = purchase => {
  return dispatch => {
    dispatch(setIsLoading(true));
    return axios
      .post(
        'https://ecommerce-api-react.herokuapp.com/api/v1/purchases',
        purchase,
        getConfig()
      )
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const getPurchasesDoneThunk = () => {
  return dispatch => {
    dispatch(setIsLoading(true));
    return axios
      .get(
        'https://ecommerce-api-react.herokuapp.com/api/v1/purchases',
        getConfig()
      )
      .then(
        res =>
          dispatch(setPurchasesDone(res.data.data.purchases)) &&
          dispatch(setCart([]))
      )
      .then(res => dispatch(console.log(res.data.data.purchases)))
      .finally(() => dispatch(setIsLoading(false)));
  };
};
