import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  // private chatbotUrl = "http://localhost:5005/webhooks/rest/webhook";
  private chatbotUrl = 'http://34.87.52.153/webhooks/rest/webhook';

  constructor(private http: HttpClient) { }

  getHeaders() {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', token) : null;
  }

  get(link: string) {
    return this.http.get(link, { headers: this.getHeaders()}).toPromise();
  }

  post(link: string, body: any) {
    return this.http.post(link, body, { headers: this.getHeaders()}).toPromise();
  }

  put(link: string, body: any) {
    return this.http.put(link, body, { headers: this.getHeaders()}).toPromise();
  }

  sendMessageChatbot(body: any) {
    return this.http.post(this.chatbotUrl, body).toPromise();
  }

}
