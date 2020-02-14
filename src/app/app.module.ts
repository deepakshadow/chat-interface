import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserModule } from "./user/user.module";
import { ChatModule } from "./chat/chat.module";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "./user/user.service";
import { SocketService } from "./socket.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserModule,
    ChatModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 3000, progressBar: true })
  ],
  providers: [CookieService, UserService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule {}
