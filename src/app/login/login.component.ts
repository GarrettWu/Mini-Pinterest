import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import { NgForm } from '@angular/forms';

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

  constructor(private registry: MatIconRegistry) {
  }

  ngOnInit() {

  }

}
