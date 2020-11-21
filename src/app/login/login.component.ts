import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import core firebase client (required)
import firebase from '@firebase/app';
// import Firebase Authentication (optional)
import '@firebase/auth';
// import Firebase Realtime Database (optional)
import '@firebase/database';
// import Cloud Firestore (optional)
import '@firebase/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private afAuth: AngularFireAuth) { }

  login(){
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }
  
}
