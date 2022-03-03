import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { Type } from './model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-typemaster',
  templateUrl: './typemaster.component.html',
  styleUrls: ['./typemaster.component.scss'],
})
export class TypemasterComponent implements OnInit {
  public collection: any[] = [];
  public searchvalue: any;
  public HighlightRow: any;
  public HighlightHead: any = 1;
  public SearchField: string = 'Type';
  public BackUpdata = [] as any;
  public timeout: any = null;
  public registerDetails: Type = {};
  public Category: any[] = [];
  public type: any[] = [];
  public shortname: any;
  public user_name: any = [];
  public TableHeading = [
    {
      name: 'SI No',
    },
    {
      name: 'categoryId',
    },
    {
      name: 'Type',
    },
    {
      name: 'ShortName',
    },
    {
      name: 'Create At',
    },
    {
      name: 'Create By',
    },
    {
      name: 'Update At',
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
    this.tabledata();
    this.getCategory();
    this.user_name = localStorage.getItem('Login_name');
  }
  keyFunc(data: any) {
    this.shortname = data.target.value;
  }

  public getCategory(): void {
    this.dataservice.MasterCategory_getView().subscribe((data) => {
      // console.log(data.data[0].category);
      this.Category = data.data;
      // this.BackUpdata = data.data;
    });
  }

  public tabledata(): void {
    this.dataservice.type_getView().subscribe((data) => {
      console.log(data.data);

      this.collection = data.data;
      this.BackUpdata = data.data;
    });
    // console.log(this.collection);
  }
  public deleteUsers(id: string): void {
    // console.log(id);
    this.dataservice.type_DeleteSingleUser(id, this.collection).subscribe(
      (data: any) => {
        this.tabledata();
      },
      (err) => console.log('its error')
    );
  }

  category(event: any, data: any = '') {
    // alert(event.target.value);
    // console.log('data', data);

    let selectedvalue1: any = event != '' ? event.target.value : data;
    // console.log('ddddddddddddddddd', selectedvalue1);

    this.dataservice.categorydetails(selectedvalue1).subscribe((data) => {
      // console.log('typeeee', data);
      this.type = data.data;
      // console.log(this.Category);
      // this.BackUpdata = data.data;
    });
  }

  public store(): void {
    if (this.shortname.length < 3) {
      this.toastr.error('Error!!!', 'Shortname has more than 3 characters', {
        timeOut: 3000,
      });
    } else {
      // if (
      //   this.registerDetails.shortName === undefined ||
      //   this.registerDetails.categoryId === undefined ||
      //   this.registerDetails.type === undefined ||
      //   this.registerDetails.shortName === ''
      // ) {
      //   alert('Enter the Details');
      // } else {
      //   this.dataservice.type_postUser(this.registerDetails).subscribe(
      //     (data) => {
      //       // alert("Added");
      //       if (data.data) {
      //         this.toastr.success('Created!!!', 'Type Created Successfully.', {
      //           timeOut: 3000,
      //         });
      //         let currentUrl = this.router.url;
      //         this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      //         this.router.onSameUrlNavigation = 'reload';
      //         this.router.navigate([currentUrl]);
      //         this.tabledata();
      //       } else {
      //         if (data.error.errors[0].validatorKey) {
      //           this.toastr.error('Error!!!', 'Type Already Exists.', {
      //             timeOut: 3000,
      //           });
      //         }
      //       }
      //       // console.log(data.error.errors[0].validatorKey);
      //     },
      //     (err) => console.log('its error')
      //   );
      // }

      var categoryId = this.registerDetails.categoryId;
      var type = this.registerDetails.type;
      var shortName = this.registerDetails.shortName;

      if (categoryId == '' || categoryId == undefined) {
        this.toastr.warning('Warning!!!', 'category is required!', {
          timeOut: 3000,
        });
        (<HTMLInputElement>document.getElementById('id')).focus();
      }

      if (type == '' || type == undefined) {
        this.toastr.warning('Warning!!!', 'type  is required!', {
          timeOut: 3000,
        });
        (<HTMLInputElement>document.getElementById('id')).focus();
      }

      if (shortName == '' || shortName == undefined) {
        this.toastr.warning('Warning!!!', 'shortName is required!', {
          timeOut: 3000,
        });
        (<HTMLInputElement>document.getElementById('id')).focus();
      }

      this.dataservice.type_postUser(this.registerDetails).subscribe((data) => {
        this.collection = data.data;

        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        this.tabledata();

        if (data.error.errors[0].validatorKey) {
          this.toastr.error('Error!!!', 'Type Already Exists.', {
            timeOut: 3000,
          });
        }

        // this.dataservice.MasterTest_getViewtablerecord1().subscribe((data) => {
        //   this.BackUpdata = data.data;
        // });
      });
    }
  }

  update() {
    if (
      this.registerDetails.type === '' ||
      this.registerDetails.type === undefined
    ) {
      alert('Enter the Details');
    } else {
      // this.submitted = true;
      this.dataservice
        .type_updateSingleUser(this.registerDetails.id, this.registerDetails)
        .subscribe(
          (data) => {
            // alert('Update');
            // console.log(data);
            if (data.data) {
              this.toastr.success('Updated!!!', 'Type Updated Successfully.', {
                timeOut: 3000,
              });
              let currentUrl = this.router.url;
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate([currentUrl]);
              this.tabledata();
            } else {
              if (data.error.errors[0].validatorKey) {
                this.toastr.error('Error!!!', 'Type Already Exists.', {
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
    if (heading == 'Type') {
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
      if (this.SearchField == 'Type') {
        this.collection = this.collection.filter(
          (f) => f.type == this.searchvalue
        );
      }
    }
  }
  reset() {
    this.registerDetails.type = '';
    this.registerDetails.shortName = '';
    this.registerDetails.categoryId = '';
  }
}
