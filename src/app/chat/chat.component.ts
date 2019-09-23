import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Message } from '../models/message.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { NullTemplateVisitor } from '@angular/compiler';

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

  private messagesCollection: AngularFirestoreCollection;
  public messages$: Observable<Message[]>;
  user: User;

  constructor(
    private fireStorage: AngularFireStorage,
    private fireAuth: AngularFireAuth,
    private db: AngularFirestore,
    private route: ActivatedRoute) {
      this.fireAuth.user.subscribe(user => this.user = user);
    }

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
    const chatId = this.route.snapshot.params.id;

    this.messagesCollection = this.db
      .collection('chats')
      .doc(chatId)
      .collection('messages');

    this.messages$ = this.messagesCollection
      .valueChanges()
      .pipe(
        map(data => data as Message[])
      );
  }

  sendTextMessage() {
    const id = this.db.createId();
    const senderId = this.user.uid;
    const senderName = this.user.displayName;
    const senderPhotoUrl = this.user.photoURL;

    this.messagesCollection.doc(id).set({
      senderId,
      senderName,
      senderPhotoUrl,
      text: this.messageText.value,
      photoUrl: null
    });

    this.messageForm.reset();
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
    const id = this.db.createId();
    const senderId = this.user.uid;
    const senderName = this.user.displayName;
    const senderPhotoUrl = this.user.photoURL;

    this.messagesCollection.add({
      id,
      senderId,
      senderName,
      senderPhotoUrl,
      text: 'Loading...',
      photoUrl: 'https://www.google.com/images/spin-32.gif?a'
    })
    .then(messageRef => {
      const filePath = this.user.uid + '/' + id + '/' + file.name;
      this.fireStorage.ref(filePath).put(file)
        .then(fileSnapshot => {
          fileSnapshot.ref.getDownloadURL()
            .then(url => {
              messageRef.update({
                text: null,
                photoUrl: url
              });
            });
        });
    });

    this.messageForm.reset();
  }
}
