import React from 'react';
import {Menu} from 'antd';

import styles from './DirectoryColorSelect.css';

function DirectoryColorSelect({onClick, defaultKey}) {

  const MenuItem = Menu.Item;
  const array = Array(20).fill().map((_, i) => i);

  return (
    <Menu
      className={styles.menu}
      onClick={onClick}
      mode="horizontal"
      defaultSelectedKeys={[defaultKey+'']}
    >
      {array.map((index) =>
        <MenuItem key={index+1}
                  className={"dot-" + (index+1)}>
        </MenuItem>
      )}
    </Menu>
  )
}

export default DirectoryColorSelect;
