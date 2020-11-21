import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  user: firebase.User; 

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user=>this.user = user)
   }

  logout(){
    this.afAuth.signOut()
  }

}
