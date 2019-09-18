import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user.model.mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User = null;

  constructor(
    public router: Router) { }

  ngOnInit() {
  }

  signout() {
    this.user = null;
  }
}
