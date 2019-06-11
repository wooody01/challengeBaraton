import { Component, OnInit } from "@angular/core";
import { StoreService } from "../../services/store.service";

import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "shopping-kart",
  templateUrl: "./shopping-kart.component.html",
  styleUrls: ["./shopping-kart.component.scss"]
})
export class ShoppingKartComponent implements OnInit {

  products: any;
  total: number = 0;

  editId: string = '';

  constructor(private _s: StoreService) {
    this.getProducts();
  }

  ngOnInit() {}

  getProducts() {
    this.total = 0;
    this.products = this._s.getProductInKart();
    this.products.forEach(element => {
      this.total += element.price * element.quality;
    });
  }

  pay() {
    Swal.fire({
      title: "Próximamente",
      text: "Esta funcionalidad está en construcción",
      type: "info",
      confirmButtonText: "Entendido"
    });
  }

  delete(id) {
    this._s.deleteProductInKart(id);
    this.getProducts();
  }

  add(id) {
    this._s.addProductInKart(id);
    this.editId =id;
    this.getProducts();
  }

  remove(id) {
    this._s.removeProductInKart(id);
    this.editId =id;
    this.getProducts();
  }
}
