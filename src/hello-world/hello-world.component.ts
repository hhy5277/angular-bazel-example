import {Component, NgModule} from '@angular/core';
import {msg} from '../lib/file';

@Component({
  selector: 'hello-world',
  templateUrl: 'hello-world.component.html',
  styleUrls: ['./hello-world.component.scss']
})
export class HelloWorldComponent {
  name: string = msg;
}
