import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../components/navbar"
import "../style/forms.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useNavigate();
  useEffect(() => {
    // if (loading) {
    //   // maybe trigger a loading screen
    //   return;
    // }
    if (user) history("/dashboard");
    // if (!user) history("/");
  }, [
    user,
    // loading
  ]);



  return (
    <>
      {user ? (
        <div className="">
        </div>
      ) : (
        <div className="homepage">
          <Navbar />
          <div className="main_container">
            <div className="form_container">
              <form >
                <h1>Welcome</h1>
                <input
                  type="email"
                  placeholder="Email"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      signInWithEmailAndPassword(email, password)
                    }
                  }}
                /><br />
                <input
                  type="password"
                  placeholder="Password"
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      signInWithEmailAndPassword(email, password)
                    }
                  }}
                /><br />
                <input
                  type="button"
                  value="Sign in"
                  onClick={() => signInWithEmailAndPassword(email, password)}
                /><br />
                <h2>OR</h2>
                <input
                  type="button"
                  value="Sign with Google"
                  onClick={signInWithGoogle}
                /><br />
                <p>
                  Forgot Password? <a className="underline" href="/reset">Reset here</a>
                </p> <br />
                <p>Don't have an account?  <a className="underline" href="/register">Register</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Login;