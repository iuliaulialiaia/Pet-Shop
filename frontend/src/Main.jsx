import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import styles from './styles/Main.module.scss';

function Main(props) {
  const [products, setProducts] = useState([]);

  function handleResponse(response) {
    setProducts(response.data);
  }

  function handleError(error) {
    console.error(error);
  }

  useEffect(
    () => {
      axios.get(`http://localhost:3000/product`)
        .then((response) => handleResponse(response))
        .catch((error) => handleError(error));
    },
    []
  );

  return (
    <div className={styles.main}>

      {products.map((product, index) =>
        <div className={styles.product} key={index}>
          <div>
            <h4>{product.product_name}</h4>
            <p>{product.price}</p>
          </div>

          <div>
            <p>
              <FontAwesomeIcon icon={faPlus}/>
              Add to list
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default Main;