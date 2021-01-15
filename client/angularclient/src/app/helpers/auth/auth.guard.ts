import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    const currentuser = this.authService.getUserValue();
    if(currentuser){
      if (currentuser.token) {
        return true;
      }
    }


    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
