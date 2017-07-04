import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';

import DirectoryItem from './DirectoryItem';

import styles from './DirectoryList.css';

function DirectoryList({items, onItemClick, onItemClickEdit, onItemChangeEdit, onItemClickRemove, onItemClickSave, onItemClickCancel, currentIndex, editIndex, editItem}) {

  return (
    <div className={styles.list}>
      {items.map((item, index) => (
        <DirectoryItem
          key={index}
          index={index}
          item={item}
          active={index === currentIndex}
          edit={index === editIndex}
          editItem={editItem}
          onClick={() => onItemClick(index)}
          onClickEdit={() => onItemClickEdit(index)}
          onChangeEdit={onItemChangeEdit}
          onClickRemove={() => onItemClickRemove(index)}
          onClickSave={(color, name) => onItemClickSave(index, color, name)}
          onClickCancel={onItemClickCancel}
        />
      ))}
    </div>
  );
}

export default SortableContainer(DirectoryList);
