import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Staff} from '../model/staff';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) { }

  getStaff(filePath: string) {
    return this.httpClient.get("http://localhost:8080/xml/getXml?path=" + filePath);
  }
  updateStaff(filePath: string, staff: Staff[]) {
    return this.httpClient.post("http://localhost:8080/xml/updateXml?path=" + filePath, staff);
  }
}
