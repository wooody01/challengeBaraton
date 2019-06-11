import { Component, OnInit, Input } from "@angular/core";
import { product } from "../../models/product";
import { StoreService } from '../../services/store.service';

import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "card-product",
  templateUrl: "./card-product.component.html",
  styleUrls: ["./card-product.component.scss"]
})
export class CardProductComponent implements OnInit {
  @Input("item") product: product;
  image: string;

  constructor(private _s:StoreService) {
    this.image =  `https://picsum.photos/id/${Math.round(Math.random()*1000)}/253/240`;
  }

  ngOnInit() {}

  notFound(i){
    i.image = "../../../assets/images/not_found.png";
  }

  addToKart(){ 
    var a = this.product.price.split("$")[1].split(",");
    var price = parseInt(a[0] + a[1]);
    this._s.setProductInKart(this.product.name,this.image,price, this.product.id);

    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 3000
    });
    
    Toast.fire({
      type: 'success',
      title: this.product.name +' ha sido agregado al carrito'
    })
  }

}
