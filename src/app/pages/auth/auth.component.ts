import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import FooterComponent from 'src/app/components/footer/footer.component';
import HeaderComponent from 'src/app/components/header/header.component';
import MenuComponent from 'src/app/components/menu/menu.component';
import { SessionUserService } from 'src/app/services/session/session-user.service';
import { ROUTE } from 'src/app/shared/route.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [
    MenuComponent,
    HeaderComponent,
    FooterComponent,
  ]
})
export default class AuthComponent implements OnInit {

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
