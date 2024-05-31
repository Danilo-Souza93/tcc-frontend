import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { AppComponent } from '../app.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ApresentacaoComponent } from '../apresentacao/apresentacao.component';
import { NavBarRoutingModule } from './nav-bar.routing';

@NgModule({
  declarations: [				
    NavbarComponent,
    ApresentacaoComponent
   ],
  imports: [
    NavBarRoutingModule,
    SharedModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NavBarModule { }
