import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  getStaff(filePath: string) {
    const backslashes = /\\/g;
    if (filePath.match(backslashes).length !== 0) {
      filePath = filePath.replace(backslashes, "/");
    }
    console.log(filePath);
    return this.httpClient.get("localhost:8080/xml?=" + filePath);
  }
}
