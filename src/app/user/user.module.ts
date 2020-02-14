import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule} from '@angular/router';
import { HeaderComponent } from "./../header/header.component";

const route: Routes = [
  {path: 'signup', component: SignupComponent}
]

@NgModule({
  declarations: [LoginComponent, SignupComponent, HeaderComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(route)],
  exports: [RouterModule]
})
export class UserModule {}
