import React from 'react';

import styles from './HintModal.css';

function ModalContent({files, text}) {

  return (
    <div>
      {files.map(file =>
        <p key={file}
           className={styles.file}
        >{`'${file}'`}</p>
      )}
      <p className={styles.text}>{text}</p>
    </div>
  )
}

export default ModalContent;
