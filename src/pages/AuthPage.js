import AuthForm from 'components/AuthForm';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';

class AuthPage extends React.Component {
  handleLogoClick = () => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
          
        }}>
        <Col md={6} lg={4} >
          <Card body>
            <AuthForm
              authState={this.props.authState}
              onLogoClick={this.handleLogoClick}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default AuthPage;
