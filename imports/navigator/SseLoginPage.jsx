import React from 'react';
import { withHistory, Link } from 'react-router-dom'
import { createContainer } from 'meteor/react-meteor-data'


export default class SseLoginPage extends React.Component {
    constructor()
    {
        super();
        this.state = 
        {
            error: ''
        };
    }
    componentDidMount()
    {
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e)
    {
        console.log("001")
        e.preventDefault();
        console.log("002")
        let name = document.getElementById('login-name').value;
        let password = document.getElementById('login-password').value;
        console.log("003")
        Meteor.loginWithPassword(name, password, (err) => {
          if(err)
          {
            this.setState({
              error: err.reason
            });
          } 
          else 
          {
            console.log("0041")
            this.props.history.push('/');
            console.log("0042")
          }
        });
        console.log("004")
    }
    
    render()
    {
    const error = this.state.error;
    return (
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
                    Don't have an account? Register <Link to="/signup">here</Link>
                    </p>
                </div>
                </form>
            </div>
            <div className="modal-footer" style={{borderTop: 0}}></div>
            </div>
        </div>
        </div>
    );}
}
