'use strict';

// libraries
import React, { Component } from 'react';

// assets
import '../../scss/infopanel.scss';
import ImageLunch from '../../img/meal-lunch.png';
import ImageSnacks from '../../img/meal-snacks.png';
import ImageDinner from '../../img/meal-dinner.png';
import ImageHamper from '../../img/meal-hamper.png';

const spaceRegex = /\s/g;
const phoneRegex = /(\(|\)|-|\.)+/g;

const mealImages = {
  lunch: {
    image: ImageLunch,
    text: 'lunch'
  },
  snacks: {
    image: ImageSnacks,
    text: 'snacks'
  },
  dinner: {
    image: ImageDinner,
    text: 'dinner'
  },
  hamper: {
    image: ImageHamper,
    text: 'food hamper'
  }
};

function convertTimeToAMPM(hour, min) {
  if (min === 0) { min = '00'; }

  if (hour === 12) {
    if (min === '00') {
      return 'noon';
    } else {
      return hour + ':' + min + 'PM';
    }
  }
  if (hour > 12) { return (hour - 12).toString() + ':' + min + 'PM'; }
  if (hour < 12) { return hour.toString() + ':' + min + 'AM'; }
}

export default class InfoPanel extends Component {
  constructor() {
    super();
  }

  render() {
    let location = this.props.location;
    let day = location.day;
    let now = location.now;
    let info = location.object;
    let className = location && location.object ? 'info-panel active' : 'info-panel';
    let address = <address/>;
    let meals;
    let phone;
    let phoneUrl;
    let hours;
    let shifts;
    let restrictions;
    let description;

    if (info.address) {
      let fullAddress = info.address + ' ' + info.city + ' ' + info.province;
      let gmapUrl = "https://maps.google.com/?daddr=";

      fullAddress = fullAddress.replace(spaceRegex, '+');

      address = (
        <address>
          {info.address}<br/>
          {info.city}, {info.province}<br/>
          <a className="direction" href={gmapUrl + fullAddress} target="_blank">
            <i className="fa fa-chevron-right"></i>
            Get directions
          </a>
        </address>
      );
    }

    meals = info.meals.map(meal => {
      if (mealImages[meal]) {
        return (
          <li key={meal}>
            <img src={mealImages[meal].image} />
            {mealImages[meal].text.toUpperCase()}
          </li>
        );
      } else {
        return (
          <li key={meal}>
            {meal.toUpperCase()}
          </li>
        );
      }
    });

    if (info.phone) {
      phoneUrl = 'tel:' + info.phone.replace(phoneRegex, '');
      phone = info.phone ? (
        <div className="info phone">
          <i className="fa fa-phone"></i>
          <p>
            <a href={phoneUrl} className="v-s-only">{info.phone}</a>
            <span className="h-s-only">{info.phone}</span>
          </p>
        </div>
      ) : null;
    }

    shifts = day.times.map((shift, index) => {
      let shiftStartTime = convertTimeToAMPM(parseInt(shift.start / 100), shift.start % 100);
      let shiftEndTime = convertTimeToAMPM(parseInt(shift.end / 100), shift.end % 100);

      return (
        <span className="shift" key={index}>{shiftStartTime} - {shiftEndTime}</span>
      );
    });

    hours = day ? (
      <div className="info hours">
        <i className="fa fa-clock-o"></i>
        <p>
          {shifts}
          {now.isAvailable ? <span className="now">Opens now</span> : null}
        </p>
      </div>
    ) : null;

    restrictions = info.restrictions ? (
      <div className="info restrictions">
        <i className="fa fa-pencil"></i>
        <p>{info.restrictions}</p>
      </div>
    ) : null;

    description = info.description ? (
      <div className="info description">
        <i className="fa fa-info-circle"></i>
        <p>
          <strong>More Information:</strong><br/>
          {info.description}
        </p>
      </div>
    ) : null;

    return (
      <div className={className}>
        <i className="fa fa-close" onClick={this.props.onDismiss}></i>
        <section>
          <h1>{info.name}</h1>
          {address}
        </section>
        <section>
          <h2>Serving:</h2>
          <ul className="meals">
            {meals}
          </ul>
        </section>
        <section>
          {phone}
          {hours}
          {restrictions}
          {description}
        </section>
      </div>
    );
  };
};
