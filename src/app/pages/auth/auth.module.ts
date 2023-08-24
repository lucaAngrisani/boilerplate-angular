import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { authRoutes } from './auth.routing';

import FooterComponent from 'src/app/components/footer/footer.component';
import HeaderComponent from 'src/app/components/header/header.component';
import MenuComponent from 'src/app/components/menu/menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),

    HeaderComponent,
    FooterComponent,
    MenuComponent,
  ],
  declarations: [AuthComponent]
})
export default class AuthModule { }
