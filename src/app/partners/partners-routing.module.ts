import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './components/list';
import { AddEditComponent } from './components/add-edit';
import { CheckCnpjComponent } from './components/check-cnpj';
import { MyAccountComponent } from './components/my-account';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'check-cnpj', component: CheckCnpjComponent },
    { path: 'add/:cnpj', component: AddEditComponent },
    { path: 'edit/:id', component: AddEditComponent },
    { path: 'myAccount', component: MyAccountComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PartnersRoutingModule { }