import { RestApiService } from './../rest-api.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  btnDisabled = false;

  BACKEND_URL = environment.apiUrl;
  currentAddress: any;

  constructor(public data: DataService, private rest: RestApiService) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get(
        `${this.BACKEND_URL}/accounts/address`
      );

      if(
        JSON.stringify(data['address']) === '{}' &&
        this.data.message === ''
      ) {
        this.data.warning(
          'You have not entered your shipping address. Please enter your shipping address'
        );
      }
      this.currentAddress = data['address'];
    } catch (error) {
      this.data.error(error['message']);
    }
  }

  async updateAddress(){
    this.btnDisabled = true;
    try {
      const res = await this.rest.post(
        // currentAddress will be posted in the above URL
        `${this.BACKEND_URL}/accounts/address`,
        this.currentAddress
      );

      // check res success is true ?
      res['success']
      ? (this.data.success(res['message']), await this.data.getProfile())
      : this.data.error(res['message']);
    } catch (error) {
      this.data.error(error['message']);;
    }
    this.btnDisabled = false;
  }


}
