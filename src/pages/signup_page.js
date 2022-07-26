import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar"
import { storage, auth, registerWithEmailAndPassword, signInWithGoogle, } from "../firebase";
// import { useState } from "react";
// import { storage } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const history = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) history("/dashboard");
  }, [user, loading]);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };








  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState(0);

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const file = e.target[0]?.files[0]
  //   if (!file) return;
  //   const storageRef = ref(storage, `files/${file.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on("state_changed",
  //     (snapshot) => {
  //       const progress =
  //         Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //       setProgresspercent(progress);
  //     },
  //     (error) => {
  //       alert(error);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         setImgUrl(downloadURL)
  //       });
  //     }
  //   );
  // }



  return (
    <>
      {user ? (
        <>
        </>
      ) : (
        <div className="homepage">
          <Navbar />
          <div className="main_container">
            <div className="form_container">
              <form >
                <h1>Register</h1>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                /><br />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                /><br />
                <input
                  type={passwordShown ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                /><br />
                {/* <button onClick={togglePassword}>Show Password</button> */}
                <label htmlFor="profile_photo"> Select a profile photo</label><br />
                {/* <input name="profile_photo" type="file" onChange={handleChange} accept="/image/*" /> */}
                {/* <button onClick={handleUpload}>Upload to Firebase</button> */}
                {/* <br /> */}
                {/* <p>{percent} "% done"</p><br /> */}


                <form 
                // onSubmit={handleSubmit} 
                className='form'>
                  <input type='file' />
                  <button type='submit'>Upload</button>
                </form>
                {
                  !imgUrl &&
                  <div className='outerbar'>
                    <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                  </div>
                }
                {
                  imgUrl &&
                  <img src={imgUrl} alt='uploaded file' height={200} />
                }

                <input
                  type="button"
                  value="Register"
                  onClick={() => registerWithEmailAndPassword(name, email, password)}
                />
                <br />
                <h2>OR</h2>
                <input
                  type="button"
                  value="Sign with Google"
                  onClick={signInWithGoogle}
                /><br />
                <p>Already have an account?  <a className="underline" href="/login">Log In</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Register;