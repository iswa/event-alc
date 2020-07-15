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
    // Table,
  } from 'reactstrap';
//   import {
//     MdCreate,
//     MdDelete,
//   } from 'react-icons/md';

  class AddEvent extends React.Component  {
    checkAuth (){
      if(!sessionStorage.jwtToken){
        window.location.href = "https://event-alc.herokuapp.com/login";
      }
    }
  constructor(props){
    super(props);
    this.checkAuth()
    this.state = {
      activity : [],
      id : 0,
      activityName : '',
      activityDate : '',
      activityPoints : ''
    }
  }
  componentDidMount(){
    axios.get('https://alc-backend.herokuapp.com/activity')
    .then((res)=>{
      this.setState({
        user : res.data,
        id : 0,
        activityName : '',
        activityDate : '',
        activityPoints : ''
      })
    })
  }
  oldPasswordChange = event => {
    this.setState({
      oldPassword : event.target.value
    })
  }
  newPassword = event => {
    this.setState({
      newPassword : event.target.value
    })
  }
  confirmNewPassword = event => {
    this.setState({
      confirmNewPassword : event.target.value
    })
  }
  submit(event,id){
    event.preventDefault()
    if( id === 0 ){
      axios.post('https://alc-backend.herokuapp.com/activity',{
        activityName : this.state.activityName,
        activityDate : this.state.activityDate,
        activityPoints : this.state.activityPoints
      })
      .then(()=> {
        this.componentDidMount()
      })
    }else{
      axios.put(`https://alc-backend.herokuapp.com/activity/${id}`,{
        activityName : this.state.activityName,
        activityDate : this.state.activityDate,
        activityPoints : this.state.activityPoints
      })
      .then(()=> {
        this.componentDidMount()
      })
    }
  }
  delete(id){
    axios.delete(`https://alc-backend.herokuapp.com/activity/${id}`)
    .then(()=>{
      this.componentDidMount()
    })
  }
  edit(id){
    axios.get(`https://alc-backend.herokuapp.com/activity/${id}`)
    .then((res)=>{
      this.setState({
        id : res.data._id,
        activityName : res.data.activityName,
        activityDate : new Date(res.data.activityDate),
        activityPoints : res.data.activityPoints
      })
    })
  }
  render() {
    return (
      <Page title="Change Password" breadcrumbs={[{ name: 'Change Password', active: true }]}>
          <Row>
            <Col xl={3} lg={12} md={12}></Col>
            <Col xl={6} lg={12} md={12}>
            <Card>
              <CardHeader>Change Password</CardHeader>
              <CardBody>
                <Form onSubmit = {(e) => this.submit(e,this.state.id)}>
                  <FormGroup>
                    <Label>Old Password</Label>
                    <Input
                      onChange = {(e)=>this.oldPasswordChange(e)}
                      type="password"
                      name="oldPassword"
                      value = {this.state.oldPassword}
                      placeholder="Enter Old Password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>New Password</Label>
                    <Input
                      onChange = {(e)=>this.newPassword(e)}
                      type="password"
                      name="newPassword"
                      value = {this.state.newPassword}
                      placeholder="Enter New Password"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Confirm Password</Label>
                    <Input
                      onChange = {(e)=>this.confirmNewPassword(e)}
                      type="password"
                      name="confirmPassword"
                      value = {this.state.confirmPassword}
                      placeholder="Confirm New Password"
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

export default AddEvent;
