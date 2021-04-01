import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
//import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  { path: '',loadChildren: './home/home/home.module#HomeModule'},
  { path: 'authentication',loadChildren: './authentication/authentication.module#AuthenticationModule'},
  { path: 'about',loadChildren: './extra/extra.module#ExtraModule'},
  { path: 'search',loadChildren: './search/search.module#SearchModule'},
  { path: 'account',loadChildren: './account/account.module#AccountModule',canActivate:[AuthGuard]},
  { path: 'profile',loadChildren: './profile/profile.module#ProfileModule',canActivate:[AuthGuard]},
  { path: 'news',loadChildren: './news/news.module#NewsModule'},
  { path: 'affiliate',loadChildren: './affiliate/affiliate.module#AffiliateModule'},
  { path: 'customer',loadChildren: './customer/customer.module#CustomerModule',canActivate:[AuthGuard]}//,
  // { path: 'Aflliate.equityfinderpro.com', redirectTo: 'affiliate/customer', pathMatch: 'full' },//,
  //{ path: '**', component: NotFoundComponent}
  //{ path: '**', resolve: { path: PathResolveService }, component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Add options right here
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
