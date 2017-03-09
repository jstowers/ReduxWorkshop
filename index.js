
import { createElement } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { render } from 'react-dom';
import { Router, browserHistory as history } from 'react-router';

import routes from './routes.jsx';
import reducer from './redux.js';

const middlewareStoreEnhancer = applyMiddleware(
	thunkMiddleware.withExtraArgument({
		// encapsulating thunk so have own API
		// if DOM specific, pull it off the thunk
		localStorage
	})
);

const devToolStoreEnhancer = 
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
	window.__REDUX_DEVTOOLS_EXTENSION__() || 
	((x) => x);

const store = createStore(
	reducer,
	compose(middlewareStoreEnhancer, devToolStoreEnhancer)
);

// second arg => can be a function, Redux assumes it's a store enhancer
// store enhancer will wrap Redux store in another store
// allows store enhancer to intercept state changes
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// window.store = store;

/*
const store = createStore(
	reducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

*/

window.store = store;

// <Provider store = { store }>
// 

render(

  // add provider to app
  	// first arg is component
  	// second arg is props
  	// third arg is children of the provider

  createElement(
  	Provider,
  	{ store },
  	createElement(Router, { routes, history }),
  ),
  window.document.getElementById('app')
);


