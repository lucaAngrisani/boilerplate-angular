import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import FooterComponent from 'src/app/components/footer/footer.component';
import HeaderComponent from 'src/app/components/header/header.component';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
  ]
})
export default class PublicComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
