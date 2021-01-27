import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../services/auth.service";

/**
 * Guard that checks authorization
 */
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor(private router: Router,
              private authService: AuthService) {
  }

  /**
   * Checks if the user has Usertype ADMIN and has the authority to visit /admin, forwards user to /error if not
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const user = this.authService.getUserValue();
    if (user.usertype === 900) {
      return true;
    }
    this.router.navigate(['/error'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
