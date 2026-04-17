import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionUserService } from '../../../services/session/session-user.service';
import { User } from '../../../models/user.model';
import { ROUTE } from '../../../router/routes/route';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private sessionUserService: SessionUserService,
  ) {}

  ngOnInit() {}

  logIn() {
    const user = new User({
      id: '1',
      firstName: 'Mario',
      lastName: 'Rossi',
      email: 'email@test.gov',
      code: 'mario.rossi',
    });
    this.sessionUserService.setCurrentUser(user);
    this.router.navigate([ROUTE.AUTH.BASE_PATH]);
  }
}
