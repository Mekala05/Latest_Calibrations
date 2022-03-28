import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/service/data.service';
import { EmployeeAccess, EmployeeAccessDetails } from './model';

@Component({
  selector: 'app-useraccess',
  templateUrl: './useraccess.component.html',
  styleUrls: ['./useraccess.component.scss'],
})
export class UseraccessComponent implements OnInit {
  public registerDetails: EmployeeAccess = {
    unit: '',
    department: '',
    employeeid: '',
  };

  public registered: EmployeeAccessDetails[] = [];
  public units: any = [];
  public dep: any = [];
  public emp: any = [];
  userDetails: any = [];
  show: boolean = false;
  tableData: any = [];
  accessgiven: any = [];
  public user: any = [];
  update: boolean = false;

  constructor(public dataservice: DataService) {}

  ngOnInit(): void {
    this.accessgiven = [];
    // this.load();
    this.dataservice.getViewOhem().subscribe((item: any) => {
      this.userDetails = item.data;
      item.data.map((data: any) => {
        if (data.branch) {
          this.units.push(data.branch);
        }
        if (data.dept) {
          this.dep.push(data.dept);
        }
        if (data.firstName) {
          this.emp.push({
            firstName: data.firstName,
            lastName: data.lastName,
            empID: data.empID,
          });
        }
      });
      console.log('dep', this.dep);
    });

    this.dataservice.useracess_gets().subscribe((data: any) => {
      console.log(data);
      this.user = data.data;
    });
  }

  getUser(data: any) {
    this.load();
    this.update = true;
    // console.log(data);
    this.registerDetails = data;
    this.registered = data;
    // this.tableData = data;
    console.log('register details', this.registerDetails);
    console.log('register', this.registered);
  }

  unit(eve: any) {
    let eventValue = eve.target.value;
    this.userDetails.map((data: any) => {
      if (JSON.stringify(data.branch) === eventValue) {
        let dept = [];
        dept.push(data.dept);
        this.dep = dept;
      }
    });
    console.log(this.dep);
  }

  department(eve: any) {
    // console.log(eve.target.value);
    let emp = eve.target.value;
    this.userDetails.map((data: any) => {
      if (JSON.stringify(data.dept) === emp) {
        let employee = [];

        employee.push({
          firstName: data.firstName,
          lastName: data.lastName,
          empID: data.empID,
        });

        this.emp = employee;
      }
    });
  }

  load() {
    this.show = true;
    // console.log('inside load');
    this.dataservice.iddescription_get().subscribe((data: any) => {
      this.tableData = data.data;
      // console.log('table', this.tableData);
    });
  }

  edit(eve: any, val: any) {
    if (eve.target.value === 'view' || eve.target.value === 'edit') {
      if (this.accessgiven.length) {
        this.accessgiven.map((item: any) => {
          if (item.moduleId === val.moduleId) {
            if (eve.target.value === 'view') {
              val.view = eve.target.checked;
            }
            if (eve.target.value === 'edit') {
              val.edit = eve.target.checked;
            }
          } else {
            if (eve.target.value === 'view') {
              val.view = eve.target.checked;
            }
            if (eve.target.value === 'edit') {
              val.edit = eve.target.checked;
            }
            if (!this.accessgiven.includes(val)) {
              this.accessgiven.push(val);
            }
          }
          return this.accessgiven;
        });
      } else {
        if (eve.target.value === 'view') {
          val.view = eve.target.checked;
        }
        if (eve.target.value === 'edit') {
          val.edit = eve.target.checked;
        }
        this.accessgiven.push(val);
      }
    }
  }

  allow() {
    // this.show = true;
    // this.dataservice.getViewOhem().subscribe((item: any) => {
    //   this.userDetails = item.data;
    //   item.data.map((data: any) => {
    //     if (data.branch) {
    //       this.units.push(data.branch);
    //     }
    //     if (data.dept) {
    //       this.dep.push(data.dept);
    //     }
    //     if (data.firstName) {
    //       this.emp.push(data);
    //     }
    //   });
    //   console.log('dep', this.dep);
    // });
    this.accessgiven.map((item: any) => {
      if (item.view === undefined) {
        item.view = false;
      }
      if (item.edit === undefined) {
        item.edit = false;
      }
      // console.log('emp', this.registerDetails.employeeid);

      this.registered.push({
        view: item.view,
        Edit: item.edit,
        moduleid: item.moduleId,
        ModuleidDescription: item.moduleDescription,
        employeeid: this.registerDetails.employeeid,
        unit: this.registerDetails.unit,
        department: this.registerDetails.department,
      });
    });

    if (!this.update) {
      this.registered.map((item: any) => {
        this.dataservice.useracess_post(item).subscribe((data: any) => {});
      });

      this.dataservice.useracess_gets().subscribe((data: any) => {
        this.user = data.data;
      });
    }

    if (this.update) {
      console.log(this.registerDetails.employeeid);
      console.log(this.registered);

      this.dataservice
        .useracess_update(this.registerDetails.employeeid, this.registered)
        .subscribe((item: any) => {});
    }

    // console.log('register', this.registered);
  }

  updateData() {
    console.log('insie log');
    console.log(this.registerDetails);
    this.allow();
  }
}
