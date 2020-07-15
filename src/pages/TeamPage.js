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
    Badge,
  } from 'reactstrap';
  import {
    MdDelete,
  } from 'react-icons/md';

  const teamNames = ['Respect', 'Pride', 'striped', 'Cradibility','Tirupati'];
  const roles = ['Developer', 'Business Analyst', 'Quality Analyst', 'Captain'];

class TeamPage extends React.Component  {
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
        userMaster: [],
        team : [],
        id : 0,
        memberName : '',
        role : '',
        teamName : ''
      }
    }
    componentDidMount(){
      axios.get('https://alc-backend.herokuapp.com/userMaster')
      .then((res)=>{
        this.setState({
          userMaster : res.data
        })
      })
      axios.get('https://alc-backend.herokuapp.com/team')
      .then((res)=>{
        this.setState({
          team : res.data,
          id : 0,
          memberName : '',
          role : '',
          teamName : ''
        })
      })
      
    }
    
    memberNameChange = event => {
      this.setState({
        memberName : event.target.value
      })
    }
    memberRoleChange = event => {
      this.setState({
        role : event.target.value
      })
    }
    memberTeamChange = event => {
      this.setState({
        teamName : event.target.value
      })
    }
    submit(event,id){
      event.preventDefault()
        axios.post('https://alc-backend.herokuapp.com/team',{
          memberName : this.state.memberName,
          role : this.state.role,
          teamName : this.state.teamName
        })
        .then(()=> {
          this.componentDidMount()
        })
    }
    delete(id){
      axios.delete(`https://alc-backend.herokuapp.com/team/${id}`)
      .then(()=>{
        this.componentDidMount()
      })
    }
    render() {
      return (
        <Page title="Team" breadcrumbs={[{ name: 'team', active: true }]}>
            <Row>
              <Col xl={4} lg={12} md={12}>
              <Card>
                <CardHeader>{this.state.getData} Team</CardHeader>
                <CardBody>
                  <Form onSubmit = {(e) => this.submit(e,this.state.id)}>
                    <FormGroup>
                      <Label>Name</Label>
                      <Input
                        onChange = {(e)=>this.memberNameChange(e)}
                        type="select"
                        name="select">
                          <option key=''>Select Name</option>
                          {this.state.userMaster.map((user_master) => (
                          <option key={user_master._id} value = {user_master.userName} >{user_master.userName}</option>
                          ))}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Role</Label>
                      <Input
                        onChange = {(e)=>this.memberRoleChange(e)}
                        type="select"
                        name="eventDate"
                        value = {this.state.role}
                        placeholder="Enter Role"
                      >
                        <option key=''>Select Role</option>
                        {roles.map((role,index) => (
                        <option key = {index} value = {role}>{role}</option>
                        ))}
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Team Name</Label>
                      <Input
                        onChange = {(e)=>this.memberTeamChange(e)}
                        type="select"
                        name="eventPoints"
                        value = {this.state.teamName}
                        placeholder="Enter Team Name"
                      >
                        <option key=''>Select Team</option>
                        {teamNames.map((teamNames,index) => (
                        <option key = {index} value = {teamNames}>{teamNames}</option>
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
            <Col md="8" sm="12" xs="12">
            <Card>
              <CardHeader>Teams</CardHeader>
              <CardBody>
                <Row>
                {teamNames.map((teamName, index) => (
                  <Col key={index} md="6">
                    <Card body>
                      <Table size="sm">
                        <thead>
                          <tr>
                            <th colSpan="3"><Badge color="light" className="mr-1">Team Name :</Badge><Badge color="dark" pill className="mr-1"> {teamName}</Badge></th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.team.map((team,teamNames) =>(
                          <tr key = {teamNames}>
                            <td><Badge color="primary" className="mr-1">{team.memberName}</Badge><Badge color="light" pill className="mr-1">{team.role}</Badge></td>
                            <td><MdDelete title= 'Delete' onClick = {(e)=>this.delete(team._id)}/></td>
                          </tr>
                        ))}
                        </tbody>
                      </Table>
                    </Card>
                  </Col>
                ))}
                </Row>
              </CardBody>
            </Card>  
            </Col>
            </Row>
        </Page>
      );
    }
  };
  
  export default TeamPage;
  
