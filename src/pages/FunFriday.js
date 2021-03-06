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

  class FunFriday extends React.Component  {
    // checkAuth (){
    //   if(!sessionStorage.jwtToken){
    //     window.location.href = "https://event-alc.herokuapp.com/login";
    //   }
    // }
  constructor(props){
    super(props);
    // this.checkAuth()
    this.state = {
      getData : 'Create',
      userMaster: [],
      fun_fridays : [],
      id : 0,
      funActivityName : '',
      funActivityDate : '',
      funWinner : ''
    }
  }
  componentDidMount(){
    axios.get('https://alc-backend.herokuapp.com/userMaster')
      .then((res)=>{
        this.setState({
          userMaster : res.data
        })
      })
    axios.get('https://alc-backend.herokuapp.com/funFriday')
    .then((res)=>{
      this.setState({
        fun_fridays : res.data,
        id : 0,
        funActivityName : '',
        funActivityDate : '',
        funWinner : ''
      })
    })
  }
  funActivityNameChange = event => {
    this.setState({
      funActivityName : event.target.value
    })
  }
  funActivityDateChange = event => {
    this.setState({
      funActivityDate : event.target.value
    })
  }
  funWinnerChange = event => {
    this.setState({
      funWinner : event.target.value
    })
  }
  submit(event,id){
    event.preventDefault()
    if( id === 0 ){
      axios.post('https://alc-backend.herokuapp.com/funFriday',{
        funActivityName : this.state.funActivityName,
        funActivityDate : this.state.funActivityDate,
        funWinner : this.state.funWinner,
      })
      .then(()=> {
        this.componentDidMount()
      })
    }else{
      axios.put(`https://alc-backend.herokuapp.com/funFriday/${id}`,{
        funActivityName : this.state.funActivityName,
        funActivityDate : this.state.funActivityDate,
        funWinner : this.state.funWinner
      })
      .then(()=> {
        this.componentDidMount()
      })
    }
  }
  delete(id){
    axios.delete(`https://alc-backend.herokuapp.com/funFriday/${id}`)
    .then(()=>{
      this.componentDidMount()
    })
  }
  edit(id){
    axios.get(`https://alc-backend.herokuapp.com/funFriday/${id}`)
    .then((res)=>{
      this.setState({
        getData : 'Update',
        id : res.data._id,
        funActivityName : res.data.funActivityName,
        funActivityDate : res.data.funActivityDate,
        funWinner : res.data.funWinner
      })
    })
  }
  render() {
  return (
    <Page title="Fun Friday" breadcrumbs={[{ name: 'Fun Friday', active: true }]}>
      <Row>
        <Col md="8" sm="12" xs="12">
          <Card>
            <CardHeader>Fun Friday List</CardHeader>
            <CardBody>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>Activity Name</th>
                    <th>Date</th>
                    <th>Winner</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.fun_fridays.map(fun_fridays =>
                  <tr key = {fun_fridays._id}>
                    <td>{fun_fridays.funActivityName}</td>
                    <td>{(new Date(fun_fridays.funActivityDate)).toDateString()}</td>
                    <td>{fun_fridays.funWinner}</td>
                    <td>
                      <MdCreate title= 'Edit' onClick = {(e)=>this.edit(fun_fridays._id)} />&nbsp;&nbsp;
                      <MdDelete title= 'Delete' onClick = {(e)=>this.delete(fun_fridays._id)} />
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
        <CardHeader>{this.state.getData} Fun Friday Activity</CardHeader>
          <CardBody>
            <Form onSubmit = {(e) => this.submit(e,this.state.id)}>
              <FormGroup>
                <Label>Activity Name</Label>
                <Input
                  onChange = {(e)=>this.funActivityNameChange(e)}
                  type="text"
                  name="event"
                  value = {this.state.funActivityName}
                  placeholder="Enter Activity Name"
                />
              </FormGroup>
              <FormGroup>
                <Label>Date</Label>
                <Input
                  onChange = {(e)=>this.funActivityDateChange(e)}
                  type="date"
                  name="eventDate"
                  value = {this.state.funActivityDate}
                  placeholder=""
                />
              </FormGroup>
              <FormGroup>
                <Label>Winner Name</Label>
                <Input
                  onChange = {(e)=>this.funWinnerChange(e)}
                  type="select"
                  name="eventPoints"
                  value = {this.state.funWinner}
                  placeholder=""
                >
                <option key=''>Select</option>
                {this.state.userMaster.map((user_master) => (
                <option>{user_master.userName}</option>
                ))}
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

export default FunFriday;
