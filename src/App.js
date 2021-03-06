import { STATE_LOGIN } from 'components/AuthForm';
import GAListener from 'components/GAListener';
import { EmptyLayout, LayoutRoute, MainLayout } from 'components/Layout';
import PageSpinner from 'components/PageSpinner';
import AuthPage from 'pages/AuthPage';
import React from 'react';
import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/reduction.scss';

const EventShow = React.lazy(() => import('pages/AddEvent'));
const ProfilePage = React.lazy(() => import('pages/ProfilePage'));
// const DashboardPage = React.lazy(() => import('pages/DashboardPage'));
const TeamPage = React.lazy(() => import('pages/TeamPage'));
const LearningSaturday = React.lazy(() => import('pages/LearningSaturday'));
const FunFriday = React.lazy(() => import('pages/FunFriday'));
const User = React.lazy(() => import('pages/Users'));
const ChangePassword = React.lazy(() => import('pages/changePassword'));

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

class App extends React.Component {
  render() {
    return (
      <BrowserRouter basename={getBasename()}>
        <GAListener>
          <Switch>
            <LayoutRoute
              exact
              path="/login"
              layout={EmptyLayout}
              component={props => (
                <AuthPage {...props} authState={STATE_LOGIN} />
              )}
            />
            <MainLayout breakpoint={this.props.breakpoint}>
              <React.Suspense fallback={<PageSpinner />}>
                <Route exact path="/" component={ProfilePage} />
                <Route exact path="/event" component={EventShow} />
                {/* <Route exact path="/profile" component={ProfilePage} /> */}
                <Route exact path="/team" component={TeamPage} />
                <Route exact path="/funFriday" component={FunFriday} />
                <Route exact path="/learningSaturday" component={LearningSaturday} />
                <Route exact path="/user" component={User} />
                <Route exact path="/changePassword" component={ChangePassword} />
              </React.Suspense>
            </MainLayout>
            <Redirect to="/" />
          </Switch>
        </GAListener>
      </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: 'xs' };
  }

  if (576 < width && width < 767) {
    return { breakpoint: 'sm' };
  }

  if (768 < width && width < 991) {
    return { breakpoint: 'md' };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: 'lg' };
  }

  if (width > 1200) {
    return { breakpoint: 'xl' };
  }

  return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
