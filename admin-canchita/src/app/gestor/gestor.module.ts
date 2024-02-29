import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestorRoutingModule } from './gestor-routing.module';
import { GestorComponent } from './gestor.component';
// import { HeaderComponent } from '../common-component/header/header.component';
// import { SidebarComponent } from '../common-component/sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    GestorComponent,
    // HeaderComponent,
    // SidebarComponent,
  ],
  imports: [
    CommonModule,
    GestorRoutingModule,
    SharedModule,
  ]
})
export class GestorModule { }
