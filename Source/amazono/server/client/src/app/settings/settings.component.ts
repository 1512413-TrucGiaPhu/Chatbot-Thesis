import { RestApiService } from './../rest-api.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  btnDisabled = false;
  currentSettings: any;
  BACKEND_URL = environment.apiUrl;

  constructor(public data: DataService, private rest: RestApiService) { }

  async ngOnInit() {
    try {
      if (!this.data.user) {
        await this.data.getProfile();
      }
      this.currentSettings = Object.assign({
        newPwd: '',
        pwdConfirm: ''
      }, this.data.user);
    } catch (error) {
      this.data.error(error);
    }
  }

  validate(settings) {
    if (settings['name']) {
      if (settings['email']) {
        if (settings['pwdConfirm']) {
          if (settings['newPwd'] === settings['pwdConfirm']) {
            return true;
          } else {
            this.data.error('Passwords do not match');
          }
        } else {
          this.data.error(' Please enter your confirm password');
        }
      } else {
        if (!settings['pwdConfirm']) {
          return true;
        } else {
          this.data.error('Please enter new password');
        }
      }
    }
  }

  async update() {
    this.btnDisabled = true;
    try {
      if (this.validate(this.currentSettings)) {
        const data = await this.rest.post(
          `${this.BACKEND_URL}/accounts/profile`, {
            name: this.currentSettings['name'],
            email: this.currentSettings['email'],
            password: this.currentSettings['newPwd'],
            isSeller: this.currentSettings['isSeller']
          }
        );

        // if success is true, success message will be displayed, otherwise,
        // error message will be displayed
        data['success']
          ? (this.data.getProfile(), this.data.success(data['message']))
          : this.data.error(data['message']);
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

}
