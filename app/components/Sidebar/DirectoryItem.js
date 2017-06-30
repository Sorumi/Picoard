import React from 'react';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';

import styles from './DirectoryItem.css';

function DirectoryItem({item, active = false, onClick}) {


    const DragHandle = SortableHandle(() =>
        <span className={styles.handle}>
                <i className={`${styles.icon} iconfont icon-move`}/>
            </span>
    );

    return (
        <div className={active ? styles.item + ' ' + styles.item_active : styles.item}
             onClick={onClick}
        >
            <div className={styles.handle_wrapper}>
                <DragHandle />
            </div>
            <div className={styles.dot_wrapper}>
            <div className={styles.dot}/>
            </div>
            <p className={styles.name}>{item.name}</p>
            <div className={styles.quantity}>
                {item.count}
            </div>
        </div>
    );
}

export default SortableElement(DirectoryItem);
