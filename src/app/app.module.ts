import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AuthGuard } from './guards/auth.guard';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'; 
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent } from './components/overview/overview.component';
import { StreamComponent } from './components/stream/stream.component';
import { ErrorComponent } from './components/error/error.component';
import { HeadComponent } from './components/head/head.component';
import { ChatComponent } from './components/chat/chat.component';
import { PlayerComponent } from './components/player/player.component';
import { AuthenticationService } from './services/auth.service';
import { UserService } from './services/user.service';
import { DataService } from './services/data.service';
import { SearchService } from './services/search.service';

const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OverviewComponent,
    StreamComponent,
    ErrorComponent,
    HeadComponent,
    ChatComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [AuthGuard, AuthenticationService, UserService, DataService,
    SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
