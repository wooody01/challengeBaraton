import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  appear:boolean;

  constructor() {
    window.addEventListener('scroll',()=>{
      if(window.scrollY > 240){
        this.appear=true;
      }else{
        this.appear=false;
      }      
    })

  }

  goup(){
    window.scrollTo(0, 0);
  }
}
