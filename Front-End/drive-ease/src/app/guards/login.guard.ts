import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService:AuthService,
              private messageService:MessageService,
              private router:Router){

  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot)
              : Observable<boolean | UrlTree>
              | Promise<boolean | UrlTree>
              | boolean | UrlTree {

      if(this.authService.isAuthenticated()) {
        return true;
      }
      else {
        this.router.navigate(["login"])
          this.messageService.add({severity:'info', summary: 'Info', detail: "You must be login to system."});
          return false;
      }

  }

}
