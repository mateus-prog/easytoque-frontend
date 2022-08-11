import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticatedUserGuard } from '../service/authentication/authenticated-user.guard';

import { EditBankDataComponent } from 'src/app/partners/components/edit-bank-data';
import { LoginComponent } from 'src/app/login/components/login';
import { ChangePasswordComponent } from 'src/app/login/components/change-password';
import { ForgotPasswordComponent } from 'src/app/login/components/forgot-password';

import { AddLogoComponent } from 'src/app/logos/components/add-logo.component';

const administratorsModule = () => import('src/app/administrators/administrators.module').then((x) => x.AdministratorsModule);
const partnersModule = () => import('src/app/partners/partners.module').then((x) => x.PartnersModule);
const logsModule = () => import('src/app/logs/logs.module').then((x) => x.LogsModule);
const requestsModule = () => import('src/app/requests/requests.module').then((x) => x.RequestsModule);
const commissionsModule = () => import('src/app/commissions/commissions.module').then((x) => x.CommissionsModule);
const salesModule = () => import('src/app/sales/sales.module').then((x) => x.SalesModule);
const withdrawModule = () => import('src/app/withdraw/withdraw.module').then((x) => x.WithdrawModule);

const routes: Routes = [
  { path: 'administrators', loadChildren: administratorsModule, canActivate: [AuthenticatedUserGuard], },
  { path: 'partners', loadChildren: partnersModule, canActivate: [AuthenticatedUserGuard], },
  { path: 'partners/edit-bank-data/:id', component: EditBankDataComponent },
  { path: 'logs', loadChildren: logsModule, canActivate: [AuthenticatedUserGuard], },
  { path: 'requests', loadChildren: requestsModule, canActivate: [AuthenticatedUserGuard], },
  { path: 'commissions', loadChildren: commissionsModule, canActivate: [AuthenticatedUserGuard], },
  { path: 'sales', loadChildren: salesModule, canActivate: [AuthenticatedUserGuard], },
  { path: 'withdraw', loadChildren: withdrawModule, canActivate: [AuthenticatedUserGuard], },
  { path: 'addLogo', component: AddLogoComponent, canActivate: [AuthenticatedUserGuard], },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/forgotPassword', component: ForgotPasswordComponent },
  { path: 'login/changePassword', component: ChangePasswordComponent, canActivate: [AuthenticatedUserGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
