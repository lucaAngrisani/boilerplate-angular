import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionUserService } from 'src/app/services/session/session-user.service';
import { ROUTE } from 'src/app/shared/route.enum';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css'],
    standalone: false
})
export class AuthComponent implements OnInit {

  constructor(
    private router: Router,
    private sessionUserService: SessionUserService,
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.sessionUserService.removeUser();
    this.router.navigate([ROUTE.PUBLIC]);
  }
}
