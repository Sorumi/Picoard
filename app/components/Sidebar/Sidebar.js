import React, {Component} from 'react';
import {connect} from 'react-redux';

import electron from 'electron';

import DirectoryAddButton from './DirectoryAddButton';
import DirectoryList from './DirectoryList';

import styles from './Sidebar.css';


const {dialog} = electron.remote;

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
      // const {directories} = this.props;
        // const items = arrayMove(directories, oldIndex, newIndex);
        this.props.handleSortDirectories(oldIndex, newIndex);
    }


    onClickAddDirectory() {
        const {handleAddDirectory} = this.props;
        dialog.showOpenDialog({
            properties: ['openDirectory']
        }, function (files) {
            if (files) {
                handleAddDirectory(files[0]);
            }
        });
    }

    render() {
        const {directories, currentDirIndex, handleClickDirectory} = this.props;
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
                        currentIndex={currentDirIndex}
                    /> : null }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {directories, currentDirIndex} = state.directories;
    return {
        directories,
        currentDirIndex
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
        handleClickDirectory: (index) => {

            dispatch({
                type: 'directories/activeDirectory',
                payload: index
            })
        }

    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
