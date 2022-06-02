import React from 'react';
import { toDollars } from '../lib';
import SearchBar from './searchbar';

const styles = {
  item: {
    display: 'flex',
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
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.state = {
      searchText: '',
      filtered: [],
      items: []
    };
  }

  componentDidMount() {
    fetch('/api/items')
      .then(res => res.json())
      .then(items => this.setState({ items }));
  }

  handleSearchChange(searchText) {
    this.setState({ searchText });
  }

  render() {
    const { items, searchText } = this.state;
    const filteredList = items.filter(item => {
      return item.title.toLowerCase().includes(searchText.toLowerCase());
    });

    return (
      <div className="container">
        <hr />
        <h2 className='text-center'>Items for Sale</h2>
        <hr />
        <div className='text-center'>
          <SearchBar onChange={this.handleSearchChange} />
        </div>
        <hr />
        <div>
          <ItemList items ={ filteredList } />
        </div>
      </div>
    );
  }
}

function Item(props) {
  // eslint-disable-next-line no-unused-vars
  const { itemId, title, price, fileUrl, userId, content, uploadedAt } = props.item;

  return (
    <div className="col-md-3 item-column">
      <a
        href={`#items?itemId=${itemId}`}
        style={styles.item}
        className="text-dark card mb-4 shadow-sm text-decoration-none">
        <img src={fileUrl} className="card-img-top" alt={title} style={styles.image} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-secondary">{toDollars(price)}</p>
          <p className="card-text" style={styles.description}>{content}</p>
        </div>
      </a>
    </div>
  );
}

function ItemList(props) {
  return (
    <div className="row">
      {
        props.items.map(item => <Item key={item.itemId} item={item} />)
      }
    </div>
  );
}
