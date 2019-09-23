import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;

  get name() { return this.userForm.get('name'); }

  constructor(
    private fireAuth: AngularFireAuth,
    private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  async loginWithGoogle() {
    this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.dialogRef.close();
  }

  async loginAnonymous() {
    const result = await this.fireAuth.auth.signInAnonymously();

    if (result.additionalUserInfo.isNewUser) {
      result.user.updateProfile({
        displayName: this.name.value
      });
    }

    this.dialogRef.close();
  }
}
