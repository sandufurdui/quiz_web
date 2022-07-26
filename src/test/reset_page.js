import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "../firebase";
import Navbar from "../components/navbar"
// import "./reset.css";
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  // const history = useNavigate();
  useEffect(() => {
    if (loading) return;
    // if (user) history.replace("/dashboard");
  }, [user, loading]);
  return (
    <>
      <div className="homepage">
        <Navbar />
        <div className="main_container">
          <div className="form_container">
            <form >
              <h1>Reset password</h1>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /><br />
              <br />
              <input
                type="button"
                value="Reset"
                onClick={() => sendPasswordResetEmail(email)}
              /><br />
              <p>Or <a className="underline" href="/login">Log in</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Reset;