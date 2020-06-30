import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { UserService } from "./../services/user.service";
import { User } from "../models/user";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
})
export class SignupPage implements OnInit {
  userList: User[];
  userForm: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    this.userService
      .getUsers()
      .snapshotChanges()
      .subscribe((user) => {
        this.userList = [];
        user.forEach((element) => {
          let x = element.payload.toJSON();
          x["key"] = element.key;
          this.userList.push(x as User);
        });
      });
    this.userForm = this.fb.group({
      $username: [""],
      $email: [""],
      $password: [""],
    });
  }

  formSubmit() {
    console.log(this.userForm.value);
    if (!this.userForm.valid) {
      return false;
    } else {
      this.userService
        .logIn(this.userForm.value)
        .then((res) => {
          console.log(res);
          this.userForm.reset();
          this.router.navigate(["/chat"]);
        })
        .catch((error) => console.log(error));
    }
  }
}
