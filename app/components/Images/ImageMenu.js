import React from 'react';
import {Menu} from 'antd';

import styles from './ImageMenu.css';

function ImageMenu({visible, width, style, type, onClick, onClickCopy, onClickPaste, onClickDelete, onClickSelectAll}) {

  const MenuItem = Menu.Item;
  const MenuDivider = Menu.Divider;

  return (
    <Menu className={styles.menu}
          visible={visible}
          style={{...style, width: width + 'px'}}
          onClick={onClick}
          selectedKeys={[]}
    >

      <MenuItem key="0">
        <button onClick={(event) => {
          event.stopPropagation();
          onClickCopy ? onClickCopy() : null;
          onClick();
        }}>
          Copy
        </button>
      </MenuItem>


      {type !== 'small' ?
        <MenuItem key="1">
          <button onClick={(event) => {
            event.stopPropagation();
            onClickPaste ? onClickPaste() : null;
            onClick();
          }}>
            Paste
          </button>
        </MenuItem> : null
      }

      <MenuItem key="2">
        <button onClick={(event) => {
          event.stopPropagation();
          onClickDelete ? onClickDelete(): null;
          onClick();
        }}>
          Delete
        </button>
      </MenuItem>

      {type !== 'small' ?
      <MenuItem key="3">
        <button onClick={(event) => {
          event.stopPropagation();
          onClickSelectAll ? onClickSelectAll() : null;
          onClick();
        }}>
          Select All
        </button>
      </MenuItem>: null
      }
    </Menu>
  )
}

export default ImageMenu;
