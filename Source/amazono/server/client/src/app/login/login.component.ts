import { RestApiService } from './../rest-api.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';
  BACKEND_URL = environment.apiUrl;
  formIsLoading = false;
  form: FormGroup;

  constructor(
    private router: Router,
    private rest: RestApiService,
    public data: DataService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      'email' : new FormControl('', Validators.compose([Validators.required, Validators.email])),
      'password' : new FormControl('', Validators.required),
    });
  }

  async login() {
    this.formIsLoading = true;
    try {
        const data = await this.rest.post(
          `${this.BACKEND_URL}/accounts/login`,
          {
            email: this.form.controls['email'].value,
            password: this.form.controls['password'].value
          }
        );
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          await this.data.getProfile();
          this.router.navigate(['/']);
        } else {
          this.data.error(data['massage']);
        }
      } catch (error) {
      this.data.error(error['massage']);
    } finally {
      this.formIsLoading = false;
    }
  }
}
