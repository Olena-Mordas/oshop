import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import firebase from 'firebase';
import { Observable , of} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>; 
  
  constructor(private afAuth: AngularFireAuth, private userService: UserService, private route: ActivatedRoute) {
    this.user$ = this.afAuth.authState;
   }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }

  logout(){this.afAuth.signOut()}

  get appUser$(): Observable<any>{
    return this.user$.pipe(
      switchMap((user: firebase.User) => {
        if (user) return this.userService.get(user.uid);
        return of(null);
      })
    )
  }
}
