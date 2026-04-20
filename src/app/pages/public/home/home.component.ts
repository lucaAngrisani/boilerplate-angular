import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { UserFormComponent } from '../../../components/user-form/user-form.component';
import { ROUTE } from '../../../router/routes/route';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [TranslatePipe, UserFormComponent],
})
export default class HomeComponent {
  private readonly router = inject(Router);

  protected goToLogin(): void {
    this.router.navigate([ROUTE.PUBLIC.BASE_PATH, ROUTE.PUBLIC.LOGIN]);
  }
}
