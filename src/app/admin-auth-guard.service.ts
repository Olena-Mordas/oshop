import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import firebase from 'firebase';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate() {
    return this.auth.user$.pipe(
      switchMap((user: firebase.User) =>
        this.userService.get(user.uid)
          .pipe(
            map((appUser:AppUser) => appUser.isAdmin)
          )
      )
    )
  }

}
