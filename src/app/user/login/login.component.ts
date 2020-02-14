import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { ToastrService } from "ngx-toastr";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private cookie: CookieService
  ) {}

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  createFormControl() {
    this.email = new FormControl("", [Validators.required, Validators.email]);
    this.password = new FormControl("", Validators.required);
  }

  createForm() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm);
      this.userService.loginFunction(this.loginForm.value).subscribe(
        next => {
          // if response status meets 200 then success
          if (next.status === 200) {
            this.cookie.set(
              "receiverName",
              `${next.data.userDetails.firstName} ${next.data.userDetails.lastName}`
            );
            this.cookie.set("receiverId", next.data.userDetails.userId);
            this.cookie.set("authToken", next.data.authToken);
            this.userService.setInfoInLocalStorage(next.data.userDetails);
            this.toastr.info(next.message, `success`, { timeOut: 1500 });
            setTimeout(() => {
              this.router.navigate(["/chat"]);
            }, 1500);
          } else {
            this.toastr.error(next.message);
          }
          // console.log(next);
        },
        error => {
          this.toastr.error(error.message);
        }
      );
    }
  }
  // go to sign up
  goToSignUp() {
    this.router.navigate(["/signup"]);
  }
}
