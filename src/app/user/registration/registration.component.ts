import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth"
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private angularFireAuth: AngularFireAuth, private router: Router, private auth: AuthService) { }
  form!: FormGroup;
  inputErrors: string[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      "email": [null, [Validators.required, Validators.email]],
      "password": [null, [Validators.required, Validators.minLength(6)]],
      "username": [null, [Validators.required]]
    });
  }

  submitForm() {
    this.inputErrors = [];
    if (this.form.valid) {
      this.auth.signUp(
        this.form.controls['username'].value,
        this.form.controls['email'].value,
        this.form.controls['password'].value
      );
    } else {
      if (this.form.controls['email'].errors !== null) {
        if (this.form.controls['email'].errors["required"] === true) {
          this.inputErrors.push("Pole e-mail nie może być puste!");
        }
        if (this.form.controls['email'].errors["email"]) {
          this.inputErrors.push("Podany adres e-mail jest niepoprawny!");
        }
      }
      if (this.form.controls['password'].errors !== null) {
        console.log(this.form.controls['password'].errors);
        if (this.form.controls['password'].errors["required"] === true) {
          this.inputErrors.push("Pole hasło nie może być puste!");
        }
        if (this.form.controls['password'].errors["minlength"]) {
          let paswdInfo = this.form.controls['password'].errors["minlength"];
          this.inputErrors.push(`Hasło musi mieć co najmniej ${paswdInfo.requiredLength} znaków!`);
        }
      }
    }
  } 
}
