import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor(private router: Router,
              private authService: AuthService) {
  }

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
