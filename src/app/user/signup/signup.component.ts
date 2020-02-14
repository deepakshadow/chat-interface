import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../user.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  mobileNumber: FormControl;
  password: FormControl;
  apiKey: FormControl;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  createFormControl() {
    this.firstName = new FormControl("", Validators.required);
    this.lastName = new FormControl("", Validators.required);
    this.email = new FormControl("", [Validators.required, Validators.email]);
    this.mobileNumber = new FormControl(null, [
      Validators.required,
      Validators.maxLength(10)
    ]);
    this.password = new FormControl("", Validators.required);
    this.apiKey = new FormControl("", Validators.required);
  }

  createForm() {
    this.signUpForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      mobileNumber: this.mobileNumber,
      password: this.password,
      apiKey: this.apiKey
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm);
      this.userService.signUpFunction(this.signUpForm.value).subscribe(
        next => {
          console.log(next);
          // if response status 200 then success
          if (next.status === 200) {
            this.toastr.info(next.message, `success`, {timeOut: 1900})
            setTimeout(() => {
              this.router.navigate(["/login"]);
            }, 2000);
          } else {
            this.toastr.error(next.message);
          }
        },
        error => {
          this.toastr.error(`some unknown error occurred!`);
          // console.log(error.message);

        }
      );
    }
  }
}
