import { Component, OnInit } from '@angular/core';
import {AppService} from '../service/app.service';
import {Staff} from '../model/staff';
import {Company} from '../model/company';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  staff: Staff[];
  properties;
  xmlPath;
  addTitle;
  addFormStatus;
  savedStatus;
  xmlPathStatus;
  newRow: Staff;
  tableStatus;
  constructor(private appService: AppService) { }
  ngOnInit() {
    this.addTitle = "Show form";
    this.addFormStatus = false;
    this.xmlPathStatus = "";
    this.xmlPath = "D:/Anton/company.xml";
    this.staff = [];
    this.properties = [];
    this.newRow = null;
  }
  addForm() {
    this.addFormStatus = !this.addFormStatus;
    if (this.addFormStatus === true) {
      this.addTitle = "Hide form";
      this.savedStatus = "";
      this.tableStatus = "";
      this.newRow = Object.create(Staff.prototype);
    } else {
      this.addTitle = "Show form";
      this.savedStatus = "";
      this.tableStatus = "";
      this.newRow = null;
    }
  }
  addRow() {
    if (Object.entries(this.newRow).length !== this.properties.length) {
      this.savedStatus = "empty value";
      this.tableStatus = "";
      return;
    }
    for (const key in this.newRow) {
      if (this.newRow.hasOwnProperty(key)) {
        if (this.newRow[key] === "") {
          this.savedStatus = "empty value";
          this.tableStatus = "";
          return;
        }
      }
    }
    this.staff.push(this.newRow);
    this.savedStatus = "Successfully added";
    this.tableStatus = "";
    this.newRow = Object.create(Staff.prototype);
  }
  deleteRow() {
    if (this.staff.length <= 0) {
      this.tableStatus = "Table empty";
    } else {
      this.staff.pop();
    }
  }
  async saveXml() {
    try {
      await this.appService.updateStaff(this.xmlPath, this.staff)
        .toPromise()
        .then((data: Company) => {
        });
      this.tableStatus = "Successfully saved";
    } catch (exc) {
      console.log(exc);
      this.tableStatus = "error occurred";
    }
  }

  async loadXml() {
    this.tableStatus = "";
    this.xmlPathStatus = "";
    this.staff = [];
    try {
      await this.appService.getStaff(this.xmlPath)
        .toPromise()
        .then((data: Company) => {
          this.staff = data.staff;
          this.properties = Object.keys(this.staff[0]);
        });
      this.xmlPathStatus = "Successfully loaded";
    } catch (exc) {
      console.log(exc);
      this.xmlPathStatus = "error occurred";
    }
  }

}
