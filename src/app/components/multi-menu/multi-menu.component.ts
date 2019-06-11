import {
  Component,
  Input,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterContentInit,
  Output,
  EventEmitter
} from "@angular/core";
import { Router } from "@angular/router";

import { categories, sublevels } from "../../models/categories";

@Component({
  selector: "multi-menu",
  templateUrl: "./multi-menu.component.html",
  styleUrls: ["./multi-menu.component.scss"]
})
export class MultiMenuComponent implements AfterContentInit {
  @Input("items") items: categories[];
  @Output("close") close = new EventEmitter();
  @ViewChild("menu", null) menu: ElementRef;

  lvl: number;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.generateMenu(this.items);
    }, 100);
  }

  generateMenu(items) {
    console.log(this.menu.nativeElement);

    items.forEach(item => {
      const div = this.renderer.createElement("div");
      const span = this.renderer.createElement("span");
      const text = this.renderer.createText(item.name);
      this.renderer.appendChild(span, text);
      this.renderer.addClass(span, "c-p");
      this.renderer.listen(span, "click", () => this.routeToCategory(item.name, item.id));
      this.renderer.appendChild(div, span);

      var nameMenu = `menu${item.id}`;
      this.renderer.setAttribute(div, "id", 'menu1');
      this.renderer.addClass(div, "d-block");
      this.renderer.appendChild(this.menu.nativeElement, div);

      if (item.sublevels != undefined) {
        this.subMenu(div, item.sublevels, nameMenu);
      }
    });
  }

  subMenu(el, sublvl: sublevels[], nameMenu: string) {
    const div = this.renderer.createElement("div");
    this.renderer.addClass(div, "submenu");
    this.renderer.appendChild(el, div);

    sublvl.forEach(item => {
      const submenu = this.renderer.createElement("div"); 

      const span = this.renderer.createElement("span");
      const text = this.renderer.createText(item.name);
      this.renderer.appendChild(span, text);
      this.renderer.addClass(span, "c-p");
      this.renderer.listen(span, "click", () => this.routeToCategory(item.name, item.id));
      this.renderer.appendChild(submenu, span);

      var nameMenu = `submenu${item.id}`;
      this.renderer.addClass(submenu, "d-block");
      this.renderer.appendChild(div, submenu);

      if (item.sublevels != undefined) {
        this.subMenu(submenu, item.sublevels, nameMenu);
      }
    });
  }

  routeToCategory(name, id) {
    this.close.emit(true);
    this.router.navigate(["category", id]);
  }
}
