import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  getStaff(filePath: string) {
    console.log(filePath);
    return this.httpClient.get("http://localhost:8080/xml?path=" + filePath);
  }
  postStaff(filePath: string) {
    const backslashes = /\\/g;
    if (backslashes.test(filePath)) {
      filePath = filePath.replace(backslashes, "/");
    }
    return this.httpClient.post("http://localhost:8080/xml/file", filePath);
  }
}
