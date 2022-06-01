import React from 'react';
import { toDollars } from '../lib';

const styles = {
  product: {
    display: 'block',
    cursor: 'pointer'
  },
  image: {
    height: '300px',
    objectFit: 'contain'
  },
  description: {
    height: '4.5rem',
    overflow: 'hidden'
  }
};

export default class Catalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    fetch('/api/items')
      .then(res => res.json())
      .then(items => this.setState({ items }));
  }

  render() {
    return (
      <div className="container">
        <hr />
        <h1>Sell Used Item</h1>
        <hr />
        <div className="row">
          {
            this.state.items.map(item => (
              <div key={item.itemId} className="col-xs-12 col-sm-6 col-md-3">
                <Item item={item} />
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

function Item(props) {
  // eslint-disable-next-line no-unused-vars
  const { itemId, title, price, fileUrl, userId, content, uploadedAt } = props.item;

  return (
    <a
      href={`#products?productId=${itemId}`}
      style={styles.product}
      className="text-dark card mb-4 shadow-sm text-decoration-none">
      <img src={fileUrl} className="card-img-top" alt={title} style={styles.image} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-secondary">{toDollars(price)}</p>
        <p className="card-text" style={styles.description}>{content}</p>
      </div>
    </a>
  );
}
