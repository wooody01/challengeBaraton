import { Component, OnInit } from "@angular/core";

import { StoreService } from "../../services/store.service";

import { product } from "../../models/product";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  products: product[];
  productsInitial: product[];
  productsFilters: product[];
  spinner: boolean;

  constructor(private _s: StoreService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.spinner = true;
    this._s.getProducts().then(res => {
      this.products = res.sort((a, b) => {
        return a.available === b.available ? 0 : a.available ? -1 : 1;
      });

      this.productsInitial = JSON.parse(JSON.stringify(this.products));
      this.spinner = false;
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
