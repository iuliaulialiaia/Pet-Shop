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

  function sortByNameEvent(syntheticEvent) {
    setFilteredProducts(
      filteredProducts => {
        const sortedProducts = filteredProducts.sort(
          (p1, p2) => p1.product_name.localeCompare(p2.product_name)
        )
        return [...sortedProducts];  // rescriu referinta
      }
    );
  }

  function sortByPriceEvent(syntheticEvent) {
    setFilteredProducts(
      filteredProducts => ([...filteredProducts.sort(
        (p1, p2) => {
          // elimin "$" din fata pretului "$2.99"
          const price1 = parseFloat(p1.price.substr(1));
          const price2 = parseFloat(p2.price.substr(1));
          return price1 - price2;
        }
      )])
    );
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
      <Aside
        sortByNameEvent={sortByNameEvent}
        sortByPriceEvent={sortByPriceEvent}
      />
      <Main products={filteredProducts}/>
    </div>
  );
}

export default Content;