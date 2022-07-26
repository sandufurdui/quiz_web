import React, { Componentm, useEffect, useState } from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAIOALSrr7KLm3eF6loiutcNZEi1xxX2_Y",
  authDomain: "quizio-422c4.firebaseapp.com",
  projectId: "quizio-422c4",
  storageBucket: "quizio-422c4.appspot.com",
  messagingSenderId: "1053908330872",
  appId: "1:1053908330872:web:ff8bcba2f02c45ec05408d",
  measurementId: "G-TGDQ4SSW6S",
  databaseURL: "https://quizio-422c4-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const storage = getStorage(app);
// let localUID = null

const signInWithGoogle = async () => {
  
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    localStorage.localUID = user.uid
    //  if (localStorage.getItem("userId") == null){
    //   console.log("no variable")

    //  }else {
    //   console.log("some value")
    //  }
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection('users/').doc(user.uid).set({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    alert(err.message.replace('Firebase: ', ''));
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    localStorage.localUID = user.uid
    // const temp = localStorage.getItem("userId")
    // if (temp == null){
    //   console.log("no variable")

    //  }else {
    //   console.log("some value")
    //  }
    // localUID = user.uid
    // console.log(localUID)
    await db.collection('users/').doc(user.uid).set({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.log(err)
    alert(err.message.replace('Firebase: ', ''));
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await auth.signInWithEmailAndPassword(email, password);
    const user = res.user;
    localStorage.localUID = user.uid
  } catch (err) {
    alert(err.message.replace('Firebase: ', ''));
  }
};
const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    alert(err.message.replace('Firebase: ', ''));
  }
};
const logout = () => {
  auth.signOut();
};
export {
  app,
  auth,
  db,
  storage,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
};