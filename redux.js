// Reducer Function
// March 8, 2017

// grab all the named exports from api.js
// and create an object called api and place all those exports
// in the object
import * as api from './api.js';

//
// api.removeFromCart()

const types = {
	INC: 'INC',
	DEC: 'DEC',
	FETCH_PRODUCTS: 'FETCH_PRODUCTS', // fetch request about to start
	FETCH_PRODUCTS_ERROR: 'FETCH_PRODUCTS_ERROR',
	UPDATE_PRODUCTS: 'UPDATE_PRODUCTS',
	UPDATE_SEARCH: 'UPDATE_SEARCH',
	UPDATE_USER: 'UPDATE_USER'
};

// initialize state 
const initialState = {
	count: 0,
	search: '',
	products: [], 
	user: {},
	cart: [],
	favs: [],
	token: null,
	isSignedIn: false
};

// action creator
export const increment = () => {
	return {
		type: types.INC
	};
};

// action creator
// search = input field value
export const updateSearch = (search) => {
	return {
		type: types.UPDATE_SEARCH,
		payload: search
	};
};

export const updateProducts = (products) => {
	return {
		type: types.UPDATE_PRODUCTS,
		payload: products
	};
};

export const updateUser = user => {
	return {
		type: types.UPDATE_USER,
		payload: user
	};
};

export const updateCart = cart => {
	return {
		type: types.UPDATE_CART,

	}
}

// create first thunk
export const fetchProducts = () => {
	return (dispatch) => {
		dispatch({ type: types.FETCH_PRODUCTS });
		api.fetchProducts()
      	.then(products => {
          return dispatch(updateProducts(products));
       	})
      	.catch(err => 
      		dispatch({ type: types.FETCH_PRODUCTS_ERROR, payload: err }))
	};
}

export const fetchUser = () => {
	return (dispatch, getState, { localStorage }) => {
		const id = localStorage.getItem('id');
		const accessToken = localStorage.getItem('accessToken');

		if (id && accessToken){
		  dispatch({ type: types.FETCH_USER });	
		  api.fetchUser(id, accessToken)
		  .then(
		  	user => {
				dispatch(updateUser({...user, accessToken }));
		  });
		}
	};
}

// New Thunk
export const addToCart = (item) => {
	return (dispatch, getState) => {
		const { token, user } = getState();
		if(!user.id || !token) {
			return null
		}
		return api.addToCart(user.id, token, itemId)
		  .then(({cart}) => dispatch({
		  	type: types.UPDATE_CART, payload: cart
		  }))
	}
}


export default (state = initialState, action) => {

	// console.log('action: ', action, 'state: ', state);

	if(action.type === types.UPDATE_CART) {
		
	}

	if(action.type === types.UPDATE_USER){
		console.log('update user: ', action.payload);
		const user = action.payload;
		return {
			...state,
		  	user,
		    cart: user.cart || [],
		    favs: user.favs || [],
		    token: user.accessToken,
		    isSignedIn: !!user.username
		};
	}

	if(action.type === types.UPDATE_SEARCH){
		console.log('update search: ', action.payload);
		return {
			...state,
			// use payload property of action
			// to carry state from input field to reducer
			// search term or empty string
			search: action.payload || ''
		};
	}

	if (action.type === types.UPDATE_PRODUCTS) {
		return {
			...state,
			// intialize products property to payload
			products: action.payload
		};
	}

	if(action.type === types.INC){
		// first arg is empty object
		// second arg pass in old state
		// third arg is object with new/updated properties
		return Object.assign({}, state, {
			count: state.count + 1
		});
	}

	if(action.type === types.DEC){
		return {
			// create a new object, copy properties of state
			// onto new object, then add new/overwrite property count on state object
			...state, 
			count: state.count - 1
		};
	}

	return state;
}