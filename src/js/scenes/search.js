'use strict';

// libs
import React from 'react';
import Parse from 'parse';

// assets
import '../../scss/search.scss';

const config = {
  PARSE: PARSE
};

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      params: {
        day: 0,
        meals: {
          lunch: true,
          snacks: false,
          dinner: false,
          hamper: false
        },
        noId: false
      }
    };

    this.input = {};
  }

  componentDidMount() {
    Parse.initialize(config.PARSE.APP_ID, config.PARSE.JS_KEY);
    Parse.serverURL = config.PARSE.URL;
  }

  search(params) {
    console.log(params);
  }

  onChangeDay(e) {
    var target = e.target;
    var state = Object.assign({}, this.state);

    state.params.day = parseInt(target.value);
    this.setState(state);
    this.search(this.state.params);
  }

  onChangeMeal(e) {
    var target = e.target;
    var state = Object.assign({}, this.state);

    state.params.meals[target.value] = target.checked;
    this.setState(state);
    this.search(this.state.params);
  }

  onChangeId(e) {
    var target = e.target;
    var state = Object.assign({}, this.state);

    state.params.noId = target.checked;
    this.setState(state);
    this.search(this.state.params);
  }

  onSubmit(e) {
    e.preventDefault();
    this.search(this.state.params);
  }

  render() {
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
                  <input type="checkbox" id="meals-snacks" name="[meals]" value="snacks" className="hidden" onChange={this.onChangeMeal.bind(this)} />
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
              <input type="checkbox" id="no-id" name="no-id" defaultChecked={false} onChange={this.onChangeId.bind(this)}/>
              <label htmlFor="no-id">I have no ID or referrals</label>
            </dd>
          </dl>
        </form>
      </div>
    );
  }
};
