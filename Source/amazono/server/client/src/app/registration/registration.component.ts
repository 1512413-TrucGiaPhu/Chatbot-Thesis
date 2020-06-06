import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { RestApiService } from './../rest-api.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  password1 = '';
  isSeller = '';
  BACKEND_URL = environment.apiUrl;
  form: FormGroup;
  formIsLoading = false;

  constructor(private router: Router, private data: DataService, private rest: RestApiService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      'name' : new FormControl('', Validators.required),
      'email' : new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'password' : new FormControl('', Validators.required),
      'repassword' : new FormControl('', Validators.required),
      'isSeller' : new FormControl(false, Validators.nullValidator)
    });
  }

  validate() {
    if (this.form.controls.name.value) {
      if (this.form.controls.email.value) {
        if (this.form.controls.password.value) {
          if (this.form.controls.repassword.value) {
            if (this.form.controls.password.value === this.form.controls.repassword.value) {
              return true;
            } else {
              this.data.error('password does not match');
            }
          } else {
            this.data.error('Confirmation password is not entered');
          }

        } else {
          this.data.error('password is not entered');
        }
      } else {
        this.data.error('Email is not entered');
      }
    } else {
      this.data.error('Name is not entered.');
    }
  }

  async register() {
    this.formIsLoading = true;
    try {
      if (this.validate()) {
        const data = await this.rest.post(
          `${this.BACKEND_URL}/accounts/signup`, {
            name: this.form.controls.name.value,
            email: this.form.controls.email.value,
            password: this.form.controls.password.value,
            isSeller: this.form.controls.isSeller.value
          }
        );
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          await this.data.getProfile();
          this.router.navigate(['profile/address'])
            .then(() => {
              this.data.success(
                'Registration successfully! Please enter your shipping address below'
              );
            }).catch(error =>
              this.data.error(error));

        } else {
          this.data.error(data['message']);
        }
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.formIsLoading = false;
  }

}

