import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Chat } from '../models/chat.model';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newChatForm: FormGroup;
  user: User;

  public chats$: Observable<Chat[]>;

  get chatName() { return this.newChatForm.get('chatName'); }

  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router) {
      this.fireAuth.user.subscribe(user => this.user = user);
    }

  ngOnInit() {
    this.newChatForm = new FormGroup({
      chatName: new FormControl('')
    });

    this.loadChats();
  }

  startNewChat() {
    const id = this.db.createId();
    const ownerId = this.user.uid;

    this.db.collection('chats')
      .doc(id)
      .set({
        id,
        ownerId,
        name: this.chatName.value,
        public: true
      });

    this.router.navigate(['/', id]);
  }

  loadChats() {
    this.chats$ = this.db.collection<Chat>('chats',
      ref => ref
        .where('public', '==', true)
        .orderBy('createdOn', 'desc'))
      .valueChanges();
  }
}
