import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { SessionUserService } from 'src/app/services/session/session.user.service';
import { ROUTE } from 'src/app/shared/route.enum';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private sessionUserService: SessionUserService,
  ) { }

  ngOnInit() {
  }

  logIn() {
    const user = new User({
      id: "1",
      firstName: "Mario",
      lastName: "Rossi",
      email: "email@test.gov",
      code: "mario.rossi"
    });
    this.sessionUserService.setCurrentUser(user);
    this.router.navigate([ROUTE.AUTH])
  }

}
