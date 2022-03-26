import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/service/data.service';
import { Calibrationlocationmaster } from './model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locationmaster',
  templateUrl: './locationmaster.component.html',
  styleUrls: ['./locationmaster.component.scss'],
})
export class LocationmasterComponent implements OnInit {
  public registerDetails: Calibrationlocationmaster = {};
  public collection: any[] = [];
  public BackUpdata = [] as any;
  public Category: any[] = [];
  public Type: any[] = [];
  public timeout: any = null;
  public searchvalue: any;
  public HighlightRow: any;
  public HighlightHead: any = 3;
  public user_name: any = [];
  public Branchunit: any = [];
  public Department: any = [];
  public SearchField: string = 'Department';
  editAccess: boolean = false;
  public TableHeading = [
    {
      name: 'SI No',
    },
    {
      name: 'BranchUnit',
    },
    {
      name: 'Division',
    },
    {
      name: 'Department',
    },
    {
      name: 'Short Name',
    },
    {
      name: 'Create On',
    },
    {
      name: 'Create By',
    },
    {
      name: 'Update On',
    },
    {
      name: 'Update By',
    },
    {
      name: 'Edit',
    },
    {
      name: 'Delete',
    },
  ];

  constructor(
    private dataservice: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let useraccess = JSON.parse(localStorage.getItem('userAccess') || '[]');
    let datas = useraccess.filter((element: any) => element.moduleid === 5);
    this.editAccess = datas[0].Edit;
    this.tabledata();
    this.getCategory();
    this.getType();
    this.Branchunitfun();
    this.Departmentfun();
    this.user_name = localStorage.getItem('Login_name');
  }
  public getType(): void {
    this.dataservice.MasterType_getView().subscribe((data) => {
      console.log(data.data[0].type);
      this.Type = data.data;
      // this.BackUpdata = data.data;
    });
  }

  public getCategory(): void {
    this.dataservice.MasterCategory_getView().subscribe((data) => {
      // console.log(data.data[0].category);
      this.Category = data.data;
      // this.BackUpdata = data.data;
    });
  }

  public Departmentfun(): void {
    this.dataservice
      .Calibrationlocationmastervalue_getView()
      .subscribe((data) => {
        console.log('inisde dept', data.data);

        this.Department = data.data;
      });
  }

  public Branchunitfun(): void {
    this.dataservice
      .CalibrationlocationmasterParticular_getView()
      .subscribe((data) => {
        this.Branchunit = data.data;
      });
  }

  public tabledata(): void {
    this.dataservice.Calibrationlocationmaster_getView().subscribe((data) => {
      this.collection = data.data;
      this.BackUpdata = data.data;
    });
    // console.log(this.collection);
  }
  public deleteUsers(id: string): void {
    // console.log(id);
    this.dataservice
      .Calibrationlocationmaster_DeleteSingleUser(id, this.collection)
      .subscribe(
        (data: any) => {
          this.tabledata();
        },
        (err) => console.log('its error')
      );
  }
  public store(): void {
    // if (
    //   this.registerDetails.BranchUnit === undefined ||
    //   this.registerDetails.ShortName === undefined ||
    //   this.registerDetails.Division === undefined ||
    //   this.registerDetails.Department === '' ||
    //   this.registerDetails.Division == '' ||
    //   this.registerDetails.Department == ''
    // ) {
    //   alert('Enter the Details');
    // } else {
    //   console.log(this.registerDetails);

    //   this.dataservice
    //     .Calibrationlocationmaster_postUser(this.registerDetails)
    //     .subscribe(
    //       (data) => {
    //         // alert("Added");
    //         console.log('Inserted' + data.data);
    //         if (data.data) {
    //           this.toastr.success(
    //             'Created!!!',
    //             'location Created Successfully.',
    //             {
    //               timeOut: 3000,
    //             }
    //           );
    //           let currentUrl = this.router.url;
    //           this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //           this.router.onSameUrlNavigation = 'reload';
    //           this.router.navigate([currentUrl]);
    //           this.tabledata();
    //         } else {
    //           if (data.error.errors[0].validatorKey) {
    //             this.toastr.error('Error!!!', 'location Already Exists.', {
    //               timeOut: 3000,
    //             });
    //           }
    //         }
    //       },
    //       (err) => console.log('its error')
    //     );
    // }

    var BranchUnit = this.registerDetails.BranchUnit;
    var Division = this.registerDetails.Division;
    var Department = this.registerDetails.Department;
    var ShortName = this.registerDetails.ShortName;

    if (BranchUnit == '' || BranchUnit == undefined) {
      this.toastr.warning('Warning!!!', ' BranchUnit is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Division == '' || Division == undefined) {
      this.toastr.warning('Warning!!!', 'Division  is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Department == '' || Department == undefined) {
      this.toastr.warning('Warning!!!', 'Department is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (ShortName == '' || ShortName == undefined) {
      this.toastr.warning('Warning!!!', 'ShortName is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    this.dataservice
      .Calibrationlocationmaster_postUser(this.registerDetails)
      .subscribe((data) => {
        this.collection = data.data;

        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        this.tabledata();

        // this.dataservice.MasterTest_getViewtablerecord1().subscribe((data) => {
        //   this.BackUpdata = data.data;
        // });
      });
  }
  update() {
    // alert(this.registerDetails.categoryId)
    if (
      this.registerDetails.BranchUnit === '' ||
      this.registerDetails.ShortName === '' ||
      String(this.registerDetails.Division) === ''
    ) {
      alert('Enter the Details');
    } else {
      this.dataservice
        .Calibrationlocationmaster_updateSingleUser(
          this.registerDetails.id,
          this.registerDetails
        )
        .subscribe(
          (data) => {
            // alert("Update");
            console.log(data);
            if (data.data) {
              this.toastr.success(
                'Updated!!!',
                'Instrument Updated Successfully.',
                {
                  timeOut: 3000,
                }
              );
              let currentUrl = this.router.url;
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate([currentUrl]);
              this.tabledata();
            } else {
              if (data.error.errors[0].validatorKey) {
                this.toastr.error('Error!!!', 'location Already Exists.', {
                  timeOut: 3000,
                });
              }
            }
          },
          (err) => console.log(err)
        );
    }
  }
  getUser(id: object) {
    this.registerDetails = { ...id };
  }

  public Click_Head(index: number, heading: string): void {
    this.collection = [...this.BackUpdata];
    if (heading == 'Department') {
      this.SearchField = heading;
      this.HighlightHead = index;
    } else {
    }
  }

  public Empty(): void {}
  public onKeySearch(event: any) {}

  public SearchBy(): void {
    // this.searchvalue = this.searchvalue.toUpperCase();
    if (this.searchvalue) {
      if (this.SearchField == 'Department') {
        this.collection = this.collection.filter(
          (f) => f.type == this.searchvalue
        );
      }
    }
  }

  reset() {
    (this.registerDetails.BranchUnit = ''),
      (this.registerDetails.Division = ''),
      (this.registerDetails.Department = ''),
      (this.registerDetails.ShortName = undefined);
  }
}
