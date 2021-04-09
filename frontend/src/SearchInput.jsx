import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import styles from './styles/SearchInput.module.scss';

function SearchInput(props) {
  return (
    <div className={styles.search}>
      <FontAwesomeIcon icon={faSearch}/>
      <input type='search' placeholder='Search'/>
    </div>
  );
}

export default SearchInput;