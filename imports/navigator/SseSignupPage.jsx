import React from 'react';
import { Link } from 'react-router-dom';
import {withTracker} from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import {MuiThemeProvider} from '@material-ui/core/styles';
import SseTheme from "../common/SseTheme";

class SseSignupPage extends React.Component 
{
    constructor()
    {
        super();
        this.state = {
        error: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e)
    {
        e.preventDefault();
        let name = document.getElementById("signup-name").value;
        let password = document.getElementById("signup-password").value;
        this.setState({error: "test"});
        let isSignupSuccess = false
        Accounts.createUser({username: name, password: password}, (err) => {
        if(err){
            this.setState({
            error: err.reason
            });
        }
        else
        {
            isSignupSuccess = true
        }
        if(isSignupSuccess)
        {
            this.props.history.push('/login');
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
                <h1 className="text-center">Sign up</h1>
                </div>
                <div className="modal-body">
                { error.length > 0 ?
                    <div className="alert alert-danger fade in">{error}</div>
                    :''}
                <form  id="login-form"
                        className="form col-md-12 center-block"
                        onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <input type="text" id="signup-name"
                            className="form-control input-lg" placeholder="name"/>
                    </div>
                    <div className="form-group">
                    <input type="password" id="signup-password"
                            className="form-control input-lg"
                            placeholder="password"/>
                    </div>
                    <div className="form-group">
                    <input type="submit" id="login-button"
                            className="btn btn-lg btn-primary btn-block"
                            value="Sign Up" />
                    </div>
                    <div className="form-group">
                    <p className="text-center">
                        Already have an account? Login <Link to="/login">here</Link>
                    </p>
                    </div>
                </form>
                </div>
                <div className="modal-footer" style={{borderTop: 0}}></div>
            </div>
            </div>
        </div>
        </MuiThemeProvider>
        );
    }
}

export default withTracker((props) => {
    const currentUser = Meteor.user();
    return {
      currentUser,
    };
})(SseSignupPage);