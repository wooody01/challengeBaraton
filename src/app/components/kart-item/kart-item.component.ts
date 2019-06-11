import { EventEmitter } from '@angular/core';
import { Component, OnInit, Input, Output } from '@angular/core';

import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'kart-item',
  templateUrl: './kart-item.component.html',
  styleUrls: ['./kart-item.component.scss']
})
export class KartItemComponent implements OnInit{

  @Input('item') item:any;
  @Input('edit') edit:string;
  @Output('delete') deleteItem = new EventEmitter();
  @Output('add') addItem = new EventEmitter();
  @Output('remove') removeItem = new EventEmitter();

  editMode:boolean;

  constructor() { }

  ngOnInit(): void {
    if(this.item.id === this.edit){
      this.editMode= true;
    }
    this.editMode= true;
    
  }

  delete(){
    this.deleteItem.emit(this.item.id);
  }

  add(){
    this.addItem.emit(this.item.id);
  }

  remove(){
    this.removeItem.emit(this.item.id);
  }
}
