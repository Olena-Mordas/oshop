import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'oshop';

  constructor(private auth: AuthService, private userService: UserService, private router: Router){
    auth.user$.subscribe(user=>{
      if(! user) return
      userService.save(user);
      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;
      localStorage.removeItem('returnUrl')
      router.navigateByUrl(returnUrl)
      
    });
  }
}
