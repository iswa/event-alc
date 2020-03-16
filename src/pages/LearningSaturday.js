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

class LearningSaturday extends React.Component  {
    constructor(props){
      super(props);
      this.state = {
        getData : 'Create',
        learning_saturday : [],
        id : 0,
        learningDate : '',
        learningDay : '',
        learningActivityName : ''
      }
    }
    componentDidMount(){
      axios.get('http://localhost/learningSaturday')
      .then((res)=>{
        this.setState({
          learning_saturday : res.data,
          id : 0,
          learningDate : '',
          learningDay : '',
          learningActivityName : ''
        })
      })
    }
    learningDateChnage = event => {
      this.setState({
        learningDate : event.target.value
      })
    }
    learningDayChnage = event => {
      this.setState({
        learningDay : event.target.value
      })
    }
    learningActivityNameChnage = event => {
      this.setState({
        learningActivityName : event.target.value
      })
    }
    submit(event,id){
      event.preventDefault()
      if( id === 0 ){
        axios.post('http://localhost/learningSaturday',{
          learningDate : this.state.learningDate,
          learningDay : this.state.learningDay,
          learningActivityName : this.state.learningActivityName
        })
        .then(()=> {
          this.componentDidMount()
        })
      }else{
        axios.put(`http://localhost/learningSaturday/${id}`,{
          learningDate : this.state.learningDate,
          learningDay : this.state.learningDay,
          learningActivityName : this.state.learningActivityName
        })
        .then(()=> {
          this.componentDidMount()
        })
      }
    }
    delete(id){
      axios.delete(`http://localhost/learningSaturday/${id}`)
      .then(()=>{
        this.componentDidMount()
      })
    }
    edit(id){
      axios.get(`http://localhost/learningSaturday/${id}`)
      .then((res)=>{
        this.setState({
          getData : 'Update',
          id : res.data._id,
          learningDate : new Date(res.data.learningDate),
          learningDay : res.data.learningDay,
          learningActivityName : res.data.learningActivityName
        })
      })
    }
    render() {
      return (
        <Page title="Learning Saturday" breadcrumbs={[{ name: 'learning sat', active: true }]}>
            <Row>
              <Col md="8" sm="12" xs="12">
                <Card>
                  <CardHeader>Learning Saturday List</CardHeader>
                  <CardBody>
                    <Table responsive bordered>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Week Day</th>
                          <th>Activity Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.learning_saturday.map(learning_saturday =>
                        <tr key = {learning_saturday._id}>
                          <td>{(new Date(learning_saturday.learningDate)).toDateString()}</td>
                          <td>{learning_saturday.learningDay}</td>
                          <td>{learning_saturday.learningActivityName}</td>
                          <td>
                            <MdCreate title= 'Edit' onClick = {(e)=>this.edit(learning_saturday._id)} />&nbsp;&nbsp;
                            <MdDelete title= 'Delete' onClick = {(e)=>this.delete(learning_saturday._id)} />
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
                <CardHeader>{this.state.getData} Learning Saturday</CardHeader>
                <CardBody>
                  <Form onSubmit = {(e) => this.submit(e,this.state.id)}>
                    <FormGroup>
                      <Label>Date</Label>
                      <Input
                        onChange = {(e)=>this.learningDateChnage(e)}
                        type="date"
                        name="event"
                        value = {this.state.learningDate}
                        placeholder=""
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Week</Label>
                      <Input
                        onChange = {(e)=>this.learningDayChnage(e)}
                        type="number"
                        name="eventDate"
                        value = {this.state.learningDay}
                        placeholder="Enter Week No"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Activity Name</Label>
                      <Input
                        onChange = {(e)=>this.learningActivityNameChnage(e)}
                        type="text"
                        name="eventPoints"
                        value = {this.state.learningActivityName}
                        placeholder="Enter Activity Name"
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
  
  export default LearningSaturday;
  
