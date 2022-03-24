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
    employee: '',
  };

  public registered: EmployeeAccessDetails[] = [];
  public units: any = [];
  public dep: any = [];
  public emp: any = [];
  userDetails: any = [];
  show: boolean = false;
  tableData: any = [];
  accessgiven: any = [];

  constructor(public dataservice: DataService) {}

  ngOnInit(): void {
    this.accessgiven = [];
    this.dataservice.getViewOhem().subscribe((item: any) => {
      this.userDetails = item.data;
      item.data.map((data: any) => {
        if (data.branch) {
          this.units.push(data.branch);
        }
        // if (data.dept) {
        //   this.dep.push(data.dept);
        // }
        // if (data.firstName) {
        //   this.emp.push(data);
        // }
      });
    });
  }

  unit(eve: any) {
    let eventValue = eve.target.value;
    this.userDetails.map((data: any) => {
      if (JSON.stringify(data.branch) === eventValue) {
        this.dep.push(data);
      }
    });
  }

  department(eve: any) {
    console.log(eve.target.value);
    let emp = eve.target.value;
    this.userDetails.map((data: any) => {
      if (JSON.stringify(data.dept) === emp) {
        this.emp.push(data);
      }
    });
  }

  load() {
    this.show = true;
    console.log('inside load');
    this.dataservice.iddescription_get().subscribe((data: any) => {
      this.tableData = data.data;
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
    this.accessgiven.map((item: any) => {
      if (item.view === undefined) {
        item.view = false;
      }
      if (item.edit === undefined) {
        item.edit = false;
      }
      this.registered.push({
        view: item.view,
        Edit: item.edit,
        moduleid: item.moduleId,
        ModuleidDescription: item.moduleDescription,
        employeeid: this.registerDetails.employee,
      });
    });

    this.registered.map((item: any) => {
      this.dataservice.useracess_post(item).subscribe((data: any) => {});
    });

    console.log('register', this.registered);
  }
}
