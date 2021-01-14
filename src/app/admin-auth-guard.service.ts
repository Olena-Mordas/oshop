import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { map } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate() {
    return this.auth.appUser$
      .pipe(
        map((appUser: AppUser) => appUser.isAdmin)
      )
  }

}
