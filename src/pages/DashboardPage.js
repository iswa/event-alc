import Page from 'components/Page';
import { IconWidget, NumberWidget } from 'components/Widget';
import React from 'react';
import {
  MdRateReview,
  MdShare,
  MdThumbUp,
} from 'react-icons/md';
import {
  Card,
  CardBody,
  CardGroup,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';

class DashboardPage extends React.Component {
  checkAuth (){
    if(!sessionStorage.jwtToken){
      window.location.href = "https://event-alc.herokuapp.com/login";
    }
  }
  constructor(props){
    super(props);
    this.checkAuth()
  }
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {

    return (
      <Page
        className="DashboardPage"
        title="Dashboard"
        breadcrumbs={[{ name: 'Dashboard', active: true }]}
      >
        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Total Profit"
              subtitle="This month"
              number="9.8k"
              color="secondary"
              progress={{
                value: 75,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Monthly Visitors"
              subtitle="This month"
              number="5,400"
              color="secondary"
              progress={{
                value: 45,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="New Users"
              subtitle="This month"
              number="3,400"
              color="secondary"
              progress={{
                value: 90,
                label: 'Last month',
              }}
            />
          </Col>

          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Your Profile Progress"
              // subtitle="This month"
              number="38%"
              color="secondary"
              progress={{
                value: 60,
                label: 'Last month',
              }}
            />
          </Col>
        </Row>

        <CardGroup style={{ marginBottom: '1rem' }}>
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdThumbUp}
            title="Respect"
            subtitle="People you like"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdRateReview}
            title="Pride"
            subtitle="New Reviews"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdRateReview}
            title="Pride"
            subtitle="New Reviews"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdShare}
            title="Cambridary"
            subtitle="New Shares"
          />
          <IconWidget
            bgColor="white"
            inverse={false}
            icon={MdRateReview}
            title="Fairness"
            subtitle="New Reviews"
          />
        </CardGroup>
        <Row>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Holidays</CardHeader>
              <CardBody>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" sm="12" xs="12">
            <Card>
              <CardHeader>Learning Saturdays</CardHeader>
              <CardBody>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default DashboardPage;
