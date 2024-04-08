import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE } from 'src/app/shared/route.enum';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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
