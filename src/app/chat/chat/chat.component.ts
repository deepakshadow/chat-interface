import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Router } from '@angular/router';
import { SocketService } from 'src/app/socket.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {

  userDisconnected: boolean;
  userList: any = [];
  authToken: string = '';
  userInfo: any;
 
  constructor(private userService: UserService, private cookie: CookieService, private router: Router, private socketService: SocketService) {}

  ngOnInit() {
    this.userInfo = this.userService.getUserInfoFromLocalStorage();
    this.authToken = this.cookie.get('authToken');
    this.checkStatus();
    this.verifyUserInformation();
  }

  // checks status weather user is available or not
  checkStatus = () => {
    if (
      this.cookie.get("authToken") === null ||
      this.cookie.get("authToken") === undefined ||
      this.cookie.get("authToken") === ""
    ) {
      // redirect to login page
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  };
  
  // verify user information
  verifyUserInformation = () => {
    this.socketService.verifyUser().subscribe((data) => {
      console.log(data);
      this.userDisconnected = false;
      this.socketService.setUser(this.authToken);
      this.getOnlineUsersList();
    }, error => {
      console.log(error.message);
    })
  }

  // get online users list
  getOnlineUsersList = () => {
    this.socketService.onlineUserList().subscribe((userList) => {
      for (let index in userList) {
        let temp = {userId: index, name: userList[index], unread: 0, chatting: false};
        this.userList.push(temp);
      }
      console.log(this.userList);
    })
  }
}
