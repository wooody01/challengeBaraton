import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: "filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"]
})
export class FilterComponent implements OnInit {
  @Output("config") configMode = new EventEmitter();

  min: number;
  max: number;
  mode: number = 1;
  type: number = 1;

  constructor() {}

  ngOnInit() {}

  filterMode() {
    var config: any = {}

    if(this.min != undefined && this.max != undefined){
      if (this.min > this.max) {
        Swal.fire({
          title: "¡Error!",
          text: "El Minimo es Mayor que el Maximo",
          type: "error",
          confirmButtonText: "Entendido"
        });
      }else{
        if(this.type===1){
          config = {
            mode: this.mode,
            type: this.type,
          };
        }else{
          config = {
            mode: this.mode,
            type: this.type,
            min: this.min,
            max: this.max
          };
        }
      }
    }else{
      config = {
        mode: this.mode,
        type: this.type,
      };
    }
      this.configMode.emit(config);   
  }

}
