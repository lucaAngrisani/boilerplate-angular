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

  ROUTE = ROUTE;

  constructor(
    public router: Router,
  ) { }

  ngOnInit() {
  }

}
