import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  user$: Observable<firebase.User>; 

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
   }

  logout(){
    this.afAuth.signOut()
  }

}
