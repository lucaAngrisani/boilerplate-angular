import { Component } from '@angular/core';
import { Router } from '@angular/router';
import MenuComponent from '../../components/menu/menu.component';
import HeaderComponent from '../../components/header/header.component';
import FooterComponent from '../../components/footer/footer.component';
import { SessionUserService } from '../../services/session/session-user.service';
import { ROUTE } from '../../router/routes/route';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  imports: [MenuComponent, HeaderComponent, FooterComponent],
})
export default class AuthLayoutComponent {
  constructor(
    private router: Router,
    private sessionUserService: SessionUserService,
  ) {}

  logOut() {
    this.sessionUserService.removeUser();
    this.router.navigate([ROUTE.PUBLIC.BASE_PATH]);
  }
}
