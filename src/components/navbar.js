import React, { Componentm, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout, app, localUID } from "../firebase";
import { doc, getDocFromCache, SnapshotMetadata, getDoc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { Firestore } from 'firebase/firestore';
import logo from "../style/img/logo.png"
import "../style/navbar.css"
import "../style/quiz_card.css"
import "firebase/auth";

// export default function Navbar() {


const Navbar = () => {

    const [userAuthState] = useAuthState(auth);
    const [name, setName] = useState();
    const [role, setRole] = useState(null);
    var userStoredId = localStorage.getItem("localUID");

    const fetchUserInfo = async () => {
        const docRef = doc(db, 'users', userStoredId);
        try {
            const doc = await getDoc(docRef);
            var temp = doc.data()
            setName(temp.name)
            localStorage.userName = temp.name
            localStorage.userRole = temp.role
        } catch (e) {
            console.log("Error getting cached document:", e);
        }
    }

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <div className="navbar_container">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" integrity="sha512-1PKOgIY59xJ8Co8+NE6FZ+LOAZKjy+KY8iq0G4B3CyeY6wYHN3yt9PW0XpSriVlkMXe40PTKnXrLnZ9+fkDaog==" crossOrigin="anonymous" />
            <div className="logo">
                <img className="logo-image" src={logo} />
                <div className="logo-text"><span>uiz</span><span>io</span></div>
            </div>
            <div className="page_list">

                <div className="nav_element_div"><Link className="nav_element" to="/"><i className="fas fa-home nav_element_icon"></i>Home</Link></div>
                <div className="nav_element_div"><Link className="nav_element" to="/about"><i className="fas fa-info-circle nav_element_icon"></i>About</Link></div>
                {/* <Link className="link" component={Dashboard} to="/dashboard">Dashboard1</Link>  */}
                {userAuthState ? <div className="nav_element_div"><Link className="nav_element" to="/dashboard"><i className="fas fa-user nav_element_icon"></i>Dashboard</Link></div> : null}
                {userAuthState ? null : <div className="nav_element_div"><Link className="nav_element" to="/dashboard"><i className="fas fa-sign-in-alt nav_element_icon"></i>Log In</Link></div>}
            </div>
            <div className="footer">
                {userAuthState ?
                    <div className="container_profile">
                        <img
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                            alt="user"
                        />
                        <div>
                            <h2 className="capital">{localStorage.getItem("userName")}</h2>
                            <p><b className="capital">{localStorage.getItem("userRole")}</b></p>
                        </div>
                        <div>
                            <button className="sign_out_button" onClick={logout}><i className="fas fa-sign-out-alt sign_out"></i></button>
                        </div>
                    </div> :
                    <div className="container_profile">
                        <img
                            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                            alt="author"
                        />
                        <div>
                            <h2 className="capital">Guest</h2>
                            <p><b className="capital">guest</b></p>
                        </div>
                        <div>
                            <Link className="nav_element" to="/login"><button className="sign_in_button" onClick={logout}><i className="fas fa-sign-in-alt sign_out"></i></button></Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}



export default Navbar