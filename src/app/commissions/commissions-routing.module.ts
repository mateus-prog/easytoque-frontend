import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './components/list';
//import { VisualizeComponent } from './components/visualize';

const routes: Routes = [
    { path: '', component: ListComponent },
    //{ path: 'visualize/:id', component: VisualizeComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CommissionsRoutingModule { }