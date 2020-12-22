import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {LoginService} from "../services/login.service";
import {Observable, of, Subscription} from "rxjs";
import {catchError, first, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Usersocu} from "../classes/usersocu";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  url: string | ArrayBuffer;
  url2: string;
  user: Usersocu;
  infoform: FormGroup;
  passform: FormGroup;
  isPassSaveButtonClicked = false;
  isInfoSaveButtonClicked = false;
  isPasswordsNotMatching = false;
  isOldPasswordWrong = false;
  subscription: Subscription;
  subscrip: Subscription;


  constructor(private userService: UserService,
              private loginService: LoginService,
              private http: HttpClient,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getLoggedInUser();
    this.getProfilePicture(this.loginService.getUserValue().id);
    this.createInfoform();
    this.createPassform()

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

  createInfoform() {
    this.infoform = this.formBuilder.group({
      name: [this.user.name],
      email: [this.user.email],
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

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  onSubmitInfoform() {
    if (this.infoform.invalid) {
      this.isInfoSaveButtonClicked = true;
      console.log('error');
      return;
    }
    console.log('submit');
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
    this.subscription = this.loginService.authenticate(this.user.email, this.passform.get('oldpassword').value)
      .pipe(first())
      .subscribe(data => {
        if (data == null) {
          this.isOldPasswordWrong = true;
        } else {
          this.subscrip = this.userService.changePassword(this.passform.get('oldpassword').value, this.passform.get('newpassword').value, this.user.id).subscribe((data) => {
              console.log(data)
            });
        }
      });
  }
}
