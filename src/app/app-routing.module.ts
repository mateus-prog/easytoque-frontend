import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatedUserGuard } from '../service/authentication/authenticated-user.guard';

import { EditBankDataComponent } from 'src/app/partners/components/edit-bank-data';
import { LoginComponent } from 'src/app/login/components/login';
import { ChangePasswordComponent } from 'src/app/login/components/change-password';

const administratorsModule = () => import('src/app/administrators/administrators.module').then(x => x.AdministratorsModule);
const partnersModule = () => import('src/app/partners/partners.module').then(x => x.PartnersModule);
const logsModule = () => import('src/app/logs/logs.module').then(x => x.LogsModule);
const requestsModule = () => import('src/app/requests/requests.module').then(x => x.RequestsModule);

const routes: Routes = [
  { path: 'administrators', loadChildren: administratorsModule, canActivate: [AuthenticatedUserGuard] },
  { path: 'partners', loadChildren: partnersModule, canActivate: [AuthenticatedUserGuard] },
  { path: 'partners/edit-bank-data/:id', component: EditBankDataComponent },
  { path: 'logs', loadChildren: logsModule, canActivate: [AuthenticatedUserGuard] },
  { path: 'requests', loadChildren: requestsModule, canActivate: [AuthenticatedUserGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'login/changePassword', component: ChangePasswordComponent, canActivate: [AuthenticatedUserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
