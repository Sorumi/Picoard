import React, {Component} from 'react';
import {SortableElement, SortableHandle} from 'react-sortable-hoc';
import {Dropdown, Input, Button} from 'antd';

import DirectoryMenu from './DirectoryMenu';
import DirectoryColorSelect from './DirectoryColorSelect'

import styles from './DirectoryItem.css';

class DirectoryItem extends Component {

  constructor(props) {
    super();
    this.state = {
      menuVisible: false,
      colorSelectVisible: false,
    };

  }


  handleMenuVisibleChange = (flag) => {
    this.setState({menuVisible: flag});
  };

  handleMenuClick = (e) => {
    this.setState({menuVisible: false});

  };

  handleColorSelectClick = (e) => {
    this.setState({colorSelectVisible: false});
    this.props.onChangeEdit({color: e.key})
  };

  handleColorSelectVisibleChange = (flag) => {
    this.setState({colorSelectVisible: flag});
  };
  handleInputChange = (e) => {
    this.props.onChangeEdit({name: e.target.value})
  };

  handleClickSave = (e) => {
    e.stopPropagation();
    this.props.onClickSave();
  };

  handleClickCancel = (e) => {
    e.stopPropagation();
    this.props.onClickCancel();
  };

  render() {
    const {
      item, active = false, edit = false, editItem,
      onClick, onClickOpen, onClickEdit, onClickRemove
    } = this.props;
    const {color, name} = editItem

    const DragHandle = SortableHandle(() =>
      <span className={styles.handle}>
                <i className={`${styles.icon} iconfont icon-move`}/>
            </span>
    );

    let className = styles.item;
    className = active ? className + ' ' + styles.item_active : className;
    className = edit ? className + ' ' + styles.item_edit : className;
    return (
      <div className={className}
           onClick={onClick}
      >
        <div className={styles.handle_wrapper}>
          <DragHandle />
        </div>

        {edit ?
          <div className={styles.right_wrapper + ' ' + styles.edit}>
            <div className={styles.input_wrapper}>
              <Input
                className={styles.input}
                size="large"
                value={name}
                onChange={this.handleInputChange}
                onClick={(e) => e.stopPropagation()}/>
            </div>
            <Dropdown
              overlayClassName={styles.dropdown}
              overlay={<DirectoryColorSelect
                onClick={this.handleColorSelectClick}
                defaultKey={item.color}
              />}
              trigger={['click']}
              onVisibleChange={this.handleColorSelectVisibleChange}
              visible={this.state.colorSelectVisible}
            >
              <div className={styles.dot_wrapper}>
                <div className={styles.dot + " dot-" + color}
                     onClick={(e) => {
                       this.handleColorSelectVisibleChange(true);
                       e.stopPropagation();
                     }}/>
              </div>
            </Dropdown>
            <div className={styles.button_wrapper}>
              <button
                className={styles.save_button + " button-" + color + " primary"}
                onClick={this.handleClickSave}
              >save
              </button>
              <button
                className={styles.cancel_button + " button-" + color}
                onClick={this.handleClickCancel}
              >cancel
              </button>
            </div>
          </div>
          :
          <div className={styles.right_wrapper + ' ' + styles.normal}>
            <div className={styles.dot_wrapper}>
              <div className={styles.dot + " dot-" + item.color}/>
            </div>
            <p className={styles.name}>{item.name}</p>
            <div className={styles.quantity}>
              {item.count}
            </div>

            <Dropdown
              overlayClassName={styles.dropdown}
              overlay={<DirectoryMenu
                onClick={this.handleMenuClick}
                onClickOpen={onClickOpen}
                onClickEdit={onClickEdit}
                onClickRemove={onClickRemove}/>
              }
              trigger={['click']}
              onVisibleChange={this.handleMenuVisibleChange}
              visible={this.state.menuVisible}
            >
              <button
                className={styles.menu_button}
                onClick={(e) => {
                  this.handleMenuVisibleChange(true);
                  e.stopPropagation();
                }}
              >
                <span className="iconfont icon-more"/>
              </button>
            </Dropdown>
          </div>
        }
      </div>
    );
  }
}

export default SortableElement(DirectoryItem);
