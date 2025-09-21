import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { FormsModule } from '@angular/forms';
import { Search } from './components/search/search';
import { Recommendations } from './components/recommendations/recommendations';
import { Orders } from './components/orders/orders';
import { Home } from './components/home/home';
import { Login } from './components/auth/login/login';
import { Signup } from './components/auth/signup/signup';
import { Navbar } from './components/navbar/navbar';
import { Contact } from './components/contact/contact';
import { RouterModule } from '@angular/router';
import { Order } from './services/order';
import { Details } from './components/details/details';

@NgModule({
  declarations: [
    App,
    Search,
    Recommendations,
    Orders,
    Home,
    Login,
    Signup,
    Navbar,
    Contact,
    Details,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'order', component: Order },
      { path: 'search', component: Search },
      { path: 'orders', component: Orders },
      { path: '', redirectTo: 'search', pathMatch: 'full' }
    ])
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
