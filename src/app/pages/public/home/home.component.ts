import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { UserFormComponent } from '../../../components/user-form/user-form.component';
import { ROUTE } from '../../../router/routes/route';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [TranslatePipe, UserFormComponent],
})
export default class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToLogin() {
    this.router.navigate([ROUTE.PUBLIC.BASE_PATH, ROUTE.PUBLIC.LOGIN]);
  }
}
