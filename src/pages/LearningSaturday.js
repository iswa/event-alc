import Page from 'components/Page';
import React from 'react';
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

const LearningSaturday = () => {
  return (
    <Page title="Learning Saturday" breadcrumbs={[{ name: 'Learning Sat', active: true }]}>
      <Row>
        <Col md="8" sm="12" xs="12">
          <Card>
            <CardHeader>Learning Saturday Activity List</CardHeader>
            <CardBody>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Week</th>
                    <th>Activity</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
        <Col xl={4} lg={12} md={12}>
        <Card>
          <CardHeader>Create Learning Sat. Activity</CardHeader>
          <CardBody>
            <Form>
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
                <Label>Activity Name</Label>
                <Input
                  type="text"
                  name="event"
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
};

export default LearningSaturday;
