import React from 'react';
import electron, {remote, shell} from 'electron';

import logo from '../../assets/img/logo_large.png';

import styles from './About.css';

const appVersion = remote.app.getVersion();


function About() {

  return (
    <div className={styles.about}>
      <header>
        <img draggable={false}
             src={logo}
             onClick={() => {
               shell.openExternal("http://picoard.sorumi.me")
             }}/>
      </header>
      <div className={styles.main}>

        <h3 onClick={() => {
          shell.openExternal("http://picoard.sorumi.me")
        }}>
          PICOARD
        </h3>
        <h4>
          v {appVersion}
        </h4>

        <p className={styles.content}>
          An app to collect your images, photos, screenshots.
          You can organize your inspiration and ideas in an elegant way.
        </p>
        <footer>
          Crafted with ❤ by
          <span onClick={() => {
            shell.openExternal("http://sorumi.me")
          }}>
            Sorumi
          </span>
        </footer>
      </div>
    </div>
  );
}

export default About;
