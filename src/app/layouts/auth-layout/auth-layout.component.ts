import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import MenuComponent from '../../components/menu/menu.component';
import HeaderComponent from '../../components/header/header.component';
import FooterComponent from '../../components/footer/footer.component';
import { SessionUserService } from '../../services/session/session-user.service';
import { ROUTE } from '../../router/routes/route';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  imports: [MenuComponent, HeaderComponent, FooterComponent, RouterOutlet],
})
export default class AuthLayoutComponent {
  private readonly router = inject(Router);
  private readonly sessionUserService = inject(SessionUserService);

  logOut(): void {
    this.sessionUserService.removeUser();
    this.router.navigate([ROUTE.PUBLIC.BASE_PATH]);
  }
}
