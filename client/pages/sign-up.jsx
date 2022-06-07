import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordVerfiy: '',
      latitude: null,
      longitude: null,
      location: ''
    };
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePasswordVerify = this.handlePasswordVerify.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(position => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`)
        .then(res => res.json())
        .then(currentLocation => {
          for (let i = 0; i < currentLocation.results.length; i++) {
            const result = currentLocation.results[i];
            if (result.types.includes('postal_code')) {
              this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                location: result.formatted_address
              });
            }
          }
        });
    });
  }

  handleUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  handlePasswordVerify(event) {
    this.setState({
      passwordVerfiy: event.target.value
    });
  }

  handleLocation(event) {
    this.setState({
      location: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(resBody => {
        this.setState({
          username: '',
          email: '',
          password: '',
          passwordVerfiy: '',
          location: ''
        });
        alert('Thanks for signing-up!');
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  }

  render() {
    return (
      <div className="container">

        <div className="color-overlay d-flex justify-content-center align-items-center">
          <Form className="rounded p-4 p-sm-3" onSubmit={this.handleSubmit}>
            <hr />
            <h4 className="text-center font-weight-bold">
              Sign-up
            </h4>
            <hr />
            <Form.Group className="mb-3" controlId="FormUsername">
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleUsername} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormEmail">
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleEmail} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePassword} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormPasswordVerify">
              <Form.Control
                type="password"
                name="passwordVerify"
                placeholder="Confirm Password"
                value={this.state.passwordVerfiy}
                onChange={this.handlePasswordVerify} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="FormLocation">
              <Form.Control
                type="text"
                name="location"
                placeholder="Locating..."
                value={this.state.location}
                onChange={this.handleLocation} />
            </Form.Group>
            <Button variant="primary" size="sm" type="submit" className="submit-button">Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}
