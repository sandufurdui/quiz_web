import React, { Component } from 'react'
import Navbar from '../components/navbar'
import "../style/quiz.css"
// import logo from "../style/img/image.jpg"

import Quiz from "../components/quiz"

export class about_page extends Component {
  render() {
    return (
      <div className="homepage">
        <Navbar />
        <div className="main_container">


          {/* <div className="form_container">
            <form >
              <h2>Welcome</h2>
              <input
                type="email"
                placeholder="Email"
              /><br />
              <input
                type="password"
                placeholder="Password"
              /><br />
              <input
                type="button"
                value="Sign in"
              /><br />
              <p>
                Forgot Password? <a className="underline" href="/register">Reset here</a>
              </p> <br />
              <p>Don't have an account?  <a className="underline" href="/register">Register</a>
              </p>
            </form>
          </div> */}


        </div>
      </div>
    )
  }
}

export default about_page