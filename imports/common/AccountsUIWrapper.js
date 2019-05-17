import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
 
export default class AccountsUIWrapper extends Component {
  componentDidMount()
  {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount()
  {
    // Clean up Blaze view
    Blaze.remove(this.view);
    console.log("componentWillUnmount")
  }
  componentWillReceiveProps(nextProps)
  {
    console.log("componentWillReceiveProps")
    console.log(this.props)
    console.log(nextProps)
  }
  componentDidUpdate()
  {
    console.log("componentDidUpdate")
  }
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
}