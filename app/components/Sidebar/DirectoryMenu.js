import React from 'react';
import {Menu} from 'antd';

import styles from './DirectoryMenu.css';

function DirectoryMenu({onClick, onClickOpen, onClickEdit, onClickRemove}) {

  const MenuItem = Menu.Item;
  const MenuDivider = Menu.Divider;

  return (
    <Menu className={styles.menu}
          onClick={onClick}
          selectedKeys={[]}>
      <MenuItem key="0">
        <button onClick={onClickOpen}>
          Reveal in Finder
        </button>
      </MenuItem>

      <MenuItem key="1">
        <button onClick={onClickEdit}>
          Edit Directory
        </button>
      </MenuItem>
      <MenuDivider />

      <MenuItem key="3">
        <button onClick={onClickRemove}>
          Remove Directory
        </button>
      </MenuItem>
    </Menu>
  )
}

export default DirectoryMenu;
