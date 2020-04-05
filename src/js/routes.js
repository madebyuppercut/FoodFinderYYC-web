'use strict';

import React from 'react';
import {
  BrowserRouter,
  Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Cookies from 'universal-cookie';

import App from './containers/app';
import GA from './components/ga';
import SignUp from './scenes/signup';
import Intro from './scenes/intro';
import Terms from './scenes/terms';
import About from './scenes/about';
import Help from './scenes/help'
import Privacy from './scenes/privacy';
import Search from './scenes/search';
import NotFound from './scenes/notfound';

import {
  ROOT_PATH,
  SEARCH_PATH,
  ABOUT_PATH,
  HELP_PATH,
  INTRO_PATH,
  TERMS_PATH,
  SINGUP_PATH,
  PRIVACY_PATH,
} from './route_path'

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideNav: false
    };
  }

  doRedirect() {
    return <Redirect to={SEARCH_PATH} />;
   /* const cookies = new Cookies();
    const today = new Date();

    let hasCookie = cookies.get('skipIntro');

    // When it's July 1, or in non-prod environments, check cookie and either send user to search or intro, otherwise send to sign up
     console.log(ENV.NODE_ENV);
    if ((today.getMonth() >= 6 && today.getFullYear() >= 2017) || ENV.NODE_ENV !== 'production') {
      if (hasCookie) {
        return <Redirect to={SEARCH_PATH}/>;
      } else {
        cookies.set('skipIntro', true);
        return <Redirect to="/intro"/>;
      }
    } else {
      return <Redirect to="/signup"/>;
    }*/
  }

  render() {
    return (
      <BrowserRouter history={Router.history}>
        <App>
          <Route component={GA}/>
          <Switch>
            <Route exact path={ROOT_PATH} render={this.doRedirect} />
            <Route path={SEARCH_PATH} component={Search} />
            <Route path={ABOUT_PATH}component={About} />
            <Route path={HELP_PATH}component={Help} />
            <Route path={INTRO_PATH}component={Intro} />
            <Route path={TERMS_PATH}component={Terms} />
            <Route path={SINGUP_PATH}component={SignUp} />
            <Route path={PRIVACY_PATH}component={Privacy} />
            <Route component={NotFound} />
          </Switch>
        </App>
      </BrowserRouter>
    );
  }
};
