import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default class DonateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      price: '',
      content: '',
      fileUrl: '',
      userId: null
    };
    this.fileInputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleContent = this.handleContent.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('Thank you for selling!');
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('price', this.state.price);
    formData.append('content', this.state.content);
    formData.append('userId', this.state.userId);
    formData.append('fileUrl', this.fileInputRef.current.files[0]);

    fetch('/api/uploads', {
      method: 'POST',
      headers: { 'x-access-token': window.localStorage.getItem('unload-jwt') },
      body: formData
    })
      .then(response => response.json())
      .then(resBody => {
        this.setState({
          title: resBody.title,
          price: resBody.price,
          content: resBody.content,
          fileUrl: resBody.fileUrl,
          userId: resBody.userId
        });
        this.fileInputRef.current.value = null;
        window.location.hash = '#';
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  handleTitle(event) {
    this.setState({
      title: event.target.value
    });
  }

  handlePrice(event) {
    this.setState({
      price: event.target.value
    });
  }

  handleFile(event) {
    this.setState({
      fileUrl: URL.createObjectURL(event.target.files[0])
    });
  }

  handleContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  render() {
    const placeholder = this.state.fileUrl ? this.state.fileUrl : 'images/placeholder-image.jpg';
    return (
      <div className="container">
        <div className="color-overlay d-flex justify-content-center align-items-center">
          <Form className="rounded p-4 p-sm-3" onSubmit={this.handleSubmit}>
            <h4 className="text-center">Sell Your Item</h4>
            <img src={placeholder} alt="placeholder" className="item-img"></img>
            <Form.Group className="mb-3" controlId="FormTitle">
              <Form.Label>Item Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter Title"
                value={this.state.title}
                onChange={this.handleTitle} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="FormPrice">
              <Form.Label>Item Price</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter Price without $ and . Ex) 9999 = $99.99"
                value={this.state.price}
                onChange={this.handlePrice} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="FormImage">
              <Form.Label>Item Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                ref={this.fileInputRef}
                accept=".png, .jpg, .jpeg, .gif"
                onChange={this.handleFile} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="content"
                as="textarea"
                placeholder="Describe your item"
                style={{ height: '150px' }}
                value={this.state.content}
                onChange={this.handleContent} />
            </Form.Group>
            <Button variant="primary" size="sm" type="submit" className="sell-submit-button">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }

}
