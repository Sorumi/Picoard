import React, {Component} from 'react';
import sizeOf from 'image-size';
import styles from './ImageList.css';

class ImageList extends Component {

  constructor() {
    super();
    this.state = {
      column: 3,
    }
  }

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

  }

  render() {

    const {path, names, width} = this.props;
    const {column} = this.state;

    let columnHeight = [];
    let columnImage = [];
    for (let i = 0; i < column; i++) {
      columnHeight.push(0);
      columnImage.push([]);
    }

    const imgWidth = width / column;

    names.map((name) => {

      let file = `${path}/${name}`;

      let dimensions = sizeOf(file);
      let imgHeight = imgWidth / dimensions.width * dimensions.height;
      let index = columnHeight.indexOf(Math.min.apply(Math, columnHeight));
      columnHeight[index] += imgHeight;
      columnImage[index].push(name);
    });

    console.log(columnImage, columnHeight);
    return (
      <div className={styles.list}
           ref="list"
        // style={{columnCount: getCol()}}
      >

        {columnImage.map((images, index) =>
          <div
            key={index}
            className={styles.column+ ' ' + styles.col_3}>
            {images.map(image =>
              <img
                key={image}
                src={`file://${path}/${image}`}
                draggable={false}
              />
            )}
          </div>
        )}
        {/*{names.map((name) =>*/}
        {/*<div key={name} className={styles.item}>*/}
        {/*<img src={`file://${path}/${name}`}*/}
        {/*draggable={false}*/}
        {/*// width={'20%'}*/}
        {/*/>*/}
        {/*</div>*/}
        {/*)}*/}
      </div>
    );
  }
}

export default ImageList;
