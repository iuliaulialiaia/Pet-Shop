import React from 'react';
import Aside from './Aside';
import Main from './Main';
import styles from './styles/Content.module.scss';

function Content(props) {
  return (
    <div className={styles.content}>
      <Aside/>
      <Main/>
    </div>
  );
}

export default Content;