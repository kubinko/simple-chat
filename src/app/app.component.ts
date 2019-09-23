import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { QuotingService } from './services/quoting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User;
  quoteText$: BehaviorSubject<string> = new BehaviorSubject('');
  quoteAuthor$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private quoteService: QuotingService,
    private fireAuth: AngularFireAuth,
    private dialog: MatDialog,
    public router: Router) {
      this.fireAuth.user.subscribe(user => this.user = user);
    }

  ngOnInit() {
    this.quoteService.getQuote().subscribe(
      response => {
        this.quoteText$.next(response.body.text);
        this.quoteAuthor$.next(response.body.author);
      }
    );
  }

  signin() {
    this.dialog.open(LoginComponent);
  }

  signout() {
    this.fireAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
