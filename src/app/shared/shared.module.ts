import { NgModule } from "@angular/core";
import { NavbarComponent } from "./navbar/navbar.component";

import { MatIconModule, MatProgressSpinnerModule } from "@angular/material";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { MultiMenuComponent } from "../components/multi-menu/multi-menu.component";
import { FilterComponent } from "../components/filter/filter.component";
import { CardProductComponent } from "../components/card-product/card-product.component";
import { ShoppingKartComponent } from "../components/shopping-kart/shopping-kart.component";
import { KartItemComponent } from "../components/kart-item/kart-item.component";

@NgModule({
  declarations: [
    NavbarComponent,
    MultiMenuComponent,
    CardProductComponent,
    FilterComponent,
    ShoppingKartComponent,
    KartItemComponent,
  ],
  exports: [
    NavbarComponent,
    CardProductComponent,
    ShoppingKartComponent,
    FilterComponent,
    KartItemComponent,
  ],
  entryComponents: [
    NavbarComponent,
    MultiMenuComponent,
    CardProductComponent,
    ShoppingKartComponent,
    KartItemComponent,
    FilterComponent
  ],
  imports: [MatIconModule, MatProgressSpinnerModule, CommonModule, FormsModule],
  providers: []
})
export class SharedModule {}
