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
  validName = /^[A-Z][a-z]{1,40}$/;
  validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  rowsSelected = [];
  updateTitle;
  updateFormStatus;
  currentSelected;
  xmlLoaded;
  constructor(private appService: AppService) { }
  ngOnInit() {
    this.addTitle = "Show add";
    this.addFormStatus = false;
    this.xmlPathStatus = "";
    this.updateFormStatus = false;
    this.updateTitle = "Show update";
    this.xmlPath = "D:/Anton/company.xml";
    this.staff = [];
    this.properties = [];
    this.newRow = null;
    this.xmlLoaded = false;
  }
  addForm() {
    this.addFormStatus = !this.addFormStatus;
    if (this.addFormStatus === true && this.updateFormStatus === false) {
      this.addTitle = "Hide add";
      this.savedStatus = "";
      this.tableStatus = "";
      this.newRow = Object.create(Staff.prototype);
    } else if (this.addFormStatus === true && this.updateFormStatus === true) {
      this.addTitle = "Hide update";
      this.updateTitle = "Show update";
      this.updateFormStatus = false;
      this.savedStatus = "";
      this.tableStatus = "";
      this.newRow = Object.create(Staff.prototype);
    } else {
      this.addTitle = "Show add";
      this.savedStatus = "";
      this.tableStatus = "";
      this.newRow = null;
    }
  }
  addRow() {
    console.log(this.newRow);
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
    if (!this.validName.test(this.newRow.firstName)) {
      this.savedStatus = "invalid first name";
      this.tableStatus = "";
      return;
    }
    if (!this.validName.test(this.newRow.lastName)) {
      this.savedStatus = "invalid last name";
      this.tableStatus = "";
      return;
    }
    if (!this.validEmail.test(this.newRow.email)) {
      this.savedStatus = "invalid email";
      this.tableStatus = "";
      return;
    }
    this.staff.push(this.newRow);
    this.rowsSelected.push(false);
    this.savedStatus = "Successfully added";
    this.tableStatus = "";
    this.newRow = Object.create(Staff.prototype);
  }
  deleteRow() {
    this.currentSelected = undefined;
    if (this.staff.length <= 0 || this.rowsSelected.length <= 0) {
      this.tableStatus = "Table empty";
      return;
    } else {
      let falseCount = 0;
      for (const row of this.rowsSelected) {
        if (row === false) {
          falseCount++;
        }
      }
      if (falseCount === this.rowsSelected.length) {
        return;
      }
      const newStaff = [];
      for (let i = 0; i < this.rowsSelected.length; i++) {
        if (this.rowsSelected[i] === false) {
          newStaff.push(this.staff[i]);
        }
      }
      for (let i = 0; i < this.staff.length - newStaff.length; i++) {
        this.rowsSelected.pop();
      }
      for (let i = 0; i < this.rowsSelected.length; i++) {
        this.rowsSelected[i] = false;
      }
      this.staff = newStaff;
    }
    this.tableStatus = "Successfully deleted";
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
          for (let i = 0; i < data.staff.length; i++) {
            this.rowsSelected[i] = false;
          }
        });
      this.xmlLoaded = true;
      this.xmlPathStatus = "Successfully loaded";
    } catch (exc) {
      console.log(exc);
      this.xmlPathStatus = "error occurred";
    }
  }
  selectRow(i) {
    this.rowsSelected[i] = !this.rowsSelected[i];
    if (this.rowsSelected[i] === true) {
      this.currentSelected = i;
    }
    for (const row of this.rowsSelected) {
      if (row === true) {
        return;
      }
    }
    this.currentSelected = undefined;
  }
  updateForm() {
    this.updateFormStatus = !this.updateFormStatus;
    if (this.updateFormStatus === true && this.addFormStatus === false) {
      this.updateTitle = "Hide update";
      this.savedStatus = "";
      this.tableStatus = "";
      this.newRow = Object.create(Staff.prototype);
    } else if (this.updateFormStatus === true && this.addFormStatus === true) {
      this.updateTitle = "Hide update";
      this.addTitle = "Show add";
      this.addFormStatus = false;
      this.savedStatus = "";
      this.tableStatus = "";
      this.newRow = Object.create(Staff.prototype);
    } else {
      this.updateTitle = "Show update";
      this.savedStatus = "";
      this.tableStatus = "";
      this.newRow = null;
    }
  }
    updateRow() {
      console.log(this.newRow);
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
      if (!this.validName.test(this.newRow.firstName)) {
        this.savedStatus = "invalid first name";
        this.tableStatus = "";
        return;
      }
      if (!this.validName.test(this.newRow.lastName)) {
        this.savedStatus = "invalid last name";
        this.tableStatus = "";
        return;
      }
      if (!this.validEmail.test(this.newRow.email)) {
        this.savedStatus = "invalid email";
        this.tableStatus = "";
        return;
      }
      for (const key of this.properties) {
        this.staff[this.currentSelected][key] = this.newRow[key];
      }
      this.rowsSelected[this.currentSelected] = false;
      this.currentSelected = undefined;
      this.savedStatus = "Successfully updated";
      this.tableStatus = "";
      this.newRow = Object.create(Staff.prototype);
    }

    ascClicked(column) {
      if (this.staff[0].hasOwnProperty(column)) {
        if (typeof this.staff[0][column] === "number") {
          for (let i = 0; i < this.staff.length; i++) {
            for (let j = i + 1; j < this.staff.length; j++) {
              if (this.staff[i][column] > this.staff[j][column]) {
                const temp = this.staff[j];
                this.staff[j] = this.staff[i];
                this.staff[i] = temp;
              }
            }
          }
          this.tableStatus = "";
        } else if (typeof this.staff[0][column] === "string") {
          for (let i = 0; i < this.staff.length; i++) {
            for (let j = i + 1; j < this.staff.length; j++) {
              if (this.staff[i][column] > this.staff[j][column]) {
                const temp = this.staff[j];
                this.staff[j] = this.staff[i];
                this.staff[i] = temp;
              }
            }
          }
          this.tableStatus = "";
        }
      } else {
        this.tableStatus = "error occurred while ordering";
      }
    }
    descClicked(column) {
      if (this.staff[0].hasOwnProperty(column)) {
        if (typeof this.staff[0][column] === "number") {
          for (let i = 0; i < this.staff.length; i++) {
            for (let j = i + 1; j < this.staff.length; j++) {
              if (this.staff[i][column] < this.staff[j][column]) {
                const temp = this.staff[j];
                this.staff[j] = this.staff[i];
                this.staff[i] = temp;
              }
            }
          }
          this.tableStatus = "";
        } else if (typeof this.staff[0][column] === "string") {
          for (let i = 0; i < this.staff.length; i++) {
            for (let j = i + 1; j < this.staff.length; j++) {
              if (this.staff[i][column] < this.staff[j][column]) {
                const temp = this.staff[j];
                this.staff[j] = this.staff[i];
                this.staff[i] = temp;
              }
            }
          }
          this.tableStatus = "";
        }
      } else {
        this.tableStatus = "error occurred while ordering";
      }
    }
}
