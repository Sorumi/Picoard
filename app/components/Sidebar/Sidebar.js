import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux'

import electron from 'electron';

import DirectoryAddButton from './DirectoryAddButton';
import DirectoryList from './DirectoryList';

import styles from './Sidebar.css';


const {dialog} = electron.remote;
const {shell} = electron;

class Sidebar extends Component {

  constructor() {
    super();
    this.onClickAddDirectory = this.onClickAddDirectory.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  componentWillMount() {
    this.props.handleLoadingDirectories();
    this.props.handleClickDirectory(0);
  }

  onSortEnd({oldIndex, newIndex}) {
    this.props.handleSortDirectories(oldIndex, newIndex);
  }


  onClickAddDirectory() {
    const {handleAddDirectory} = this.props;
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, function (files) {
      if (files && files.length > 0) {
        handleAddDirectory(files[0]);
      }
    });
  }

  onOpenDirectory(path) {
    shell.showItemInFolder(path)
  }

  render() {
    const {
      directories, currentDirIndex, editDirIndex,editItem,
      handleClickDirectory, handleEditDirectory, handleChangeEditDirectory, handleRemoveDirectory, handleSaveDirectory, handleCancelDirectory
    } = this.props;
    return (

      <div className={styles.sidebar}>
        <div className={styles.part}>
          <div className={styles.title}>
            <h5>Directory</h5>
            <div className={styles.title_right}>
              <DirectoryAddButton onClick={this.onClickAddDirectory}/>
            </div>
          </div>

          {directories ?
            <DirectoryList
              items={directories}
              lockAxis="y"
              onSortEnd={this.onSortEnd}
              useDragHandle={true}
              helperClass="directory_item_drag"
              onItemClick={handleClickDirectory}
              onItemClickOpen={this.onOpenDirectory}
              onItemClickEdit={handleEditDirectory}
              onItemChangeEdit={handleChangeEditDirectory}
              onItemClickRemove={handleRemoveDirectory}
              onItemClickSave={handleSaveDirectory}
              onItemClickCancel={handleCancelDirectory}
              currentIndex={currentDirIndex}
              editIndex={editDirIndex}
              editItem={editItem}
            /> : null }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {directories, currentDirIndex, editDirIndex, editItem} = state.directories;
  return {
    directories,
    currentDirIndex,
    editDirIndex,
    editItem
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleSortDirectories: (oldIndex, newIndex) => {
      dispatch({
        type: 'directories/sortDirectories',
        payload: {
          oldIndex,
          newIndex
        },
      });
    },
    handleLoadingDirectories: () => {
      dispatch({
        type: 'directories/loadDirectories',
        payload: {}
      });
    },
    handleAddDirectory: (file) => {
      dispatch({
        type: 'directories/addDirectory',
        payload: file
      });
    },
    handleChangeEditDirectory:(editItem) => {
      dispatch({
        type: 'directories/saveEditItem',
        payload: editItem
      });
    },

    handleEditDirectory: (index) => {
      dispatch({
        type: 'directories/editDirectory',
        payload: index
      });
    },
    handleRemoveDirectory: (index) => {
      dispatch({
        type: 'directories/removeDirectory',
        payload: index
      });
    },
    handleClickDirectory: (index) => {
      dispatch(push('/images'));
      dispatch({
        type: 'directories/activeDirectory',
        payload: index
      })
    },
    handleSaveDirectory: () => {
      dispatch({
        type: 'directories/saveDirectory',
        payload: {}
      });
    },
    handleCancelDirectory: () => {
      dispatch({
        type: 'directories/saveEditDirIndex',
        payload: null
      });
    }

  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
