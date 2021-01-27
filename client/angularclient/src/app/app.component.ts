import {Component} from '@angular/core';

/**
 * Main component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * Title to be shown in browser
   */
  title = 'SocialCube';

  constructor() {
  }
}
