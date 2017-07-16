import React from 'react';

import styles from './HintModal.css';

function ExistWarningModalContent({files}) {

  return (
    <div>
      {files.map(file =>
        <p key={file}
           className={styles.file}
        >{`'${file}'`}</p>
      )}
      {files.length > 1 ?
        <p className={styles.text}>Images Already Existed</p> :
        <p className={styles.text}>Image Already Existed</p>
      }
    </div>
  )
}

export default ExistWarningModalContent;
