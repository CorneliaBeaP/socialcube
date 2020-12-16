import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {LoginService} from "../services/login.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  url: string | ArrayBuffer;
  // url2: string = 'http:\\C:\\Users\\corne\\OneDrive\\Dokument\\SocialCube\\Kod\\ProfilePictures\\4.png';
  url2: string;

  constructor(private userService: UserService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.url2 = '../../../assets/ProfilePictures/' + this.loginService.getUserValue().id + '.png'
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
      // this.onFileChanged(event);
      console.log(event.target.files[0]);
      // this.file = event.target.files[0];
      this.onUpload(event.target.files[0]);
    }

  }

  onUpload(file: any) {
    let formData = new FormData();
    formData.append('name', file);
    this.userService.uploadProfilePicture(formData, this.loginService.getUserValue().id);

  }
}
