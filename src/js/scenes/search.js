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
              <ul>
                <li>
                  <input type="checkbox" id="meals-lunch" name="[meals]" value="lunch" className="hidden" defaultChecked/>
                  <label htmlFor="meals-lunch">Lunch</label>
                </li>
                <li>
                  <input type="checkbox" id="meals-snacks" name="[meals]" value="snacks" className="hidden"/>
                  <label htmlFor="meals-snacks">Snacks</label>
                </li>
                <li>
                  <input type="checkbox" id="meals-dinner" name="[meals]" value="dinner" className="hidden"/>
                  <label htmlFor="meals-dinner">Dinner</label>
                </li>
                <li>
                  <input type="checkbox" id="meals-hamper" name="[meals]" value="hamper" className="hidden"/>
                  <label htmlFor="meals-hamper">Food Hamper</label>
                </li>
              </ul>
            </dd>
            <dd className="no-id">
              <input type="checkbox" id="no-id" name="no-id" defaultChecked={false}/>
              <label htmlFor="no-id">I have no ID or referrals</label>
            </dd>
          </dl>
        </form>
      </div>
    );
  }
};
