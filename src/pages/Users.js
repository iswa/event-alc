import Page from 'components/Page';
import React from 'react';
import axios from 'axios';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
    Table,
  } from 'reactstrap';
  import {
    MdCreate,
    MdDelete,
  } from 'react-icons/md';

class Users extends React.Component  {
    checkAuth (){
      if(!sessionStorage.jwtToken){
        window.location.href = "https://event-alc.herokuapp.com/login";
      }
    }
    constructor(props){
      super(props);
      this.checkAuth()
      this.state = {
        getData : 'Create',
        userMaster : [],
        id : 0,
        userName : '',
        email : '',
        contactNo : '',
        password : '',
        type : ''
      }
    }
    componentDidMount(){
      axios.get('https://alc-backend.herokuapp.com/userMaster')
      .then((res)=>{
        this.setState({
          userMaster : res.data,
          id : 0,
          userName : '',
          email : '',
          contactNo : '',
          type : '',
          password : ''
        })
      })
    }
    userNameChnage = event => {
      this.setState({
        userName : event.target.value
      })
    }
    emailChnage = event => {
      this.setState({
        email : event.target.value
      })
    }
    contactNoChnage = event => {
      this.setState({
        contactNo : event.target.value
      })
    }
    passwordChnage = event => {
      this.setState({
        password : event.target.value
      })
    }
    typeChnage= event => {
      this.setState({
        type : event.target.value
      })
    }
    submit(event,id){
      event.preventDefault()
      if( id === 0 ){
        axios.post('https://alc-backend.herokuapp.com/userMaster',{
            userName : this.state.userName,
            email : this.state.email,
            contactNo : this.state.contactNo,
            password : this.state.password,
            type : this.state.type
        })
        .then(()=> {
          this.componentDidMount()
        })
      }else{
        axios.put(`https://alc-backend.herokuapp.com/userMaster/${id}`,{
            userName : this.state.userName,
            email : this.state.email,
            contactNo : this.state.contactNo,
            password : this.state.password,
            type : this.state.type
        })
        .then(()=> {
          this.componentDidMount()
        })
      }
    }
    delete(id){
      axios.delete(`https://alc-backend.herokuapp.com/userMaster/${id}`)
      .then(()=>{
        this.componentDidMount()
      })
    }
    edit(id){
      axios.get(`https://alc-backend.herokuapp.com/userMaster/${id}`)
      .then((res)=>{
        this.setState({
          getData : 'Update',
          id : res.data._id,
          userName : res.data.userName,
          email : res.data.email,
          contactNo : res.data.contactNo,
          password : res.data.password,
          type : res.data.type
        })
      })
    }
    render() {
      return (
        <Page title="User Master" breadcrumbs={[{ name: 'User', active: true }]}>
            <Row>
              <Col md="8" sm="12" xs="12">
                <Card>
                  <CardHeader>Users List</CardHeader>
                  <CardBody>
                    <Table dark bordered>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Contact No</th>
                          <th>Type</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.userMaster.map(userMaster =>
                        <tr key = {userMaster._id}>
                          <td>{userMaster.userName}</td>
                          <td>{userMaster.email.toLowerCase()}</td>
                          <td>{userMaster.contactNo}</td>
                          <td>{userMaster.type}</td>
                          <td>
                            <MdCreate title= 'Edit' onClick = {(e)=>this.edit(userMaster._id)} />&nbsp;&nbsp;
                            <MdDelete title= 'Delete' onClick = {(e)=>this.delete(userMaster._id)} />
                          </td>
                        </tr>
                        )}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
              <Col xl={4} lg={12} md={12}>
              <Card>
                <CardHeader>{this.state.getData} User</CardHeader>
                <CardBody>
                  <Form onSubmit = {(e) => this.submit(e,this.state.id)}>
                    <FormGroup>
                      <Label> Name </Label>
                      <Input
                        onChange = {(e)=>this.userNameChnage(e)}
                        type="text"
                        name="event"
                        value = {this.state.userName}
                        placeholder="Enter Full Name"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Email Address</Label>
                      <Input
                        onChange = {(e)=>this.emailChnage(e)}
                        type="email"
                        name="eventDate"
                        value = {this.state.email}
                        placeholder="Enter Email Address"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Contact No</Label>
                      <Input
                        onChange = {(e)=>this.contactNoChnage(e)}
                        type="number"
                        name="eventPoints"
                        value = {this.state.contactNo}
                        placeholder="Enter Contact No."
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Account Type</Label>
                      <Input
                        onChange = {(e)=>this.typeChnage(e)}
                        type="select"
                        value = {this.state.type}
                        name="select">
                        <option>Select</option>
                        <option>Normal</option>
                        <option>Admin</option>
                        <option>Super Admin</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Password</Label>
                      <Input
                        onChange = {(e)=>this.passwordChnage(e)}
                        type="password"
                        value = {this.state.password}
                        placeholder="Enter Password"
                      />
                    </FormGroup>
                    <FormGroup check row>
                      <Col sm={{ size: 10, offset: 2 }}>
                        <Button>Submit</Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            </Row>
        </Page>
      );
    }
  };
  
  export default Users;
  
