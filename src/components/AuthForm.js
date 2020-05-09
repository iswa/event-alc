import logo6 from 'assets/img/logo/logo_200.png';
import React, {Component} from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import jwt_decode from "jwt-decode";

class AuthForm extends Component {
  isLogin() {
    window.location.href = "http://localhost:3000/";
  }
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: ''
    };
  }
  checkLogin = e => {
    e.preventDefault();
    axios.post(`http://localhost/api/user/login`,{
      email : this.state.email,
      password : this.state.password
    }).then((res) => { 
      const token  = res.data.token;
      sessionStorage.setItem("jwtToken", token);
      console.log(sessionStorage.jwtToken)
      setAuthToken(token);
      const decoded = jwt_decode(token);
      sessionStorage.setItem("userName", decoded.userName );
      sessionStorage.setItem("userEmail", decoded.email );
      sessionStorage.setItem("userType", decoded.type );
      if(res.data.success === true){
        this.isLogin()
      }
    })
    .catch(error => {
      this.setState({
        errors : error.response.data.message
      })
      
    });
  };

  emailChange = event => {
    this.setState({
      email : event.target.value,
      errors : ''
    })
  }
  passwordChange = event => {
    this.setState({
      password : event.target.value,
      errors : ''
    })
  }
  render() {
    const {
      showLogo,
    } = this.props;

    return (
      <Form onSubmit={this.checkLogin}>
        {showLogo && (
          <div className="text-center pb-4">
            <img
              src={logo6}
              className="rounded"
              style={{ width: 100, height: 100, cursor: 'pointer', backgroundColor: '#F2F4F4'  }}
              alt="logo"
              // onClick={onLogoClick}
            />
          </div>
        )}
        <Label style ={{ textAlignLast : 'center' , color : 'red' }}>{this.state.errors}</Label>
        <FormGroup>
          <Label for='Email'>Email</Label>
          <Input  
            value={this.state.email} 
            type = 'email'
            onChange={(e)=>this.emailChange(e)}
            placeholder ='Your Email' />
        </FormGroup>
        <FormGroup>
          <Label for='Password'>Password</Label>
          <Input 
            value={this.state.password}
            type = 'password'
            onChange={(e)=>this.passwordChange(e)}
            placeholder ='Your Password'  />
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          type = 'submit'>
          Login
        </Button>
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';

export const setAuthToken = token => {
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

AuthForm.defaultProps = {
  authState: 'LOGIN',
  showLogo : true
};

export default AuthForm;
