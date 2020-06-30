import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { UserService } from "./../services/user.service";
import { User } from "../models/user";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  userList: User[];
  userForm: FormGroup;
  constructor(
    private userService: UserService,
    private router: Router,
    public fb: FormBuilder
  ) {}

  ngOnInit() {
    localStorage.clear();
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
      $password: [""],
    });
  }

  formSubmit() {
    if (!this.userForm.valid) {
      return false;
    } else {
      this.userList.forEach((user: any) => {
        let username = user.username == this.userForm.value.$username;
        let password = user.password == this.userForm.value.$password;
        console.log(username);
        console.log(password);
        if (username && password) {
          localStorage.setItem(
            "currentuser",
            JSON.stringify(this.userForm.value)
          );
          return (window.location.href = "/chat");
        }
      });
    }
  }
}
