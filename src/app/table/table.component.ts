import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  company = {
    staff: [
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
    }
  ]
};
  properties = Object.keys(this.company[Object.keys(this.company)][0]);
//   // Step 1. Get all the object keys.
//   evilResponseProps = Object.keys(this.company);
// // Step 2. Create an empty array.
//   goodResponse = [];
// // Step 3. Iterate throw all keys.
//   for(prop of evilResponseProps) {
//   goodResponse.push(evilResponseProps[prop]);
//   }
  constructor() { }
  ngOnInit() {
  }

}
