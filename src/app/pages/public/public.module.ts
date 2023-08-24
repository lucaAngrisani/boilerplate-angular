import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicComponent } from './public.component';
import { publicRoutes } from './public.routing';

import FooterComponent from 'src/app/components/footer/footer.component';
import HeaderComponent from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(publicRoutes),

    HeaderComponent,
    FooterComponent,

  ],
  declarations: [PublicComponent]
})
export default class PublicModule { }
