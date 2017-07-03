import React, {Component} from 'react';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';
import {Dropdown} from 'antd';

import DirectoryMenu from './DirectoryMenu';

import styles from './DirectoryItem.css';

class DirectoryItem extends Component {

  state = {
    visible: false,
  };

  handleVisibleChange = (flag) => {
    this.setState({visible: flag});
  };

  handleMenuClick = (e) => {
      this.setState({visible: false});

  };

  render() {
    const {item, active = false, onClick, onClickRemove} = this.props;

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

        <Dropdown
          overlayClassName={styles.dropdown}
          overlay={<DirectoryMenu
            onClick={this.handleMenuClick}
            onClickRemove={onClickRemove}/>
          }
          trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          visible={this.state.visible}
        >
          <button
            className={styles.menu_button}
            onClick={(e) => {
              this.handleVisibleChange(true);
              e.stopPropagation();
            }}
          >
            <span className="iconfont icon-more"/>
          </button>
        </Dropdown>

      </div>
    );
  }
}
// function DirectoryItem({item, active = false, onClick, onClickRemove}) {
//
//   const DragHandle = SortableHandle(() =>
//     <span className={styles.handle}>
//                 <i className={`${styles.icon} iconfont icon-move`}/>
//             </span>
//   );
//
//   return (
//     <div className={active ? styles.item + ' ' + styles.item_active : styles.item}
//          onClick={onClick}
//     >
//       <div className={styles.handle_wrapper}>
//         <DragHandle />
//       </div>
//       <div className={styles.dot_wrapper}>
//         <div className={styles.dot}/>
//       </div>
//       <p className={styles.name}>{item.name}</p>
//       <div className={styles.quantity}>
//         {item.count}
//       </div>
//
//       <Dropdown
//         overlayClassName={styles.dropdown}
//         overlay={<DirectoryMenu onClickRemove={onClickRemove}/>}
//         trigger={['click']}
//         onVisibleChange={this.handleVisibleChange}
//         visible={this.state.visible}
//       >
//         <button
//           className={styles.menu_button}
//           onClick={(e) => {
//             e.stopPropagation();
//           }}
//         >
//           <span className="iconfont icon-more"/>
//         </button>
//       </Dropdown>
//
//     </div>
//   );
// }

export default SortableElement(DirectoryItem);
