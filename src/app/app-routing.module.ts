import { NgModule } from "@angular/core";

import { Routes, RouterModule } from "@angular/router";

import { CategoryComponent } from "./pages/category/category.component";
import { ProductsComponent } from "./pages/products/products.component";

const routes: Routes = [
  {
    path: "category/:category",
    component: CategoryComponent
  },
  {
    path: "products",
    component: ProductsComponent
  },
  {
    path: "",
    redirectTo: "products",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
