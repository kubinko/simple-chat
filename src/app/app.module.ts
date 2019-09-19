import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { QuotingService } from './services/quoting.service';

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      ChatComponent,
      LoginComponent
   ],
   imports: [
      AppMaterialModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      BrowserModule,
      FormsModule,
      HttpClient,
      ReactiveFormsModule
   ],
   providers: [
     QuotingService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
