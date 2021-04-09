import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Aside from './Aside';
import Main from './Main';
import SearchInput from './SearchInput';
import styles from './styles/Content.module.scss';

function Content(props) {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');

  function handleResponse(response) {
    setAllProducts(response.data);
    setFilteredProducts(response.data);
  }

  function handleError(error) {
    console.error(error);
  }

  function searchEvent(syntheticEvent) {
    setSearch(syntheticEvent.target.value);
  }

  useEffect(
    () => {
      axios.get(`http://localhost:3000/product`)
        .then((response) => handleResponse(response))
        .catch((error) => handleError(error));
    },
    []
  );

  useEffect(
    () => {
      let s = search.trim();
      setFilteredProducts(
        (s.length === 0) ?
          allProducts :
          allProducts.filter(
            product => {
              let name = product.product_name.toLowerCase();
              let brand = product.brand_name.toLowerCase();
              let search = s.toLowerCase();
              return name.includes(search) || brand.includes(search);
            }
          )
      );
    },
    [allProducts, search]
  );

  return (
    <div className={styles.content}>
      <SearchInput event={searchEvent}/>
      <Aside/>
      <Main products={filteredProducts}/>
    </div>
  );
}

export default Content;