import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {LoginService} from "../services/login.service";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Usersocu} from "../classes/usersocu";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  url: string | ArrayBuffer;
  url2: string;
  user: Usersocu;


  constructor(private userService: UserService,
              private loginService: LoginService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getLoggedInUser();
    this.getProfilePicture(this.loginService.getUserValue().id);

  }

  getLoggedInUser() {
    this.user = this.loginService.getUserValue();
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

  getProfilePicture(id: number) {
    this.getFolder(id).subscribe(data => {
      this.url2 = data;
    });
  }

  getFolder(id: number): Observable<string> {
    const folderPath = `../../../../assets/ProfilePictures`;
    return this.http
      .get(`${folderPath}/${id}.png`, {observe: 'response', responseType: 'blob'})
      .pipe(
        map(response => {
          return `${folderPath}/${id}.png`;
        }),
        catchError(error => {
          console.clear();
          return of(`${folderPath}/default.png`);
        })
      );

  }

  triggerFileUpload() {
    let element: HTMLElement = document.getElementById('fileupload') as HTMLElement;
    element.click();
  }

  removeProfilePicture() {
    this.url2 = `../../../../assets/ProfilePictures/${this.user.id}.png`;
    this.userService.removeProfilePicture(this.user.id);
    location.reload();
  }
}
