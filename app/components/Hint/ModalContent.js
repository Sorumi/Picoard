import React, {Component} from 'react';

import {MAX_FILE_LENGTH} from '../../constants';

import styles from './HintModal.css';

class ModalContent extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.update;
  }

  render() {
    const {files, text} = this.props;
    return (
      <div>
        {files.slice(0, 10).map(file =>
          <p key={file}
             className={styles.file}
          >{`'${file}'`}</p>
        )}
        {files.length > MAX_FILE_LENGTH ? <p key="more" className={styles.file}>……</p> : null}
        <p key="text" className={styles.text}>{text}</p>
      </div>
    )
  }
}

export default ModalContent;
