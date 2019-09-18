import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './models/user.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User = null;
  quoteText$: BehaviorSubject<string> = new BehaviorSubject('');
  quoteAuthor$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    public router: Router) { }

  ngOnInit() {
    this.quoteText$.next('People say nothing is impossible, but I do nothing every day.');
    this.quoteAuthor$.next('A. A. Milne');
  }

  signin() {
    this.user = new User();
    this.user.displayName = 'Jozef Mrkvička';
    this.user.photoURL =
      'https://upload.wikimedia.org/wikipedia/commons/1/1e/Trump_protest_in_London182_%2842690728125%29_%28cropped%29.jpg';
  }

  signout() {
    this.user = null;
  }
}
