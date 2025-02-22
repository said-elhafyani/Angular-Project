import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  actions : Array<any> =[
    {title :"Home", route : "/admin/home",icon:"house"},
    {title :"Products", route : "/admin/products",icon:"search"},
    {title :"New Product", route : "/admin/newProduct",icon:"safe"},
  ];
  currentAction: any;

  constructor(public appStateService: AppStateService,
              public loadingService : LoadingService,
              private router:Router) {
   }

  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  logout() {
    this.appStateService.authState ={};
    this.router.navigateByUrl("/login");
  }

  login() {
    this.router.navigateByUrl("/login");
  }
}
