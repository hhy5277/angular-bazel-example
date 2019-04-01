import {Component, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MaterialModule} from './material/material.module';

@Component({
  selector: 'home',
  templateUrl: './home.html',
})
export class Home {
}

@NgModule({
  declarations: [Home],
  imports: [
    RouterModule.forChild([{path: '', component: Home}]),
    MaterialModule,
  ],
})
export class HomeModule {
}