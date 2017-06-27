'use strict';

// libs
import React from 'react';
import ReactGA from 'react-ga';
import Parse from 'parse';

// assets
import '../../scss/search.scss';

// components
import Map from '../components/map';

const config = {
  PARSE: PARSE
};

ReactGA.initialize(GOOGLE.GA, {debug: process.env !== 'production'});

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      params: {
        day: 0,
        meals: {
          lunch: true,
          snacks: true,
          dinner: false,
          hamper: false
        },
        noId: false,
        geolocation: null,
        distance: null
      }
    };
  }

  trackEvent(label) {
    ReactGA.event({
      category: 'web',
      action: 'click',
      label: label
    });
  };

  componentDidMount() {
    Parse.initialize(config.PARSE.APP_ID, config.PARSE.JS_KEY);
    Parse.serverURL = config.PARSE.URL;
    //Parse.serverURL = 'http://localhost:8081/parse';

    this.search(this.state.params);
  }

  search(params) {
    let searchParams = {};
    let dateTimeNow = new Date((new Date()).getTime() + (15 * 60 * 1000));             // Set 15min into the future to detect open now
    let date = new Date((new Date()).getTime() + (24 * 60 * 60 * params.day * 1000));  // Set date to corresponding day

    searchParams.date = date.toString();
    searchParams.dateTimeNow = dateTimeNow.toString();
    searchParams.noIdNorReferral = params.noId;
    searchParams.meals = Object.keys(params.meals).filter(key => { return params.meals[key]; });

    if (params.geolocation && params.distance) {
      searchParams.geolocation = params.geolocation;
      searchParams.distance = params.distance;
    }

    Parse.Cloud.run('search', searchParams)
      .then(
        locations => {
          this.setState({locations: locations});
        }
      );
  }

  onChangeDay(e) {
    let state = this.state.params;

    state.day = parseInt(e.target.value);
    this.trackEvent('search-day-' + e.target.value);
    this.setState(state);
    this.search(state);
  }

  onChangeMeal(e) {
    let state = this.state.params;

    state.meals[e.target.value] = e.target.checked;
    this.trackEvent('search-meal-' + e.target.value);
    this.setState(state);
    this.search(state);
  }

  onChangeId(e) {
    let state = this.state.params;

    state.noId = e.target.checked;
    this.trackEvent('search-no-referral-or-id');
    this.setState(state);
    this.search(state);
  }

  onSubmit(e) {
    e.preventDefault();
    this.trackEvent('manual-submit');
    this.search(this.state.params);
  }

  render() {
    let locations = this.state.locations.map(location => {
      return {
        day: location.day,
        now: location.now,
        object: location.object.toJSON()
      };
    });

    return (
      <div className="search">
        <form onSubmit={this.onSubmit.bind(this)}>
          <dl>
            <dd className="day">
              <div className="select-wrapper">
                <label htmlFor="day"><i className="fa fa-chevron-down"></i></label>
                <select name="day" id="day" onChange={this.onChangeDay.bind(this)}>
                  <option value="0">Today</option>
                  <option value="1">Tomorrow</option>
                  <option value="2">2 Days from now</option>
                </select>
              </div>
            </dd>
            <dd className="meals">
              <ul>
                <li>
                  <input type="checkbox" id="meals-lunch" name="[meals]" value="lunch" className="hidden" defaultChecked onChange={this.onChangeMeal.bind(this)} />
                  <label htmlFor="meals-lunch">Lunch</label>
                </li>
                <li>
                  <input type="checkbox" id="meals-snacks" name="[meals]" value="snacks" className="hidden" defaultChecked onChange={this.onChangeMeal.bind(this)} />
                  <label htmlFor="meals-snacks">Snacks</label>
                </li>
                <li>
                  <input type="checkbox" id="meals-dinner" name="[meals]" value="dinner" className="hidden" onChange={this.onChangeMeal.bind(this)}/>
                  <label htmlFor="meals-dinner">Dinner</label>
                </li>
                <li>
                  <input type="checkbox" id="meals-hamper" name="[meals]" value="hamper" className="hidden" onChange={this.onChangeMeal.bind(this)}/>
                  <label htmlFor="meals-hamper">Food Hamper</label>
                </li>
              </ul>
            </dd>
            <dd className="no-id h-s-only">
              <input type="checkbox" id="no-id" name="no-id" onChange={this.onChangeId.bind(this)}/>
              <label htmlFor="no-id">I have no ID or referrals</label>
            </dd>
          </dl>
        </form>
        <Map locations={locations} />
        <section className="list hidden">
        </section>
      </div>
    );
  }
};
