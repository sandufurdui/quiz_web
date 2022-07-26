import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
// import "../style/dashboard.css";
import { auth, db, logout } from "../firebase";
import Navbar from "../components/navbar"
import Login from "./login_page"
import AddCard from "../components/addQuizCard"

function Dashboard() {
    const [user, loading, error] = useAuthState(auth);
    const history = useNavigate();

    useEffect(() => {
        // if (loading) return;
        if (!user) return history("/login");
    }, [
        user,
        // loading
    ]);


    return (
        <div>
            {user ? (
                <div className="homepage">
                    <Navbar />
                    <div className="main_container special">
                        <div className="">
                            <AddCard />
                        </div>

                    </div>

                </div>


            ) : (
                null
            )}
        </div>
    );
}
export default Dashboard;