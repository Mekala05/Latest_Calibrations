import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  accessgiven: EmployeeAccessDetails[] = [];
  public user: any = [];
  updateUser: any[] = [];
  update: boolean = false;

  constructor(public dataservice: DataService, public router: Router) {}

  ngOnInit(): void {
    this.accessgiven = [];
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
    });

    this.dataservice.useracess_gets().subscribe((data: any) => {
      this.user = data.data;
    });
  }

  getUser(data: any) {
    this.update = true;
    this.load();
    this.registerDetails = data;
    this.registered = data;
    this.tableData = data;
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
  }

  department(eve: any) {
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
    if (this.update === false) {
      this.dataservice.iddescription_get().subscribe((data: any) => {
        this.tableData = data.data;
      });
    }
  }

  edit(eve: any, val: any) {
    if (eve.target.value === 'view' || eve.target.value === 'edit') {
      if (this.accessgiven.length) {
        this.accessgiven.map((item: any) => {
          if (item.moduleid === val.moduleId) {
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

  edited(eve: any, val: any) {
    if (eve.target.value === 'view') {
      val.view = eve.target.checked;
      val.edit = val.Edit;
    }
    if (eve.target.value === 'edit') {
      val.edit = eve.target.checked;
    }
    this.updateUser.push(val);
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
        employeeid: this.registerDetails.employeeid,
        unit: this.registerDetails.unit,
        department: this.registerDetails.department,
      });
    });

    this.registered.map((item: any) => {
      this.dataservice.useracess_post(item).subscribe((data: any) => {
        this.tableData = data;
      });
    });
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  updateData() {
    this.updateUser.map((item: any) => {
      return (
        (item.view = this.updateUser[0].view),
        (item.Edit = this.updateUser[0].edit),
        delete this.updateUser[0].edit,
        (item.moduleid = this.updateUser[0].moduleid),
        (item.ModuleidDescription = this.updateUser[0].ModuleidDescription),
        (item.employeeid = this.registerDetails.employeeid),
        (item.unit = this.registerDetails.unit),
        (item.department = this.registerDetails.department)
      );
    });

    this.dataservice
      .useracess_update(this.updateUser[0].id, this.updateUser[0])
      .subscribe((item: any) => {});
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
    this.ngOnInit();
  }
}
