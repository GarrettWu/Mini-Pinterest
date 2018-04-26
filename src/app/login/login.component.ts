import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import { NgForm } from '@angular/forms';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  username: string;
  password: string;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(private registry: MatIconRegistry, private userService: UserService, private router: Router) {
  }

  login() {
    this.userService.findUserbyId(this.username)
      .subscribe(
        (user: any) => {
          console.log(user);
          if (isNullOrUndefined(user)) {
            alert(this.errorMsg);
          } else {
            this.router.navigate(['/masonry/' + this.username]);
          }
        });
  }
  ngOnInit() {

  }

}
