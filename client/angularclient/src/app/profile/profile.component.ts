import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs";
import {first} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Usersocu} from "../classes/usersocu";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Response} from "../classes/response";


/**
 * Component used when navigating to /profile
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  /**
   * Url used when uploading a new profile picture
   */
  url: string | ArrayBuffer;
  /**
   * Url for the profile picture, default to start with
   */
  profilepictureurl = '../../../../assets/ProfilePictures/default.png';
  /**
   * The currently logged in user
   */
  user: Usersocu;
  /**
   * Formgroup for input fields for changing user information
   */
  infoform: FormGroup;
  /**
   * Formgroup for input fields for changing password
   */
  passform: FormGroup;
  /**
   * Boolean if the Save-button is clicked when trying to change the password
   */
  isPassSaveButtonClicked = false;
  /**
   * Boolean if the Save-button is clicked when trying to change the user information
   */
  isInfoSaveButtonClicked = false;
  /**
   * Boolean to see if the new password and the repeated new password are matching
   */
  isPasswordsNotMatching = false;
  /**
   * Boolean to see if the old password is wrong and therefore show an error message
   */
  isOldPasswordWrong = false;
  /**
   * Subscription to receive and send information to and from the backend
   */
  subscription: Subscription;
  /**
   * Subscription to receive and send information to and from the backend
   */
  subscrip: Subscription;
  /**
   * Response received from the backend with eventual error message regarding the change of password
   */
  response: Response;
  /**
   * Response received from the backend with eventual error message regarding the change of user information
   */
  infoResponse: Response;
  /**
   * Error message if the new uploaded profile picture is invalid
   */
  profilepicErrorMessage = "";
  /**
   * Boolean for toggling between showing and hiding password in password field for old password
   */
  fieldTextType1: boolean;
  /**
   * Boolean for toggling between showing and hiding password in password field for new password
   */
  fieldTextType2: boolean;
  /**
   * Boolean for toggling between showing and hiding password in password field for repeated new password
   */
  fieldTextType3: boolean;


  constructor(private userService: UserService,
              private authService: AuthService,
              private http: HttpClient,
              private formBuilder: FormBuilder) {
  }

  /**
   * Setup for the component
   * - Gets the user that is currently logged in
   */
  ngOnInit(): void {
    this.getLoggedInUser();
  }

  /**
   * Get the logged in user from the backend by providing the saved token from LocalStorage and set up the page by calling on the remaining methods in the component. The user is
   * logged out if the token is incorrect
   */
  getLoggedInUser() {
    this.subscription = this.userService.getUser(this.authService.getToken()).subscribe((data) => {
      let data2 = JSON.stringify(data);
      this.user = JSON.parse(data2);
      if (this.user) {
        if (this.user.id) {
          this.getProfilePicture(this.user.id);
        }
      }
      this.createPassform();
      this.createInfoform();
    }, error => {
      this.authService.logout();
    });
  }

  /**
   * Reads the file when uploading a new profile picture
   * @param event the source event
   */
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

  /**
   * Uploads the profile picture file to the backend to be saved. Displays an error message if the file is too large or in the wrong format
   * @param file
   */
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

  /**
   * Gets the url for the profile picture for a specific user
   * @param id the id of the user
   */
  getProfilePicture(id: number) {
    this.profilepictureurl = `../../../../assets/ProfilePictures/${id}.png`;
  }

  /**
   * Clicks a hidden button that is used to upload the file
   */
  triggerFileUpload() {
    let element: HTMLElement = document.getElementById('fileupload') as HTMLElement;
    element.click();
  }

  /**
   * Forwards the information to the backend that a user wants to delete its uploaded profile picture
   */
  removeProfilePicture() {
    this.profilepictureurl = `../../../../assets/ProfilePictures/${this.user.id}.png`;
    this.userService.removeProfilePicture(this.user.id);
    location.reload();
  }

  /**
   * Creates the form where the user can change its user information
   */
  createInfoform() {
    this.infoform = this.formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.pattern(/^[a-z ,.'-åäö]+$/i)]],
      email: [this.user.email, [Validators.required, Validators.email]],
      department: [this.user.department]
    });
  }

  /**
   * Creates the form where the user can change its password
   */
  createPassform() {
    this.passform = this.formBuilder.group({
      oldpassword: ['', Validators.required],
      newpassword: ['', Validators.required],
      newpasswordrepeat: ['', Validators.required]
    });
  }

  /**
   * Forwards the new information to the backend when a user changes its user information, shows error message if any input is invalid
   */
  onSubmitInfoform() {
    if(this.infoform.get('name').value=='' || !this.infoform.get('name').value.replace(/\s/g, '').length){
      this.infoResponse = new Response();
      this.infoResponse.status = 'ERROR';
      this.infoResponse.message = 'Du måste fylla i ett namn.';
      this.isInfoSaveButtonClicked = true;
      this.createInfoform();
      return;
    }
    if(this.infoform.get('email').value=='' || !this.infoform.get('email').value.replace(/\s/g, '').length) {
      this.infoResponse = new Response();
      this.infoResponse.status = 'ERROR';
      this.infoResponse.message = 'Du måste fylla i en mailadress.';
      this.isInfoSaveButtonClicked = true;
      this.createInfoform();
      return;
    }
    if (this.infoform.invalid) {
      this.isInfoSaveButtonClicked = true;
      return;
    }
    this.subscription = this.userService.updateUserInformation(this.user.token, this.infoform.get('name').value, this.infoform.get('email').value, this.infoform.get('department').value).subscribe((data) => {
      let response: Response = data;
      this.infoResponse = data;
      if (response.status == 'ERROR') {
        this.createInfoform();
      }
      this.subscrip = this.userService.getUser(this.authService.getToken()).subscribe((data) => {
        let data2 = JSON.stringify(data);
        this.user = JSON.parse(data2);
      });
    });
  }

  /**
   * Forwards the new information to the backend when a user changes its password, shows error message if any input is invalid
   */
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

  /**
   * Toggle between showing and hiding password in password field
   * @param id the id of the input field
   */
  toggleFieldTextType(id: number) {
    if (id == 1) {
      this.fieldTextType1 = !this.fieldTextType1;
    } else if (id == 2) {
      this.fieldTextType2 = !this.fieldTextType2;
    } else {
      this.fieldTextType3 = !this.fieldTextType3;
    }
  }

  /**
   * Shows a default profile picture if an url is not found for the profile picture
   * @param event the source event
   */
  errorHandler(event) {
    event.target.src = `../../../../assets/ProfilePictures/default.png`;
  }
}
