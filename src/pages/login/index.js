import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { adminLogin } from "../../actions/commonActions";
import { getCookie, setCookie, eraseCookie } from "../../utils/cookie";

import Loading from "../../components/Common/Loading";

class Login extends Component {
  constructor(props) {
    super(props);

    let login = getCookie("login");
    let password = getCookie("pwd");
    let remember = getCookie("remember");

    this.state = {
      loggedIn: false,
      phoneNo: login !== "" && login !== null ? login : "",
      password: password !== "" && password !== null ? password : "",
      rememberMe: remember === "1" ? true : false,
      loginError: false,
      loginErrorMessage: "",
      showLoader: false
    };

    let homesfy_lg = localStorage.getItem("homesfy");
    if (homesfy_lg && homesfy_lg !== "") {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("nextProps",nextProps)
    if (nextProps.loginResponse.response.meta.status === 200 &&
      nextProps.loginResponse.response.data.role === "Admin") {
      localStorage.setItem(
        "homesfy_lg",
        window.btoa(JSON.stringify(nextProps.loginResponse.response.data))
      );
      this.setState({ showLoader: false, loggedIn: true });
    } else if (nextProps.loginResponse.response.meta.status === 400) {
      this.toggleLoginError(nextProps.loginResponse.response.meta.message);
    }
  }

  onChange = e => {
    if (e.target.name === "rememberMe") {
      this.setState({ rememberMe: !this.state.rememberMe });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  onLogin = e => {
    const loginRequest = (({ phoneNo, password }) => ({
      phoneNo,
      password,
    }))(this.state);

    if (loginRequest.phoneNo !== "" && loginRequest.password !== "") {
      if (this.state.rememberMe) {
        setCookie("login", loginRequest.phoneNo, 1);
        setCookie("pwd", loginRequest.password, 1);
        setCookie("remember", 1, 1);
      }
      loginRequest.phoneNo = parseInt(loginRequest.phoneNo)
      this.setState({ showLoader: true });
      this.props.adminLogin(loginRequest);
    } else {
      this.toggleLoginError();
    }

    e.preventDefault();
  };

  toggleLoginError = message => {
    if (message && message !== "") {
      this.setState({
        loginErrorMessage: message,
        showLoader: false,
        loginError: true
      });
    } else {
      this.setState({
        loginErrorMessage: "",
        showLoader: false,
        loginError: true
      });
    }

    let loginFailedInterval = setInterval(() => {
      this.setState({ loginError: false });
      clearInterval(loginFailedInterval);
    }, 5000);
  };

  render() {
    let redirectHtml;
    let errorMessageElement;

    if (this.state.loggedIn) {
      return <Redirect to="/dashboard" />;
    }

    if (this.state.loginError) {
      let message =
        this.state.loginErrorMessage !== ""
          ? this.state.loginErrorMessage
          : "Please enter a valid username and password.";
      errorMessageElement = (
        <div className="col-12 text-center mt-2">
          <small className="text-danger font-weight-bold">{message}</small>
        </div>
      );
    }

    return (
      <div>
        <Loading show={this.state.showLoader} />
        
        {/* <header className="App-header">Header</header> */}
        <section className="login">
          <div className="row mx-0">
            <form className="mt-4" onSubmit={this.onLogin}>
                  <div className="form-group mb-1">
                    <label htmlFor="exampleInputphoneNo1">
                      Username or phoneNo 
                    </label>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend px-0 col-12">
                        <div
                          className="input-group-text"
                          style={{ background: "none", borderRight: "none" }}
                        >
                        </div>
                        <input
                          type="number"
                          className="form-control no-focus-border"
                          id="phoneNo"
                          name="phoneNo"
                          onChange={this.onChange}
                          value={this.state.phoneNo}
                          style={{ borderLeft: "none", paddingLeft: "0" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-1">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <div className="input-group mb-2">
                      <div className="input-group-prepend px-0 col-12">
                        <div
                          className="input-group-text"
                          style={{ background: "none", borderRight: "none" }}
                        >
                        </div>
                        <input
                          type="password"
                          className="form-control no-focus-border"
                          id="password"
                          name="password"
                          onChange={this.onChange}
                          value={this.state.password}
                          style={{ borderLeft: "none", paddingLeft: "0" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      onChange={this.onChange}
                      name="rememberMe"
                      checked={this.state.rememberMe ? true : false}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn col-12 btn-login"
                    onClick={this.onLogin}
                  >
                    Log in
                  </button>
                  {errorMessageElement}
                </form>
          </div>
        </section>
        <footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loginResponse: state.common.loginResponse
});

export default connect(
  mapStateToProps,
  {
    adminLogin
  },
  null,
  { forwardRef: true }
)(Login);
