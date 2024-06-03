import { SharedModule } from './../shared/shared.module';
import { NgModule } from "@angular/core";
import { ApresentacaoComponent } from "./apresentacao.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    {
        path:'',
        component: ApresentacaoComponent
    }
];

@NgModule({
    declarations:[
        ApresentacaoComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class ApresentacaoModule {}