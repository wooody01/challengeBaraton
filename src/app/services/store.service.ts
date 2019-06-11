import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map, filter } from "rxjs/operators";
import { sublevels } from "../models/categories";
import { product } from "../models/product";

@Injectable({
  providedIn: "root"
})
export class StoreService {
  constructor(private http: HttpClient) {}

  getCategories(): Promise<any> {
    return this.http.get("../../assets/categories.json").toPromise();
  }

  getProducts(): Promise<any> {
    return this.http
      .get("../../assets/products.json")
      .pipe(map((res: any) => res.products))
      .toPromise();
  }

  getSublvlsbyCategories(id: number): Promise<any> {
    return this.http
      .get("../../assets/categories.json")
      .pipe(map(res => res[id]))
      .toPromise();
  }

  getProductInKart() {
    return  JSON.parse(localStorage.getItem("products"));
  }

  deleteProductInKart(id) {
    var products: any = [];
    var newproducts: any = [];
    products = JSON.parse(localStorage.getItem("products"));

    products.forEach(element => {
      if (element.id != id) {
        newproducts.push(element);
      }
    });

    localStorage.setItem("products", JSON.stringify(newproducts));
  }

  addProductInKart(id){
    var products: any = [];
    products = JSON.parse(localStorage.getItem("products"));

    products.forEach(element => {
      if (element.id == id) {
        element.quality++;
      }
    });

    localStorage.setItem("products", JSON.stringify(products));
  }

  removeProductInKart(id){
    var products: any = [];
    products = JSON.parse(localStorage.getItem("products"));

    products.forEach(element => {
      if (element.id == id) {
        element.quality--;
      }
    });

    localStorage.setItem("products", JSON.stringify(products));
  }

  setProductInKart(
    productName: string,
    image: string,
    price: number,
    id: string
  ) {
    var products: any = [];
    var flag: boolean = false;

    if (localStorage.getItem("products") != null) {
      products = JSON.parse(localStorage.getItem("products"));

      products.forEach(element => {
        if (element.id === id) {
          element.quality++;
          flag = true;
          localStorage.setItem("products", JSON.stringify(products));
        }
      });

      if (!flag) {
        var product = {
          name: productName,
          image: image,
          price: price,
          quality: 1,
          id:id
        };

        products.push(product);
        localStorage.setItem("products", JSON.stringify(products));
      }
    } else {
      var product = {
        name: productName,
        image: image,
        price: price,
        quality: 1,
        id: id
      };
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));
    }
  }
}
