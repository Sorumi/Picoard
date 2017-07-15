import React from 'react';

import {Modal, Icon} from 'antd';

import styles from './HintModal.css';

function HintModal({type = 'warning', visible, title, content, onOk, onCancel}) {

  let iconName;
  let iconClassName = styles.icon;
  switch (type) {
    case 'warning':
      iconName = 'exclamation-circle';
      iconClassName = iconClassName + ' ' + styles.warning_icon;
      break;
    case 'confirm':
      iconName = 'question-circle';
      iconClassName = iconClassName + ' ' + styles.confirm_icon;
      break;
  }

  return (
    <Modal
      className={styles.modal}
      visible={visible}
      width={460}
      footer={null}
    >
      <Icon className={iconClassName}
            type={iconName}/>
      <span className={styles.title}>{title}</span>
      <div className={styles.content}>
        {content}
      </div>
      <div className={styles.button_wrapper}>

        {type === 'confirm' ?
          <button
            className={styles.cancel_button}
            onClick={onCancel}
          >Cancel
          </button> : null
        }
        <button
          className={styles.save_button + ' ' + styles.primary}
          onClick={onOk}
        >Ok
        </button>
      </div>
    </Modal>
  )
}

export default HintModal;
