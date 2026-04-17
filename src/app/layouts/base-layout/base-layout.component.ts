import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import HeaderComponent from '../../components/header/header.component';
import FooterComponent from '../../components/footer/footer.component';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
})
export default class BaseLayoutComponent {}
