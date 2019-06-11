import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild
} from "@angular/core";

import { StoreService } from "../../services/store.service";

import { categories, sublevels } from "../../models/categories";
import { Router } from '@angular/router';

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {

  categories: categories[] = [];
  spinner: boolean;
  
  shopping: boolean = false;
  openCategories: boolean = true;

  constructor(private _c: StoreService, private _r:Router) {
    this.getCategories();
  }

  ngOnInit() {}

  getCategories() {
    this._c.getCategories().then((res: any) => {
      this.categories = res.categories;
    });
  }

  routerhome(){
    this.openCategories = true;
    this._r.navigate(['/products'])
  }

}
