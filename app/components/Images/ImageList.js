import React, {Component} from 'react';
import sizeOf from 'image-size';
import styles from './ImageList.css';

class ImageList extends Component {

  // function getCol() {
  //   // console.log(width)
  //   if (width > 1000)
  //     return 5;
  //   else if (width > 800)
  //     return 4;
  //   else if (width > 600)
  //     return 3;
  //   else if (width > 400)
  //     return 2;
  //   else
  //     return 1;
  // }
  componentWillMount() {
    const {path, names} = this.props;
    names.map((name) => {
      let file = `${path}/${name}`;
      let dimensions = sizeOf(file);
      console.log(dimensions.width, dimensions.height);

    });
  }

  render() {
    const {path, names} = this.props;
    return (
      <div className={styles.list}
        // style={{columnCount: getCol()}}
      >

        {names.map((name) =>
          <div key={name} className={styles.item}>
            <img src={`file://${path}/${name}`}
                 draggable={false}
              // width={'20%'}
            />
          </div>
        )}
        {/*
         {names.map((name) =>
         <div key={name} className={styles.item}>
         <img  src={`file://${path}/${name}`}
         draggable={false}
         // width={'20%'}
         />
         </div>
         )}
         {names.map((name) =>
         <div key={name} className={styles.item}>
         <img  src={`file://${path}/${name}`}
         draggable={false}
         // width={'20%'}
         />
         </div>
         )}
         */}

      </div>
    );
  }
}

export default ImageList;
