import React from 'react';
import {Menu} from 'antd';

import styles from './DirectoryMenu.css';

function DirectoryMenu({onClick, onClickEdit, onClickRemove}) {

  const MenuItem = Menu.Item;
  const MenuDivider = Menu.Divider;

  function onEditClick(event) {
    // event.stopPropagation();
    onClickEdit();
  }

  function onRemoveClick(event) {
    // event.stopPropagation();
    onClickRemove();
  }

  return (
    <Menu className={styles.menu}
          onClick={onClick}
          selectedKeys={[]}>
      <MenuItem key="0">
        <button onClick={onEditClick}>
          Edit Directory
        </button>
      </MenuItem>

      <MenuItem key="1">
        2nd menu item
      </MenuItem>

      <MenuDivider />

      <MenuItem key="3">
        <button onClick={onRemoveClick}>
          Remove Directory
        </button>
      </MenuItem>
    </Menu>
  )
}

export default DirectoryMenu;
