import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import styles from './styles/Main.module.scss';

function Main(props) {
  return (
    <div className={styles.main}>
      {props.products.map((product, index) =>
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