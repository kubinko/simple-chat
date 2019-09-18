import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Chat } from '../models/chat.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newChatForm: FormGroup;

  public chats: Chat[];

  get chatName() { return this.newChatForm.get('chatName'); }

  constructor(
    private router: Router) { }

  ngOnInit() {
    this.newChatForm = new FormGroup({
      chatName: new FormControl('')
    });

    this.loadChats();
  }

  startNewChat() {
    this.router.navigate(['/', 1]);
  }

  loadChats() {
    const chat = new Chat();
    chat.id = '1';
    chat.name = 'Sample chat';
    chat.ownerId = '1';
    chat.public = true;

    this.chats = [ chat ];
  }
}
