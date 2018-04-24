import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {NgForm} from "@angular/forms";
import {MatSnackBar} from '@angular/material';
import {UserService} from '../service/user.service';
import { WOW } from 'wowjs/dist/wow.min';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: any;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  vpassword: string;
  errorFlag1: boolean;
  errorFlag: boolean;
  errorMsg = 'Username has been used!';
  errorMsg1 = 'The two passwords do not match. Please re-enter!' ;
  hide = true;
  interest0: boolean;
  interest1: boolean;
  interest2: boolean;
  interest3: boolean;
  interest4: boolean;


  constructor(private snackBar: MatSnackBar, private userService: UserService) {
  }

  ngOnInit() {
  }

  // onSubmit() {
  //   if (this.user.name === undefined || this.user.name === '') {
  //     this.snackBar.open('用户名不能为空！', '确定', {
  //       duration: 2000,
  //     });
  //     return;
  //   }
  //   this.userService.register(this.user).subscribe(jsonBean => {
  //     if (jsonBean.code === 1) {
  //       console.log('register success.');
  //     } else {
  //       console.log('register error=' + jsonBean.message);
  //     }
  //   });
  // }

  register() {
    // alert(this.username);
    this.user = {
      username : this.username,
      password : this.password
    };
    this.userService.createUser(this.user);
    // if (this.vpassword != this.password) {
    //   this.errorFlag1 = true;
    //   this.errorMsg1;
    //   this.router.navigate(['/register'])
    // } else {
    //   this.userService.register(this.username, this.password)
    //     .subscribe((user) => {
    //       this.sharedService.user = user;
    //       this.router.navigate(['/user'])
    //     });
    // }
  }
}
