import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth.service";
import {Observable, of, Subscription} from "rxjs";
import {catchError, first, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Usersocu} from "../classes/usersocu";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Response} from "../classes/response";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  url: string | ArrayBuffer;
  profilepictureurl = '../../../../assets/ProfilePictures/default.png';
  user: Usersocu;
  infoform: FormGroup;
  passform: FormGroup;
  isPassSaveButtonClicked = false;
  isInfoSaveButtonClicked = false;
  isPasswordsNotMatching = false;
  isOldPasswordWrong = false;
  subscription: Subscription;
  subscrip: Subscription;
  response: Response;
  profilepicErrorMessage = "";
  fieldTextType1: boolean;
  fieldTextType2: boolean;
  fieldTextType3: boolean;


  constructor(private userService: UserService,
              private authService: AuthService,
              private http: HttpClient,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getLoggedInUser();
  }

  getLoggedInUser() {
    this.subscription = this.userService.getUser(this.authService.getToken()).subscribe((data) => {
      let data2 = JSON.stringify(data);
      this.user = JSON.parse(data2);
      if(this.user){
        if(this.user.id){
          this.getProfilePicture(this.user.id);
        }
      }
      this.createPassform();
      this.createInfoform();
    }, error => {
      this.authService.logout();
    });
  }

  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
      this.onUpload(event.target.files[0]);
    }
  }

  onUpload(file: any) {
    let formData = new FormData();
    if (!(file.size > 1048576)) {
      if (file.type.match('image.jpg') || file.type.match('image.jpeg') || file.type.match('image.png')) {
        formData.append('name', file);
        this.userService.uploadProfilePicture(formData, this.user.id);
      } else {
        this.profilepicErrorMessage = `Vänligen välj en bild av typen .png eller .jpg`;
      }
    } else {
      this.profilepicErrorMessage = 'Filen överstiger 1MB, vänligen försök med en mindre fil.'
    }
  }

  getProfilePicture(id: number) {
    this.getFolder(id).subscribe(data =>{
      this.profilepictureurl = data;
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
          // console.clear();
          return of(`${folderPath}/default.png`);
        })
      );
  }

  triggerFileUpload() {
    let element: HTMLElement = document.getElementById('fileupload') as HTMLElement;
    element.click();
  }

  removeProfilePicture() {
    this.profilepictureurl = `../../../../assets/ProfilePictures/${this.user.id}.png`;
    this.userService.removeProfilePicture(this.user.id);
    location.reload();
  }

  createInfoform() {
    this.infoform = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      department: [this.user.department]
    });
  }

  createPassform() {
    this.passform = this.formBuilder.group({
      oldpassword: ['', Validators.required],
      newpassword: ['', Validators.required],
      newpasswordrepeat: ['', Validators.required]
    });
  }

  onSubmitInfoform() {
    if (this.infoform.invalid) {
      this.isInfoSaveButtonClicked = true;
      return;
    }
    this.subscription = this.userService.updateUserInformation(this.user.token, this.infoform.get('name').value, this.infoform.get('email').value, this.infoform.get('department').value).subscribe((data) => {
      this.subscrip = this.userService.getUser(this.authService.getToken()).subscribe((data) => {
        let data2 = JSON.stringify(data);
        this.user = JSON.parse(data2);
      });
    });
  }

  onSubmitPassform() {
    this.isPasswordsNotMatching = false;
    this.isOldPasswordWrong = false;
    if (!(this.passform.get('newpassword').value == this.passform.get('newpasswordrepeat').value)) {
      this.isPassSaveButtonClicked = true;
      this.isPasswordsNotMatching = true;
      return;
    }
    if (this.passform.invalid) {
      this.isPassSaveButtonClicked = true;
      return;
    }
    this.subscription = this.authService.login(this.user.email, this.passform.get('oldpassword').value)
      .pipe(first())
      .subscribe(data => {
        if (data == null) {
          this.isOldPasswordWrong = true;
        } else {
          this.subscrip = this.userService.changePassword(this.passform.get('oldpassword').value, this.passform.get('newpassword').value, this.user.token).subscribe((data) => {
            let data2 = JSON.stringify(data);
            this.response = JSON.parse(data2);
            this.passform.reset();
            setTimeout(() => {
              this.response.message = ''
            }, 3000);

          });
        }
      }, error => {
        this.isOldPasswordWrong = true;
      });
  }

  toggleFieldTextType(id: number) {
    if (id == 1) {
      this.fieldTextType1 = !this.fieldTextType1;
    } else if (id == 2) {
      this.fieldTextType2 = !this.fieldTextType2;
    } else {
      this.fieldTextType3 = !this.fieldTextType3;
    }
  }
}
