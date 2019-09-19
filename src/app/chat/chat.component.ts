import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Message } from '../models/message.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messageForm: FormGroup;
  imageForm: FormGroup;

  get messageText() { return this.messageForm.get('messageText'); }

  get messageImage() { return this.imageForm.get('messageImage'); }

  @ViewChild('mediaCapture', {static: true}) fileInput: ElementRef;

  public messages: Message[];

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.messageForm = new FormGroup({
      messageText: new FormControl('')
    });
    this.imageForm = new FormGroup({
      messageImage: new FormControl('')
    });

    this.loadMessages();
  }

  loadMessages() {
    const message = new Message();

    message.text = 'Hello world!';
    message.senderId = '1';
    message.senderName = 'Jozef Mrkvička';
    message.createdOn = Date.now();

    this.messages = [ message ];
  }

  sendTextMessage() {
    /* SEND TEXT MESSAGE */
  }

  setImage() {
    this.fileInput.nativeElement.click();
  }

  onFileChange(eventData: any) {
    if (eventData.target.files && eventData.target.files[0]) {
      const file = eventData.target.files[0];
      this.sendImageMessage(file);
    }
  }

  sendImageMessage(file: any) {
    /* SEND IMAGE MESSAGE */
  }
}
