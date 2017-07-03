import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';

import DirectoryItem from './DirectoryItem';

import styles from './DirectoryList.css';

function DirectoryList({items, onItemClick, onItemClickRemove, currentIndex}) {

    return (
        <div className={styles.list}>
            {items.map((item, index) => (
                <DirectoryItem
                    key={index}
                    index={index}
                    item={item}
                    active={index === currentIndex}
                    onClick={() => onItemClick(index)}
                    onClickRemove={() => onItemClickRemove(index)}
                />
            ))}
        </div>
    );
}

export default SortableContainer(DirectoryList);
