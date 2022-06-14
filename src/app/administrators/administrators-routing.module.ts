import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './components/list';
import { AddEditComponent } from './components/add-edit';
//import { EditLoginComponent } from './components/edit-login';
//import { EditPasswordComponent } from './components/edit-password';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'add', component: AddEditComponent },
    { path: 'edit/:id', component: AddEditComponent },
    //{ path: 'edit-login/:id', component: EditLoginComponent },
    //{ path: 'edit-password/:id', component: EditPasswordComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministratorsRoutingModule { }