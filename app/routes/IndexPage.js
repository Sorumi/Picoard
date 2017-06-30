import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ipcRenderer} from 'electron';

import MainLayout from '../components/MainLayout/MainLayout';
import SideLayout from '../components/MainLayout/SideLayout';
import ContentLayout from '../components/MainLayout/ContentLayout';
import Sidebar from '../components/Sidebar/Sidebar';
import ImagesTop from '../components/Images/ImagesTop';
import ImageList from '../components/Images/ImageList';

class App extends Component {

    componentWillMount() {
        ipcRenderer.on('window-resize', (evt, data) => {
            const size = {
                width: parseInt(data[0]),
                height: parseInt(data[1]),
            };
            // console.log(size);
            this.props.handleChangeWindowSize(size)
        });
    }

    componentDidMount() {

    }

    render() {
        // const {images} = this.props;
        return (
            <div>
                <MainLayout>
                    <SideLayout
                         sidebar={<Sidebar/>}
                    >
                        <ContentLayout
                             top={<ImagesTop/>}
                        >
                            {/*{images ?*/}
                                {/*<ImageList*/}
                                    {/*// width={size.width - sidebarWidth - offsetX}*/}
                                    {/*path={images.path}*/}
                                    {/*names={images.images}*/}
                                {/*/> : null }*/}
                        </ContentLayout>
                    </SideLayout>
                </MainLayout>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const images = state.images;
    return {
        images
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        handleChangeWindowSize: (size) => {
            dispatch({
                type: 'window/changeWindow',
                payload: size,
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

