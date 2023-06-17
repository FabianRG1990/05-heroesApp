import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-pege',
  templateUrl: './login-pege.component.html',
  styles: [
  ]
})
export class LoginPegeComponent {

constructor(
  private authService: AuthService,
  private router: Router

  ){}


  onLogin(): void{

    this.authService.login('fabian.soy@hotmail.com', '123456')
    .subscribe( user => {

      this.router.navigate(['/']);

    })
  }

}
