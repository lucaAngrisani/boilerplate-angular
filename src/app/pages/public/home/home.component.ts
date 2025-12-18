import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ROUTE } from 'src/app/shared/route.enum';
import { UserFormComponent } from "src/app/components/user-form/user-form.component";

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    TranslatePipe,
    UserFormComponent,
]
})
export default class HomeComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate([ROUTE.PUBLIC, ROUTE.LOGIN]);
  }
}
