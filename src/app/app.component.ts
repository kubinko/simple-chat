import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './models/user.model';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { Quote } from './models/quote.model';

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
    private dialog: MatDialog,
    public router: Router) { }

  ngOnInit() {
    const quote = new Quote();
    quote.text = 'People say nothing is impossible, but I do nothing every day.';
    quote.author = 'A. A. Milne';

    this.quoteText$.next(quote.text);
    this.quoteAuthor$.next(quote.author);
  }

  signin() {
    this.dialog.open(LoginComponent).afterClosed().subscribe(
      () => {
        this.user = new User();
        this.user.displayName = 'Jozef Mrkvička';
        this.user.photoURL = '../assets/images/profile_placeholder.png';
      });
  }

  signout() {
    this.user = null;
    this.router.navigate(['/']);
  }
}
