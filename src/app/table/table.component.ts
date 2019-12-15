import { Component, OnInit } from '@angular/core';
import {AppService} from '../service/app.service';
import {Staff} from '../model/staff';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
    staff = [
    {
      id: 1,
      firstname: "Hamid",
      lastname: "Kim",
      email: "dssad@company.com",
      salary: 200000
    },
    {
      id: 2,
      firstname: "aaaa",
      lastname: "bbbb",
      email: "11111@company.com",
      salary: 100000
    },
    {
      id: 4,
      firstname: "vvvv",
      lastname: "gggg",
      email: "222222@company.com",
      salary: 400000
    },
    {
      id: 5,
      firstname: "ddddd",
      lastname: "eeeee",
      email: "444444@company.com",
      salary: 1000000
    }
  ];
    staff2: Staff[];
    properties2;
  properties = Object.keys(this.staff[0]);
  xmlPath;
  addTitle;
  addFormStatus;
  savedStatus;
  xmlPathStatus;
  constructor(private appService: AppService) { }
  ngOnInit() {
    this.addTitle = "Show form";
    this.addFormStatus = false;
    console.log(this.staff);
    console.log(this.properties);
    this.xmlPathStatus = "";
  }
  addForm() {
    this.addFormStatus = !this.addFormStatus;
    if (this.addFormStatus === true) {
      this.addTitle = "Hide form";
      this.savedStatus = "";
    } else {
      this.addTitle = "Show form";
      this.savedStatus = "";
    }
  }
  addRow() {
    this.savedStatus = "Successfully added";
  }
  async loadXml() {
    this.xmlPathStatus = "";
    try {
      await this.appService.getStaff(this.xmlPath)
        .toPromise()
        .then((data: Staff[]) => {
          for (const value of data) {
            this.staff2 = data;
          }
          console.log(data);
        });
      this.xmlPathStatus = "Successfully loaded";
    } catch (exception) {
      console.log(exception);
      this.xmlPathStatus = "Incorrect file path";
    }

    // try {
    //   await this.appService.postStaff(this.xmlPath)
    //     .toPromise()
    //     .then((data: Staff[]) => {
    //             for (const value of data) {
    //               console.log(data);
    //             }
    //           });
    // } catch (exception) {
    //   console.log(exception);
    // }
  }

}
