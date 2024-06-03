import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { DetalheProdutoComponent } from "./detalhe-produto.component";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
      path:'',
      component: DetalheProdutoComponent     
    },
];
  
@NgModule ({
    declarations:[
        DetalheProdutoComponent
    ],
    imports:[
        SharedModule,
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetalheProdutoModule {}