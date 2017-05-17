'use strict';

// libs
import React from 'react';

// assets
import '../../scss/subscribeform.scss';

const SubscribeForm = () => {
  return (
    <div id="mc_embed_signup" className="subscribe-form">
      <form action="//foodfinderyyc.us15.list-manage.com/subscribe/post?u=8e5ed19e921d57693b779dfac&amp;id=a6683ec557" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
        <div id="mc_embed_signup_scroll">
          <div className="mc-field-group">
            <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" placeholder="Email Address" />
          </div>
          <div className="mc-field-group">
            <div className="select-wrapper">
              <select name="group[1783]" className="REQ_CSS" id="mce-group[1783]">
                <option value="">I am a</option>
                <option value="2">Kid</option>
                <option value="4">Teen</option>
                <option value="8">Parent/Custodian</option>
                <option value="16">Teacher</option>
              </select>
              <label htmlFor="mce-group[1783]"><i className="fa fa-chevron-down"></i></label>
            </div>
          </div>
          <div className="mc-field-group">
            <div className="select-wrapper">
              <select name="group[1787]" className="REQ_CSS" id="mce-group[1787]">
                <option value="">I live in</option>
                <option value="32">NE</option>
                <option value="64">SE</option>
                <option value="128">SW</option>
                <option value="256">NW</option>
                <option value="512">DT</option>
              </select>
              <label htmlFor="mce-group[1787]"><i className="fa fa-chevron-down"></i></label>
            </div>
          </div>
          <div className="mc-field-group input-group">
            <input type="checkbox" value="1" name="group[1707][1]" id="mce-group[1707]-1707-0" /><label htmlFor="mce-group[1707]-1707-0">I want to get involved</label>
          </div>
          <div id="mce-responses" className="clear">
            <div className="response" id="mce-error-response"></div>
            <div className="response" id="mce-success-response"></div>
          </div>
          <div className="bot-check"><input type="text" name="b_8e5ed19e921d57693b779dfac_a6683ec557" value="" /></div>
          <div className="clear"><button type="submit" value="Subscribe" id="mc-embedded-subscribe" className="b" >Subscribe</button></div>
        </div>
      </form>
    </div>
  );
};

export default SubscribeForm;
