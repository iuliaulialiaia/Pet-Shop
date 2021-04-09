import React from 'react';
import styles from './styles/Aside.module.scss';

function Aside(props) {
  return (
    <aside className={styles.aside}>
      <h4>sort by</h4>
      <p onClick={props.sortByNameEvent}>name</p>
      <p onClick={props.sortByPriceEvent}>price</p>

      <h4>add</h4>
      <p>product</p>
      <p>list</p>
    </aside>
  );
}

export default Aside;