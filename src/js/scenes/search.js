'use strict';

// libs
import React from 'react';

// assets
import '../../scss/search.scss';

export default class Search extends React.Component {
  render() {
    return (
      <div className="search">
        <form>
          <dl>
            <dd className="day">
              <select name="day">
                <option value="0">Today</option>
                <option value="1">Tomorrow</option>
                <option value="2">2 Days from now</option>
              </select>
            </dd>
            <dd className="meals">
              <input type="checkbox" id="meals-lunch" value="lunch"/>
              <label htmlFor="meals-lunch">Lunch</label>

              <input type="checkbox" id="meals-snacks" value="snacks"/>
              <label htmlFor="meals-snacks">Snacks</label>

              <input type="checkbox" id="meals-dinner" value="dinner"/>
              <label htmlFor="meals-dinner">Dinner</label>

              <input type="checkbox" id="meals-hamper" value="hamper"/>
              <label htmlFor="meals-hamper">Food Hamper</label>
            </dd>
            <dd className="idOrReferral">
            </dd>
          </dl>
        </form>
      </div>
    );
  }
};
