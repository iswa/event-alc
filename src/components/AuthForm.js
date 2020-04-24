import logo6 from 'assets/img/logo/logo_200.png';
import PropTypes from 'prop-types';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

class AuthForm extends React.Component {
  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    const responseGoogle = (response) => {
      console.log(response);
    }
    const {
      showLogo,
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      onLogoClick,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo6}
              className="rounded"
              style={{ width: 100, height: 100, cursor: 'pointer', backgroundColor: '#F2F4F4'  }}
              alt="logo"
              onClick={onLogoClick}
            />
          </div>
        )}
        <div className="text-center pt-1">
          <h6>
          <GoogleLogin
            clientId="152680586482-tcai8n2a00m3njh791brtdsjvneqe158.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
          </h6>
          <h6>or</h6>
        </div>
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input {...usernameInputProps} />
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>{passwordLabel}</Label>
          <Input {...passwordInputProps} />
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}>
          Login
        </Button>
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';

AuthForm.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'Your Email',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'Your Password',
  },
  onLogoClick: () => {},
};

export default AuthForm;
