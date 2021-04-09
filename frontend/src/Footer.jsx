import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEnvelope, faPhoneAlt} from '@fortawesome/free-solid-svg-icons';
import {faGithub} from '@fortawesome/free-brands-svg-icons';
import styles from './styles/Footer.module.scss';

function Footer(props) {
  return (
    <div className={styles.footer}>
      <div>
        <p>Iulia-Maria Tomulescu</p>
        <a href='https://github.com/iuliaulialiaia'>
          <FontAwesomeIcon icon={faGithub}/>
          github.com/iuliaulialiaia
        </a>
        <a href='mailto:iulia.maria.tomulescu@gmail.com'>
          <FontAwesomeIcon icon={faEnvelope}/>
          iulia.maria.tomulescu@gmail.com
        </a>
        <p>
          <FontAwesomeIcon icon={faPhoneAlt}/>
          0720 353 591
        </p>
      </div>
    </div>
  );
}

export default Footer;