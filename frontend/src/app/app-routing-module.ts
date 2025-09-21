import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Search } from './components/search/search';
import { Recommendations } from './components/recommendations/recommendations';
import { Orders } from './components/orders/orders';
import { Login } from './components/auth/login/login';
import { Signup } from './components/auth/signup/signup';
import { App } from './app';
import { Navbar } from './components/navbar/navbar';
import { Contact } from './components/contact/contact';
import { Order } from './services/order';
import { Details } from './components/details/details';

const routes: Routes = [
  { path: '', component: Signup },
  { path: 'login', component: Login },
  { path: 'app', component: Navbar,
    children:[
      { path: '', component: Home},
      { path: 'search', component: Search },
      { path: 'details', component: Details},
      { path: 'contact', component: Contact},
      { path: 'recommendations', component: Recommendations },
      { path: 'orders', component: Orders },
      { path: 'order', component: Order }
    ]
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
