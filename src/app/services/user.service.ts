import { Injectable } from "@angular/core";
import { User } from "../models/user";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";

@Injectable({
  providedIn: "root",
})
export class UserService {
  userList: AngularFireList<any>;
  userRef: AngularFireObject<any>;
  selectedUser: User = new User();

  constructor(private firebase: AngularFireDatabase) {}

  getProfile($key: string) {
    this.userRef = this.firebase.object("/users/" + $key);
    return this.userRef;
  }
  getUsers() {
    return (this.userList = this.firebase.list("users"));
  }

  signUp(user: User) {
    return this.userList.push({
      username: user.$username,
      email: user.$email,
      password: user.$password,
    });
  }
  logIn(user: User) {
    return this.userList.push({
      username: user.$username,
      email: user.$email,
      password: user.$password,
    });
  }
  updateProfile(user: User) {
    this.userList.update(user.$key, {
      username: user.$username,
      email: user.$email,
      password: user.$password,
    });
  }
  deleteProfile($key: string) {
    this.userList.remove($key);
  }
}
