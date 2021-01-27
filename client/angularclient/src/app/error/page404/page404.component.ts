import { Component, OnInit } from '@angular/core';

/**
 * Component used when user tries to navigate to an url that doesnt exist, e.g /slhgslgh
 */
@Component({
  selector: 'app-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.css']
})
export class Page404Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
