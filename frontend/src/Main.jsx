import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faStar, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import styles from './styles/Main.module.scss';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function Main(props) {
  // informatii despre un singur produs afisat
  const [id, setId] = useState(0);
  const [product, setProduct] = useState({});
  const [rating, setRating] = useState([]);

  function handleGetProductResponse(response) {
    // response.data este un array cu un singur obiect
    setProduct(response.data[0]);

    let jsxRating = [];
    for (let i = 0; i < response.data[0].rating; i++) {
      jsxRating.push(<FontAwesomeIcon key={i} icon={faStar}/>);
    }
    setRating(jsxRating);
  }

  function handleError(error) {
    console.error(error);
  }

  function handleDeleteProductResponse(response) {
    setId(0);
    window.location.reload(true);
  }

  function deleteProduct() {
    console.log('ma execut');
    axios.delete(`http://localhost:3000/product/${id}`)
      .then((response) => handleDeleteProductResponse(response))
      .catch((error) => handleError(error));
  }

  function deleteProductEvent(syntheticEvent) {
    confirmAlert({
      title: 'Confirmare stergere produs',
      message: 'Sunteti sigur ca vreti sa stergeti produsul din baza de date?',
      buttons: [
        {label: 'Da', onClick: () => deleteProduct()},
        {label: 'Nu'}
      ]
    });
  }

  useEffect(
    () => {
      if (id === 0) return;
      axios.get(`http://localhost:3000/product/${id}`)
        .then((response) => handleGetProductResponse(response))
        .catch((error) => handleError(error));
    },
    [id]
  );

  return id === 0 ? (
    <div className={styles.products}>
      {props.products.map((product, index) =>
        <div className={styles.productIcon} key={index}>
          <div onClick={() => setId(product.product_id)}>
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
  ) : (
    <div className={styles.product}>
      <FontAwesomeIcon icon={faArrowLeft} onClick={() => setId(0)}/>
      <h1>{product.product_name}</h1>
      <p>{product.description}</p>

      {product.quantity > 0 ?
        <p>In stoc</p> :
        <p>Indisponibil</p>
      }

      <h3>Opinia clientilor</h3>
      <div className={styles.rating}>{rating}</div>
      <p>{product.comments}</p>

      <p>{product.price}</p>

      <div className={styles.action}>
        <div>Edit</div>
        <div onClick={deleteProductEvent}>Delete</div>
        <div>Add to list</div>
      </div>
    </div>
  );
}

export default Main;