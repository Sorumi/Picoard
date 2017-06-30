import React from 'react';

import styles from './DirectoryAddButton.css';

function DirectoryAddButton({onClick}) {

    return (
        <button
            onClick={onClick}
            className={styles.add_button}
        >
            <i className="iconfont icon-add"/>
        </button>
    );
}

export default DirectoryAddButton;
