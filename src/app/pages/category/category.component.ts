import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { map } from "rxjs/operators";
import { StoreService } from "../../services/store.service";
import { product } from "src/app/models/product";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  
  products: product[];
  productsInitial: product[];
  productsFilters: product[];
  spinner: boolean;

  constructor(private _ar: ActivatedRoute, private _s: StoreService) {
    _ar.params.subscribe((res: any) => {
      this.getProducts(res.category);
    });
  }

  ngOnInit() {}

  getProducts(id) {
    this._s.getProducts().then(res => {
      this.products = res.filter(
        (res: any) => {
          return res.sublevel_id==id;
        });
        
        this.products = this.products.sort((a, b) => {
          return a.available === b.available ? 0 : a.available ? -1 : 1;
        });

      this.productsInitial = JSON.parse(JSON.stringify(this.products));
    });
  }


  config($event) {

    this.productsFilters = [];
    this.products = JSON.parse(JSON.stringify(this.productsInitial));

    if ($event.type == 1) {
      if ($event.mode == 1) {
        this.productsFilters = this.products.sort((a, b) => {
          return a.available == b.available ? 0 : a.available ? -1 : 1;
        });
      } else {
        this.products.forEach(res => {
          if (res.available) this.productsFilters.push(res);
        });
      }
    } else if ($event.type == 2) {
      if ($event.min != undefined && $event.max != undefined) {
        this.products.forEach(res => {
          var a = res.price.split("$")[1].split(",");
          var price = parseInt(a[0] + a[1]);
          if (price > $event.min && price < $event.max)
            this.productsFilters.push(res);
        });
      } else {
        this.productsFilters = this.products.sort((a, b) => {
          var pricea = a.price.split("$")[1].split(",");
          var priceb = b.price.split("$")[1].split(",");
          return (
            parseInt(pricea[0] + pricea[1]) - parseInt(priceb[0] + priceb[1])
          );
        });
      }
    } else if ($event.type == 3) {
      if ($event.min != undefined && $event.max != undefined) {
        this.products.forEach(res => {
          if (res.quantity > $event.min && res.quantity < $event.max) {
            this.productsFilters.push(res);
          }
        });
      } else {
        this.productsFilters = this.products.sort((a, b) => {
          return a.quantity - b.quantity;
        });
      }
    }

    this.products = this.productsFilters;
  }


}
