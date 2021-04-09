import React from 'react';
import styles from './styles/Header.module.scss';

function Header(props) {
  return (
    <header className={styles.header}>
      <div>
        <h1>PetShop</h1>
        <h2>Din Dragoste Pentru Animale</h2>
      </div>
    </header>
  );
}

export default Header;