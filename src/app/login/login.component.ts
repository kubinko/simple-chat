import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;

  get name() { return this.userForm.get('name'); }

  constructor(
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
    this.dialogRef.close();
  }

  async loginAnonymous() {
    this.dialogRef.close();
  }
}
