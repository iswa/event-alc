import Page from 'components/Page';
import React from 'react';
import UserProgressTable from 'components/UserProgressTable';
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
  } from 'reactstrap';

const TeamPage = () => {
  return (
    <Page title="Team" breadcrumbs={[{ name: 'team', active: true }]}>
        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Activity List</CardHeader>
              <CardBody>
                <UserProgressTable
                  headers={[
                    'Name',
                    'Team Name',
                    'Action ',
                  ]}
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl={6    } lg={12} md={12}>
          <Card>
            <CardHeader>Create Activity</CardHeader>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label>Activity Name</Label>
                  <Input
                    type="text"
                    name="event"
                    placeholder="Enter Activity Name"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    name="eventDate"
                    placeholder=""
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Points</Label>
                  <Input
                    type="text"
                    name="eventPoints"
                    placeholder="Enter Activity Points"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Activity Mode</Label>
                  <Input type="select" name="select">
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
};

export default TeamPage;
