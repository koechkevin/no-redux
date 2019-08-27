import React from "react";
import Jira from "../actions/jira";

class Login extends React.Component {
  state = {
    email: '', password: ''
  };
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  };
  onSubmit = async (e) => {
    e.preventDefault();
    const {email, password} = this.state;
    const {updateKey, saveUserData} = this.props;
    const key = btoa(`${email}:${password}`);
    try {
      const { data } = await Jira.login(key);
      saveUserData(data);
      localStorage.setItem('key', key);
      localStorage.setItem('data', JSON.stringify(data));
      updateKey(key);
    } catch (e) {
      console.log(e)
    }
  };
  render(){
    const {email, password} = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div className="input-fields">
          <label>
            <input value={email} onChange={this.onChange} name="email" placeholder="Email" type="email"/>
          </label>
          <label>
            <input value={password} onChange={this.onChange} name="password" placeholder="password" type="password"/>
          </label>
          <input type="submit" value="Login"/>
          <div className="forgot-password">Forgot Password?</div>
        </div>
      </form>
    );
  }
}
export default Login
