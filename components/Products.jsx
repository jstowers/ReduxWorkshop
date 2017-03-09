import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Product from './Product.jsx';
import { updateSearch } from '../redux.js';

const propTypes = {
  favs: PropTypes.array,
  cart: PropTypes.array,
  products: PropTypes.array,
  user: PropTypes.object,
  addToCart: PropTypes.func,
  addToFavs: PropTypes.func
};

const mapStateToProps = state => {
  return {
    search: state.search
  };
};


// first, updateSearch is called, that
// returns an action that is passed into the dispatch function;
// dispatch will then send action into Redux store;
// store will then call reducer;

const mapDispatchToProps = dispatch => {
  return {
    updateSearch: (e) => {
      // event object available as first argument
      // grab value from input field and passing into updateSearch
      const { value } = e.target;
      return dispatch(updateSearch(value));
    }
  };
};


export class Products extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      search: ''
    };
    //this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  /* NO LONGER NEEDED
  handleKeyDown(e) {
    // grab value of input field and setState() locally
    const { value } = e.target;
    console.log('foo: ', e.target.value);
    this.setState({ search: value });
  }
  */

  renderProducts(filter, products) {
    if (!Array.isArray(products)) {
      return <div>Loading...</div>;
    }
    // more logic could be moved into reducer, but don't want too much
    // logic in reducer
    // good place to put this logic is mapStateToProps();
    const { addToCart, addToFavs } = this.props;
    let finalProducts = products;
    if (filter) {
      finalProducts = products.filter(product => {
        return filter.test(product.name);
      });
    }
    return finalProducts.map(item => (
      <Product
        { ...item }
        addToCart={ addToCart }
        addToFavs={ addToFavs }
        key={ item.id }
      />
    ));
  }

  render() {
    const { search, products } = this.props;
    //const { search } = this.state;
    let filter;
    if (search.length > 3) {
      filter = new RegExp(
        search
          .replace(' ', '.')
          .split('')
          .join('.*')
        ,
        'i'
      );
    }
    return (
      <div className='products'>
        <div className='products-search'>
          <input
            className='products-search_input'
            onChange={ this.props.updateSearch }
            value={ search }
          />
        </div>
        <div className='products-lists'>
          { this.renderProducts(filter, products) }
        </div>
      </div>
    );
  }
}

Products.displayName = 'Products';
Products.propTypes = propTypes;

// call connect function
// arg1 = mapStateToProps
// arg2 = mapDispatchToProps
// calling it right away and passing in component as first argument

// want app to use enhanced component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
