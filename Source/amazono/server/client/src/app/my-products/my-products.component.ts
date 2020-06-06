import { RestApiService } from './../rest-api.service';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {

  products: any;
  BACKEND_URL = environment.apiUrl;
  constructor(private data: DataService,
    private rest: RestApiService ) { }

  async ngOnInit() {
    try {
      const data = await this.rest.get(
        `${this.BACKEND_URL}/seller/products`
      );
      data['success']
      ? (this.products = data['products'])
      : (this.data.error(data['message']));
    } catch (error) {
      this.data.error(error['message']);
    }
  }

}
