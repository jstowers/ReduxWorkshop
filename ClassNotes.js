// Intro to Redux
// Berkeley Martinez
// @berkeleytrues
// Wednesday, March 8, 2017

// https://github.com/realworldreact/react-shoppe


// Teacher at Real World React
// Developer at Free Code Camp
// RxJS Advocate
// Self-taught programming for 2+ years

// Slides - Made with Spectacle
// https://berkeleytrue.github.io/intro-to-redux/#/?_k=wa0rvq
 

// in a second terminal window, start an instance of mongodb:
// $ mongod

// in original terminal window, run the following:
// $ npm install 
// $ npm run seed => fill database with products on page
// $ npm start

// in a browser window, navigate to localhost:3000

/*	Basics
	1.  Actions
	2.  Reducers
	3.  Store


	Concepts
	1.	Dispatching
	2.	Data flow
	3.	Connecting with React


	Actions
		-	plain JS object
		-	one property mandatory:  type => string unique to that questions
		- 	payload: any data assoicated with the action

			const action = {
				type: 'THIS_IS_MY_TYPE',
				payload: { data: 'dftba'}
			}

		action must be serializable - if you toString(), do you lose any information?

			only want things that can be in a JSON object:
				arrays,
				objects,
				string

		- Purpose - describe an event, any event.  Actions trigger state changes

		- type - tells Redux how to change state


	Reducers
		- describes how actions can affect change

		- plain JS function

		- called in response to actions

		- check type

		- return state

			function my Reducer(state, action) {

				// check type
				if(action.type === 'CLICK_BUTTON')
	
				// checks type of action and changes state accordingly
				const newState = {};
				newState.count = state.count + 1;
				return newState;
			}

		Rules of Thumb
		1.  Never mutate state
		2.  Create new state object
		3.  Always return state
		4.	Do not assume state shape

		- if state undefined, can initialize with 
			const newState = Object.assign({}, state);

			Object.assign => allows you to copy properties from many different objects onto 
			a new one

		-  Object.assign
			- create a clone of an object
			- modify this new object only

		-	combineReducers
			- create multiple reducers
			- each representing some discrete part of your app
			- producer one reducer function

			import { combineReducers } from 'redux'

			function countReducer(count = initialCount, action) {
				if (action.type === 'INC') {
	
				} else if (action.type == 'DEC')
				{
	
				}

			}

			combineReducers creates a new plain reducer function

				export default combineReducer({
					count: countReducer,
					modal: modalReducer
				})
	Store

		- holds entire application state

		- state only accessible through getState() method

		- action => reducer => store => newState


		import { createStore } from 'redux'

		const store = createStore(mainReducer)

			// creates a plain store object

			// properties:
				1.  .getState()
				2.	.listen() => doesn't get any state itself, just notified when state changes

		Getting actions into store

			store.dispatch({type:'INC'});

			store.dispatch({type:'OPEN_MODAL'})



How do we connect with React?

	react-redux library API

	1. 'connect' 	connects redux to react components (pull state out)
	2. 'Provider'	injects store into react app; puts store into React

	context object
		useful for library author
		not as useful for applications

		react router uses context to place router into Reactland

		Radium puts object on context => how they inject state into components below

	connect()
		it is a thunk - a function that when called returns another function

		the connect() function takes an options object and returns another function (enhances component)

		mapStateToProps(global state object) 
			must return an object
			properties of that object merged to props of component??

		mapDispatchToProps()
			must return an object
			the properties of that object merged to props of component

			function you define, receives dispatch function and return an object??


		the returned component is called a HOC (higher order component), essentially
		wrapping your component in an outer component.  Mostly the outer component
		is responsible for putting data into props.

		big push to change terminology from HOC to "component enhancers"


Container / Presenter Pattern

	1.  Container => all the logic
	2.	Presenter => displays UI


Higher Order Component
	1.	Component that wraps another component

	import { connect } from 'react-redux'

	const mapDispatchToProps = dispatch => {
		// returning an object
		return {
			// dispatch an action => action creator
			openModal: () => dispatch({
				type:'OPEN_MODAL'
			})
		};
	}

	// state = entire state object
	const mapStateToProps = state => {
		return {
			showModal: state. ....??
		}
	}

	// returns another function
	const createConnectedComponent = connect(
		mapStateToProps,
		mapDispatchToProps
	)

	// pass in MyComponent (a presenter, just takes props and returns JSX)
	// exporting enhanced component (createConnectedComponent)
	export default createConnectedComponent(MyComponent)

// NOTE: look at Redux source code - API pretty simple - one version <100 lines
// Look at source code for connect() function (enhanced component) => 
// lot of caching, reference checking, so to re-render MyComponent as little as possible.



//	Provider - injects store into React

	import { Provider } from 'react-redux'

		<Provider store = { store }>

			// any connected component can pull off state from store


	Will use react-router for this project

		<Router history = { history }>


// Helpers - Action Creators

	instead of creating actions manually in your app, we can localize the process
	of creating actions in area where defining types.  

	mapDispatchToProps object form


// TECH STACK

	1.	Hot Module Loading
			- Webpack wraps components in specific API,
			- When change component, Webpack notes change,
				swaps components, and makes change in browser, without refresing page
			- Faster development

	2.	Webpack - bundling
			- Dev Server => mount on Browsersync
			- Request for JS files never hit web server
			- webpack built in memory - very fast

	3.	Gulp - run tasks:
			- build CSS
			- start Webpack
			- start Browsersync
			- watch for file changes
			- source mapping

	4.	Loopback - API server
			- database agnostic - connectors for SQL, MongoDB, Postgres

	5.	Browsersync

	6.	Seed Directory
			- reading JSON file of data
			- about 10 different products
			- uses Loopback app to save into database

	GOAL TODAY
	1.	Syntax API - how to structure an app
	2.	Flat file structure -
	3.  Build Redux into app
	4.	Structure
			client/
				entry point for bundle
			common
			server



// LOOPBACK

	Framework built on Express to create REST API

	Based on model schema you design:

		check out the schema in: server/models/

		lets you describe in models in JSON then creates API.

	Use user stories to fill the app.


	Explore REST API for this project at:

		http://localhost:3000/explorer/

		Two models
		1.	Products
		2.	User
				- Login/logout API
				- Posts


	PORTS
	1.	3000	Main port (localhost:3000)

	2.	3001	API server

	3.	3002	Browsersync dashboard (localhost:3002)

				- proxies the 3001 port to 3000

				- watches for CSS changes, no hard refresh needed

				- sync scrolling of dev app on multiple pages

				- take external API address and put on cell phone, doesn't work on public WiFi
	
// FETCH API

	Wraps AJAX request in Promises

	Some weird behavior:
		404's and 500's => don't actually throw errors

		in ./utils/make-fetch:
			- wrapping fetch in another fetch

			- when make fetch request, get response (res), need to check OK property

			- if not OK, then throw error with status text

			- if want JSON data, need to call res.json(), which returns another promise

// STORE APP

	1. Simple e-commerce site to buy fruits and vegetables.

	2. Like fruits to create a likelist 

	3. Currently, state store in top-level component, then passing down functions to change
		state in child components

	4. No sign out, go to LocalStorage and 

	5. Signup info (username and password) stored in Mongo


	6. React Router

		cloneElement()

			once component turned into element, can't put props into it.

			cloneElement() allows you to add more props to an element.

			need to inject props into children



Redux DevTools Extension
-- allows us to copy sto

window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


Redux Actions
-- NPM library
-- helps alot wit

----------------------------------------------------------------------

Slides:

go to Berkeley's Github page:

	berkleytrue/intro-redux-async

look for link at top of Github page:

	https://berkeleytrue.github.io/intro-redux-async/#/?_k=av27it

Redux is Sync
	action creators
	calls to dispatch
	reducer state updates
	store calls listeners
	connect components setState


Events and Async
	The start
	The completion
	The error


Redux-Thunk

	Think of it as an action creator creator

	A function that returns another function

	Dispatch function -> takes an object and triggers the reducer


Middleware
	
	In express, it's a request handler that handles request before it hits a render

	Used to verify data or authenticaiton

	Here, in Redux, we're intercepting actions 
		- check if an action is a function or an object


	- Store Enhancer
		wraps store in outer layer
		storing history of actions and state changes -> goes to dev tools extension

	- Redux Thunk
		mock dispatch

	
	applyMiddleware()
		piece of API from redux
		creates a store enhancer
		can have many types of middleware

	DEMO:


	import { createStore, applyMiddleware } from 'redux';
	import thunkMiddleware from 'redux-thunk'

	const store = createStore(
		rootReducer,
		enhanceStoreWithMiddlewares
	)

	store.dispatch(fethUserInfo())




	in console:
	> store.dispatch((dispatch,getState) =>{
		dispatch({ type: 'FOO' });
		console.log('state from within thunk:', getState());
	})


	> store.dispatch((dispatch, getState) => {
		setInterval(() => dispatch({ type: 'FOO'}), 100);
	});

*/


//  Reselect
//  simple "selector" library for Redux


/*	Middleware Example

function createThunkMiddleware(extraArgument){
	// next - triggers next middleware in chain to start
	return ({ dispatch, getState }) => next => action => {
		if (typeof action === 'function') {
			return action(dispatch, getState, extraArgument);
		}
		return next(action);
	};
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;


5:25 pm
----------------------------------------------------------------------
!! EXTRA !!  SERVER-SIDE RENDERING
----------------------------------------------------------------------
- specific use case
- specific companies (Pinterest)
- want to create a new store for each request, don't want state
	leaking from one user's store to another (i.e., credit card info)

- redux thunk library:
	




























