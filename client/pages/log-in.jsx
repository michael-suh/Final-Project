import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('api/auth/log-in', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(resBody => {
        this.setState({
          email: '',
          password: ''
        });
        window.localStorage.setItem('unload-jwt', resBody.token);
        alert('Start unloading!');
        window.location.hash = '#';
      })
      .catch(err => {
        console.error('Error ', err);
      });
  }

  render() {
    const { handleChange, handleSubmit } = this;
    return (
      <div className="container">
        <div className="color-overlay d-flex justify-content-center align-items-center">
          <Form className="rounded p-4 p-sm-3" onSubmit={handleSubmit}>
            <hr />
            <h4 className="text-center font-weight-bold">
              Welcome Back!
            </h4>
            <hr />
            <Form.Group className="mb-3" controlId="FormEmail">
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" size="sm" type="submit" className="log-in-button btn-block">Log In</Button>
          </Form>
        </div>
      </div>
    );
  }
}
