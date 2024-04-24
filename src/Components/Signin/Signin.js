// Importing necessary dependencies and styles
import React from "react";

// Defining a class component called Signin
class Signin extends React.Component {
    constructor (props) {
        super(props);
        // Initializing state with signInEmail and signInPassword
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    // Method to update signInEmail state when input changes
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    // Method to update signInPassword state when input changes
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    // Method to handle form submission
    onSubmitSignIn = () => {
        // Sending a fetch request to the server with email and password
        fetch("https://smart-brain-api-backend-o27j.onrender.com", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            // Parsing the response as JSON
            .then(response => response.json())
            .then(user => {
                // If the response indicates success, change route to 'home'
                if (user.id) {// does the user exist? Did we receive a user with a property of id?
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
    }

    // Render method to display the Signin form
    render() {
        const { onRouteChange } = this.props;
        return(
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main  className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address" 
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password" 
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                                </div>
                        </fieldset>
                                <div className="">
                                    <input 
                                    onClick={this.onSubmitSignIn}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                    type="submit" 
                                    value="Sign in"/>
                                </div>
                                <div className="lh-copy mt3">
                                    {/* Link to register page with onRouteChange */}
                                    <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                                </div>
                    </div>
                </main>
            </article>
        );
    }
}
// Exporting the component for use in other parts of the application
export default Signin;
