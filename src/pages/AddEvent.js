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

  class AddEvent extends React.Component  {
    checkAuth (){
      if(!sessionStorage.jwtToken){
        window.location.href = "http://localhost:3000/login";
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
      activityPoints : '',
      activityMode : ''
    }
  }
  componentDidMount(){
    axios.get('http://localhost/activity')
    .then((res)=>{
      this.setState({
        user : res.data,
        id : 0,
        activityName : '',
        activityDate : '',
        activityPoints : '',
        activityMode : ''
      })
    })
  }
  activityNameChnage = event => {
    this.setState({
      activityName : event.target.value
    })
  }
  activityDateChnage = event => {
    this.setState({
      activityDate : event.target.value
    })
  }
  activityPointChnage = event => {
    this.setState({
      activityPoints : event.target.value
    })
  }
  activityModeChnage = event => {
    this.setState({
      activityMode : event.target.value
    })
  }
  submit(event,id){
    event.preventDefault()
    if( id === 0 ){
      axios.post('http://localhost/activity',{
        activityName : this.state.activityName,
        activityDate : this.state.activityDate,
        activityPoints : this.state.activityPoints,
        activityMode : this.state.activityMode
      })
      .then(()=> {
        this.componentDidMount()
      })
    }else{
      axios.put(`http://localhost/activity/${id}`,{
        activityName : this.state.activityName,
        activityDate : this.state.activityDate,
        activityPoints : this.state.activityPoints,
        activityMode : this.state.activityMode
      })
      .then(()=> {
        this.componentDidMount()
      })
    }
  }
  delete(id){
    axios.delete(`http://localhost/activity/${id}`)
    .then(()=>{
      this.componentDidMount()
    })
  }
  edit(id){
    axios.get(`http://localhost/activity/${id}`)
    .then((res)=>{
      this.setState({
        id : res.data._id,
        activityName : res.data.activityName,
        activityDate : new Date(res.data.activityDate),
        activityPoints : res.data.activityPoints,
        activityMode : res.data.activityMode
      })
    })
  }
  render() {
    return (
      <Page title="Event" breadcrumbs={[{ name: 'event', active: true }]}>
          <Row>
            <Col md="8" sm="12" xs="12">
              <Card>
                <CardHeader>Activity List</CardHeader>
                <CardBody>
                  <Table responsive bordered>
                    <thead>
                      <tr>
                        <th>Activity Name</th>
                        <th>Date</th>
                        <th>Points</th>
                        <th>Mode</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.activity.map(activity =>
                      <tr key = {activity._id}>
                        <td>{activity.activityName}</td>
                        <td>{(new Date(activity.activityDate)).toDateString()}</td>
                        <td>{activity.activityPoints}</td>
                        <td>{activity.activityMode}</td>
                        <td>
                          <MdCreate title= 'Edit' onClick = {(e)=>this.edit(activity._id)} />&nbsp;&nbsp;
                          <MdDelete title= 'Delete' onClick = {(e)=>this.delete(activity._id)} />
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
              <CardHeader>Create Activity</CardHeader>
              <CardBody>
                <Form onSubmit = {(e) => this.submit(e,this.state.id)}>
                  <FormGroup>
                    <Label>Activity Name</Label>
                    <Input
                      onChange = {(e)=>this.activityNameChnage(e)}
                      type="text"
                      name="event"
                      value = {this.state.activityName}
                      placeholder="Enter Activity Name"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Date</Label>
                    <Input
                      onChange = {(e)=>this.activityDateChnage(e)}
                      type="date"
                      name="eventDate"
                      value = {this.state.activityDate}
                      placeholder=""
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Points</Label>
                    <Input
                      onChange = {(e)=>this.activityPointChnage(e)}
                      type="text"
                      name="eventPoints"
                      value = {this.state.activityPoints}
                      placeholder="Enter Activity Points"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Activity Mode</Label>
                    <Input
                      onChange = {(e)=>this.activityModeChnage(e)}
                      type="select"
                      value = {this.state.activityMode}
                      name="select">
                      <option>Select</option>
                      <option>Individual</option>
                      <option>Couple</option>
                      <option>Group</option>
                    </Input>
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
