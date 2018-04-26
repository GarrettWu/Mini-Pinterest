import {Component, OnInit} from '@angular/core';
import {User} from '../model/user';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {UserService} from '../service/user.service';
import { WOW } from 'wowjs/dist/wow.min';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: any;
  interest0: boolean;
  interest1: boolean;
  interest2: boolean;
  interest3: boolean;
  interest4: boolean;
  interest = [];
  password: string;
  vpassword: string;
  username: string;
  email: string;
  errorFlag1: boolean;
  errorFlag: boolean;
  errorMsg = 'This username has been used !';
  errorMsg1 = 'The two passwords do not match. Please re-enter.' ;

  constructor(private snackBar: MatSnackBar,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
  }

  createInterestList() {
    if (this.interest0 === true) {
      this.interest.push('cs_theory');
    }
    if (this.interest1 === true) {
      this.interest.push('food');
    }
    if (this.interest2 === true) {
      this.interest.push('women_fashion');
    }
    if (this.interest3 === true) {
      this.interest.push('men_fashion');
    }
    if (this.interest4 === true) {
      this.interest.push('photography');
    }
  }
  register() {
    if (this.vpassword !== this.password) {
      this.errorFlag1 = true;
      alert(this.errorMsg1);
    }
    this.createInterestList();
    this.userService.createUser({'username': this.username, 'password': this.password, 'categories': this.interest})
      .subscribe(
        (user: any) => {
          this.router.navigate(['/masonry/' + this.username]);
        });
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
}
