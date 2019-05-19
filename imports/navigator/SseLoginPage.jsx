import React from 'react';
import { Link } from 'react-router-dom'
import {withTracker} from 'meteor/react-meteor-data';
import {MuiThemeProvider} from '@material-ui/core/styles';
import SseTheme from "../common/SseTheme";

class SseLoginPage extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = 
        {
            error: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e)
    {
        e.preventDefault();
        let name = document.getElementById('login-name').value;
        let password = document.getElementById('login-password').value;
        let isLoginSuccess = false
        Meteor.loginWithPassword(name, password, (err) => {
          if(err)
          {
            this.setState({
              error: err.reason
            });
          } 
          else 
          {
            isLoginSuccess = true
          }
          if(isLoginSuccess)
          {
            this.props.history.push('/');
          }
          
        });
    }
    
    render()
    {
    const error = this.state.error;
    return (<MuiThemeProvider theme={new SseTheme().theme}>
        <link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css"></link>
        <div className="modal show">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="text-center">Login</h1>
            </div>
            <div className="modal-body">
                { error.length > 0 ?
                <div className="alert alert-danger fade in">{error}</div>
                :''}
                <form  id="login-form"
                    className="form col-md-12 center-block"
                    onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="name"
                        id="login-name"
                        className="form-control input-lg"
                        placeholder="name"/>
                </div>
                <div className="form-group">
                    <input type="password"
                        id="login-password"
                        className="form-control input-lg"
                        placeholder="password"/>
                </div>
                <div className="form-group text-center">
                    <input type="submit"
                        id="login-button"
                        className="btn btn-primary btn-lg btn-block"
                        value="Login" />
                </div>
                <div className="form-group text-center">
                    <p className="text-center">
                    <font  color="#999999">Don't have an account? Register </font><Link to="/signup" color="#0000FF">here</Link>
                    </p>
                </div>
                </form>
            </div>
            <div className="modal-footer" style={{borderTop: 0}}></div>
            </div>
        </div>
        </div>
        </MuiThemeProvider>
    );}
}

export default withTracker((props) => {
    const currentUser = Meteor.user();
    return {
      currentUser,
    };
})(SseLoginPage);
