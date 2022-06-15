import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';

export default class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: '' };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    window.localStorage.removeItem('unload-jwt');
    this.setState({ user: null });
    window.location.assign('#');
  }

  render() {
    const { handleLogout } = this;
    return (
      <div>
        <Container>
          <hr />
          <Row className="justify-content-center">
            <h4>Thank you for using Unload!</h4>
          </Row>
          <hr />
          <Row className="justify-content-center">
            <Button className=""
              variant="dark"
              size="lg"
              onClick={handleLogout}>
              Log Out
            </Button>
          </Row>
        </Container>
      </div>
    );
  }
}
