import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { intrument } from './model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
//import { Console } from 'console';

@Component({
  selector: 'app-intrumentmaster',
  templateUrl: './intrumentmaster.component.html',
  styleUrls: ['./intrumentmaster.component.scss'],
})
export class IntrumentmasterComponent implements OnInit {
  public registerDetails: intrument = {};
  public collection: any[] = [];
  public BackUpdata = [] as any;
  public Category: any[] = [];
  public typeId: any[] = [];
  public Type: any[] = [];
  public timeout: any = null;
  public searchvalue: any;
  public HighlightRow: any;
  public HighlightHead: any = 3;
  public user_name: any = [];
  public shortname: any;
  public SearchField: string = 'InstrumentName';
  editAccess: boolean = false;
  public TableHeading = [
    {
      name: 'SI No',
    },
    {
      name: 'Category',
    },
    {
      name: 'Type',
    },
    {
      name: 'Instrument Name',
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
    // let useraccess = JSON.parse(localStorage.getItem('userAccess') || '[]');
    // let datas = useraccess.filter((element: any) => element.moduleid === 3);
    // this.editAccess = datas[0].Edit;
    this.editAccess = true;

    this.tabledata();
    this.getCategory();
    this.getType();
    // this.keyFunc();
    this.user_name = localStorage.getItem('Login_name');
  }
  keyFunc(data: any) {
    this.shortname = data.target.value;
  }
  public getType(): void {
    this.dataservice.MasterType_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.Type = data.data;
      // this.BackUpdata = data.data;
    });
  }

  public getCategory(): void {
    this.dataservice.MasterCategory_getView().subscribe((data) => {
      console.log(data.data);
      this.Category = data.data;
      // this.BackUpdata = data.data;
    });
  }

  public tabledata(): void {
    this.dataservice.instrument_getView().subscribe((data) => {
      console.log(data.data);

      this.collection = data.data;
      this.BackUpdata = data.data;
    });
    //console.log(this.collection);
  }
  public deleteUsers(id: string): void {
    // console.log(id);
    this.dataservice.instrument_DeleteSingleUser(id, this.collection).subscribe(
      (data: any) => {
        this.tabledata();
      },
      (err) => console.log('its error')
    );
  }
  //   public store(): void {
  // if(this.shortname.length<3){
  //   alert("Must have type 3 digits");
  // }
  // else{

  //     if (((this.registerDetails.InstrumentName === undefined) || (this.registerDetails.shortName === undefined) || (this.registerDetails.categoryId === undefined) || (this.registerDetails.typeId === undefined)) || ((this.registerDetails.InstrumentName == "")||(this.registerDetails.shortName == ""))) {
  //       alert("Enter the Details");
  //     }
  //     else {
  //       console.log(this.registerDetails);
  //       this.dataservice.instrument_postUser(this.registerDetails).subscribe(
  //         (data) => {
  //           // alert("Added");
  //            //console.log("Inserted" + data);
  //           if (data.data) {
  //             this.toastr.success('Created!!!', 'Instrument Created Successfully.', {
  //               timeOut: 3000,
  //             });
  //             let currentUrl = this.router.url;
  //             this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //             this.router.onSameUrlNavigation = 'reload';
  //             this.router.navigate([currentUrl]);
  //             this.tabledata();
  //           }
  //           else{
  //             if (data.error.errors[0].validatorKey) {
  //               this.toastr.error('Error!!!', 'Instrument Already Exists.', {
  //                 timeOut: 3000,
  //               });
  //             }
  //           }
  //         }, err => console.log('its error on insert')
  //       );
  //     }
  //   }
  //   }

  public store(): void {
    if (this.shortname.length < 3) {
      this.toastr.error('Error!!!', 'Shortname has more than 3 characters', {
        timeOut: 3000,
      });
    } else {
      // if (
      //   this.registerDetails.shortName === undefined ||
      //   this.registerDetails.categoryId === undefined ||
      //   this.registerDetails.InstrumentName === undefined ||
      //   this.registerDetails.shortName === ''
      // ) {
      //   alert('Enter the Details');
      // } else {
      //   this.dataservice.instrument_postUser(this.registerDetails).subscribe(
      //     (data) => {
      //       // alert("Added");
      //       if (data.data) {
      //         this.toastr.success(
      //           'Created!!!',
      //           'Instrument Created Successfully.',
      //           {
      //             timeOut: 3000,
      //           }
      //         );
      //         let currentUrl = this.router.url;
      //         this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      //         this.router.onSameUrlNavigation = 'reload';
      //         this.router.navigate([currentUrl]);
      //         this.tabledata();
      //       } else {
      //         if (data.error.errors[0].validatorKey) {
      //           this.toastr.error('Error!!!', 'Instrument Already Exists.', {
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
      var type = this.registerDetails.typeId;
      var InstrumentName = this.registerDetails.InstrumentName;
      var shortName = this.registerDetails.shortName;

      if (categoryId == '' || categoryId == undefined) {
        this.toastr.warning('Warning!!!', 'category is required!', {
          timeOut: 3000,
        });
        (<HTMLInputElement>document.getElementById('id')).focus();
        // return false;
      }

      if (type == '' || type == undefined) {
        this.toastr.warning('Warning!!!', 'type  is required!', {
          timeOut: 3000,
        });
        (<HTMLInputElement>document.getElementById('id')).focus();
        //   return false;
      }

      if (InstrumentName == '' || InstrumentName == undefined) {
        this.toastr.warning('Warning!!!', 'InstrumentName is required!', {
          timeOut: 3000,
        });
        (<HTMLInputElement>document.getElementById('id')).focus();
        // return false;
      }

      if (shortName == '' || shortName == undefined) {
        this.toastr.warning('Warning!!!', 'shortName is required!', {
          timeOut: 3000,
        });
        (<HTMLInputElement>document.getElementById('id')).focus();
        // return false;
      }

      this.dataservice
        .instrument_postUser(this.registerDetails)
        .subscribe((data) => {
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
    // alert(this.registerDetails.categoryId)
    if (
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.shortName === '' ||
      String(this.registerDetails.categoryId) === 'undefined'
    ) {
      alert('Enter the Details');
    } else {
      this.dataservice
        .instrument_updateSingleUser(
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
                this.toastr.error('Error!!!', 'Instrument Already Exists.', {
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
  // public Click_Head(index: number, heading: string): void {
  //   this.collection = [...this.BackUpdata];
  //   if (heading == 'Short Name') {
  //     this.SearchField = heading;
  //     this.HighlightHead = index;
  //     this.searchvalue = '';
  //   } else {
  //     // this.toastr.info(`Search Field Invalid`);
  //   }
  // }
  // public Empty(): void {
  //   if (!this.searchvalue) {
  //     this.collection = [...this.BackUpdata];
  //   }
  // }
  // public onKeySearch(event: any) {
  //   clearTimeout(this.timeout);
  //   var $this = this;
  //   this.timeout = setTimeout(function () {
  //     if (event.keyCode != 13) {
  //       $this.SearchBy();
  //     }
  //   }, 1000);
  // }

  // public SearchBy(): void {
  //   // this.searchvalue = this.searchvalue.toUpperCase();
  //   if (this.searchvalue) {
  //     if (this.SearchField == 'Short Name') {
  //       this.collection = this.collection.filter(
  //         (f) => f.shortName == this.searchvalue
  //       );
  //     }
  //     // else if (this.SearchField == "Date") {

  //     //   this.collection = this.collection.filter(f => f.type == this.searchvalue);

  //     // }
  //   }
  // }

  reset() {
    (this.registerDetails.InstrumentName = ''),
      (this.registerDetails.shortName = ''),
      (this.registerDetails.categoryId = ''),
      (this.registerDetails.typeId = '');
  }

  // public Click_Head(index: number, heading: string): void {
  //   this.collection = [...this.BackUpdata];
  //   if (heading == 'InstrumentName') {
  //     this.SearchField = heading;
  //     this.HighlightHead = index;
  //   } else {
  //   }
  // }
  // public Empty(): void {}
  // public onKeySearch(event: any) {}

  // public SearchBy(): void {
  //   // this.searchvalue = this.searchvalue.toUpperCase();
  //   if (this.searchvalue) {
  //     if (this.SearchField == 'InstrumentName') {
  //       this.collection = this.collection.filter(
  //         (f) => f.InstrumentName == this.searchvalue
  //       );
  //     }
  //   }
  // }

  public Click_Head(index: number, heading: string): void {
    this.collection = [...this.BackUpdata];
    if (heading == 'Type') {
      this.SearchField = heading;
      this.HighlightHead = index;
    } else {
      // this.toastr.info(`Search Field Invalid`);
    }
  }
  public Empty(): void {}
  public onKeySearch(event: any) {}

  category(event: any, data: any = '') {
    // alert(event.target.value);
    // console.log('data', data);

    let selectedvalue1: any = event != '' ? event.target.value : data;
    // console.log('ddddddddddddddddd', selectedvalue1);

    this.dataservice.categorydetails(selectedvalue1).subscribe((data) => {
      // console.log('typeeee', data);
      this.Type = data.data;
      // console.log(this.Category);
      // this.BackUpdata = data.data;
    });
  }
}
