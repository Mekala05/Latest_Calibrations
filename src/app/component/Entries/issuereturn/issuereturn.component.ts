import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IssueReturn } from './model';
import { identifierModuleUrl } from '@angular/compiler';
@Component({
  selector: 'app-issuereturn',
  templateUrl: './IssueReturn.component.html',
  styleUrls: ['./IssueReturn.component.scss'],
})
export class IssuereturnComponent implements OnInit {
  public collection: any[] = [];
  public searchvalue: any;
  public HighlightRow: any;
  public registerDetails: IssueReturn = {};
  public HighlightHead: any = 1;
  public SearchField: string = '';
  public BackUpdata = [] as any;
  public user_name: any = [];
  public value: any = [];
  public Location: any[] = [];
  public InstrumentNameof: any = [];
  public InstrumentCodeof: any = [];
  public loadContent: boolean = false;
  public data = [];
  public MachineCode: any = [];
  public settings = {};
  public selectedItems = [];
  public timeout: any = null;
  public code: any[] = [];
  public editAccess: boolean = false;
  public TableHeading = [
    // {
    //   name: 'SI No',
    // },
    // {
    //   name: 'id',
    // },
    {
      name: 'IssueNo',
    },
    {
      name: 'IssueDate',
    },
    {
      name: 'InstrumentCode',
    },
    // {
    //   name: 'InstrumentName',
    // },
    {
      name: 'MachineCode',
    },
    {
      name: 'Location',
    },
    // {
    //   name: 'Quantity',
    // },
    // {
    //   name: 'ReturnDate',
    // },
    // {
    //   name: 'ReturnNo',
    // },
    // {
    //   name: 'InstrumentDetails',
    // },
    {
      name: 'Create On',
    },
    {
      name: 'Create_By',
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
    // let datas = useraccess.filter((element: any) => element.moduleid === 14);
    // this.editAccess = datas[0].Edit;
    this.editAccess = true;

    // this.collection = [];
    // document.getElementById('tabledata')
    //this.tabledata();
    this.registerDetails.IssueDate = new Date();

    // this.registerDetails.ReturnDate = new Date();
    this.registerDetails.Quantity = '1';
    this.user_name = localStorage.getItem('Login_name');
    // this.registerDetails.IssueNo="0001";

    this.dataservice.IssueReturn_getViewParticular().subscribe((data) => {
      // console.log(data.data[0].id);
      let limitId = parseInt(data.data[0].id);
      let IssueNo = 'u4-IS-2022_' + (limitId + 1);
      this.registerDetails.IssueNo = IssueNo;
    });

    // this.dataservice.IssueReturn_getView3().subscribe((data) => {
    //   this.collection = data.data;
    //   this.BackUpdata = data.data;
    // });

    this.dataservice.Calibrationlocationmaster_getView().subscribe((data) => {
      this.Location = data.data;
    });

    this.dataservice.BreakageRequest_getView().subscribe((data) => {
      // console.log('cardcode', data);
      this.MachineCode = data.data;
      // console.log('dep', data.data);
    });

    this.dataservice.MasterTest_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.InstrumentNameof = data.data;
      // this.BackUpdata = data.data;
    });
    this.dataservice.MasterTest_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      // this.InstrumentCodeof = data.data;
      // this.BackUpdata = data.data;
      if (data.data != '') {
        for (let i = 0; i < data.data.length; i++) {
          this.code = data.data[i].InstrumentCode;
          const ICode = {
            name: this.code,
          };
          this.InstrumentCodeof.push(ICode);
          this.BackUpdata = data.data;
        }
      } else {
        this.toastr.error('No Data!!!', 'Data Not Found!.', {
          timeOut: 3000,
        });
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        // alert("No data avaliable");
      }
    });
  }

  private tabledata(): void {
    this.dataservice.IssueReturn_getView3().subscribe((data) => {
      this.collection = data.data;
      this.BackUpdata = data.data;
    });

    this.dataservice.Calibrationlocationmaster_getView().subscribe((data) => {
      this.Location = data.data;
    });

    this.dataservice.BreakageRequest_getView().subscribe((data) => {
      // console.log('cardcode', data);
      this.MachineCode = data.data;
      // console.log('dep', data.data);
    });

    this.dataservice.MasterTest_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.InstrumentNameof = data.data;
      // this.BackUpdata = data.data;
    });
    this.dataservice.MasterTest_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      // this.InstrumentCodeof = data.data;
      // this.BackUpdata = data.data;
      if (data.data != '') {
        for (let i = 0; i < data.data.length; i++) {
          this.code = data.data[i].InstrumentCode;
          const ICode = {
            name: this.code,
          };
          this.InstrumentCodeof.push(ICode);
          this.BackUpdata = data.data;
        }
      } else {
        this.toastr.error('No Data!!!', 'Data Not Found!.', {
          timeOut: 3000,
        });
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        // alert("No data avaliable");
      }
    });
  }
  update() {
    if (
      this.registerDetails.IssueDate === undefined ||
      this.registerDetails.IssueNo === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.MachineCode === '' ||
      this.registerDetails.Location === ''
    ) {
      alert('Enter the Details');
    } else {
      // this.submitted = true;
      this.dataservice
        .IssueReturn_updateSingleUser(
          this.registerDetails.id,
          this.registerDetails
        )
        .subscribe(
          (data) => {
            // alert("Update");
            // console.log(data);
            if (data.data) {
              this.toastr.success(
                'Updated!!!',
                'IssueReturn Updated Successfully.',
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
                this.toastr.error('Error!!!', 'issueReturn Already Exists.', {
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
  public deleteUsers(id: string): void {
    // console.log(id);
    this.dataservice
      .IssueReturn_DeleteSingleUser(id, this.collection)
      .subscribe(
        (data: any) => {
          // this.tabledata();
        },
        (err) => console.log('its error')
      );
  }
  public store(): void {}

  public store1(): void {
    // this.InstrumentCodeof = this.registerDetails.InstrumentCode?.toString();
    // this.registerDetails.InstrumentCode = this.InstrumentCodeof;

    // if (
    //   this.registerDetails.IssueDate === undefined ||
    //   this.registerDetails.IssueNo === undefined ||
    //   this.registerDetails.IssueNo === '' ||
    //   this.registerDetails.InstrumentCode === '' ||
    //   this.registerDetails.InstrumentName === '' ||
    //   this.registerDetails.MachineCode === '' ||
    //   this.registerDetails.Location === ''
    // ) {
    //   alert('Enter the Details');
    // } else {
    //   this.dataservice.IssueReturn_postUser(this.registerDetails).subscribe(
    //     (data) => {
    //       this.dataservice.IssueReturn_getView3().subscribe((data) => {
    //         //debugger;
    //         console.log('data:', data.data);
    //         this.collection = data.data;
    //         console.log('collection:', this.collection);
    //         this.BackUpdata = data.data;
    //       });
    //       //this.tabledata();

    //       // alert('Added');
    //       // console.log("Inserted"+data);
    //       if (data.data) {
    //         this.toastr.success(
    //           'Created!!!',
    //           'IssueReturn Created Successfully.',
    //           {
    //             timeOut: 3000,
    //           }
    //         );

    //         // let currentUrl = this.router.url;
    //         // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //         // this.router.onSameUrlNavigation = 'reload';
    //         // this.router.navigate([currentUrl]);
    //         //this.tabledata();
    //       } else {
    //         if (data.error.errors[0].validatorKey) {
    //           this.toastr.error('Error!!!', 'IssueReturn Already Exists.', {
    //             timeOut: 3000,
    //           });
    //         }
    //       }

    //     },
    //     (err) => console.log('its error')
    //   );
    // }

    var IssueDate = this.registerDetails.IssueDate;
    var IssueNo = this.registerDetails.IssueNo;
    var InstrumentCode = this.registerDetails.InstrumentCode;
    // var InstrumentName = this.registerDetails.InstrumentName;
    var MachineCode = this.registerDetails.MachineCode;
    var Location = this.registerDetails.Location;
    var Quantity = this.registerDetails.Quantity;

    if (IssueDate == undefined || IssueDate == undefined) {
      this.toastr.warning('Warning!!!', 'IssueDate is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (IssueNo == undefined || IssueNo == undefined) {
      this.toastr.warning('Warning!!!', 'IssueNo is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (InstrumentCode == undefined || InstrumentCode == undefined) {
      this.toastr.warning('Warning!!!', 'InstrumentCode is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    // if (InstrumentName == undefined || InstrumentName == undefined) {
    //   this.toastr.warning('Warning!!!', 'InstrumentName is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    // }

    if (MachineCode == undefined || MachineCode == undefined) {
      this.toastr.warning('Warning!!!', 'MachineCode is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Location == undefined || Location == undefined) {
      this.toastr.warning('Warning!!!', 'Location is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Quantity == undefined || Quantity == undefined) {
      this.toastr.warning('Warning!!!', 'Quantity is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }
    // let code = this.registerDetails.InstrumentCode;
    // // this.registerDetails.InstrumentCode = 
    // console.log('code',code[0]);
    console.log(typeof this.registerDetails.InstrumentCode);
    
    
    this.dataservice
      .IssueReturn_postUser(this.registerDetails)
      .subscribe((data) => {
        this.collection = data.data;

        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        this.tabledata();
      });
  }

  public Click_Head(index: number, heading: string): void {
    this.collection = [...this.BackUpdata];
    if (heading == 'Type' || heading == 'Create On') {
      this.SearchField = heading;
      this.HighlightHead = index;
      this.searchvalue = '';
    } else {
      // this.toastr.info(`Search Field Invalid`);
    }
  }
  public Empty(): void {
    if (!this.searchvalue) {
      this.collection = [...this.BackUpdata];
    }
  }
  public onKeySearch(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.SearchBy();
      }
    }, 1000);
  }
  public SearchBy(): void {
    // this.searchvalue = this.searchvalue.toUpperCase();
    if (this.searchvalue) {
      if (this.SearchField == 'Type') {
        this.collection = this.collection.filter(
          (f) => f.type == this.searchvalue
        );
      } else if (this.SearchField == 'Date') {
        this.collection = this.collection.filter(
          (f) => f.type == this.searchvalue
        );
      }
    }
  }
  reset() {
    this.registerDetails.IssueDate = new Date();
    this.registerDetails.IssueNo = '';
    this.registerDetails.InstrumentCode = '';
    this.registerDetails.InstrumentName = '';
    this.registerDetails.MachineCode = '';
    this.registerDetails.Location = '';
    // this.registerDetails.Quantity = '';
    // this.registerDetails.ReturnDate = new Date();
    // this.registerDetails.ReturnNo = '';
    // this.registerDetails.InstrumentDetails = ''
  }

  // private tabledata(): void {}
}
