import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { BreakageDetails } from './model';
import { ToastrService } from 'ngx-toastr';
import { BreakageListDetails } from 'src/app/breakage-list-details/model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dialogmodel } from './dialogmodel';
import { modaltextbox } from './modaltextbox';
import { conreject1 } from './conreject-modal';

@Component({
  selector: 'app-breagedetails',
  templateUrl: './breagedetails.component.html',
  styleUrls: ['./breagedetails.component.scss'],
})
export class BreagedetailsComponent implements OnInit {
  public collection: any[] = [];
  public searchvalue: any;
  public HighlightRow: any;
  public Employee: any[] = [];
  public Location: any[] = [];
  public HighlightHead: any = 1;
  public SearchField: string = '';
  public BackUpdata = [] as any;
  public registerDetails: BreakageDetails = {};
  public timeout: any = null;
  public selectedCountryAdvanced: any[] = [];
  public filteredCountries: any[] = [];
  public countries: any[] = [];
  public user_name: any = [];
  // public handleValidation: any = [];
  public InstrumentNameof: any = [];
  public InstrumentCodeof: any = [];
  public calibrationtypeof: any = [];
  public Requesttypeof: any = [];
  public calibrationtype: any = [];
  public Requesttype: any = [];

  constructor(
    private dataservice: DataService,
    private toastr: ToastrService,
    private router: Router,
    private routers: ActivatedRoute,
    public dialog: MatDialog
  ) {
    if (this.routers.snapshot.queryParams.id) {
      alert(this.routers.snapshot.queryParams.id);

      this.dataservice
        .BreakageRequest_getViewData(this.routers.snapshot.queryParams.id)
        .subscribe(
          (data: any) => {
            console.log(data);
            this.registerDetails.InstrumentName = data.data[0].InstrumentName;
            this.registerDetails.InstrumentCode = data.data[0].InstrumentCode;
            this.registerDetails.MachineCode = data.data[0].MachineCode;
            this.registerDetails.Location = data.data[0].Location;
            this.registerDetails.Employee = data.data[0].Employee;
          },
          (err) => console.log('its error')
        );
    }
  }

  ngOnInit(): void {
    this.tabledata();
    this.getEmployee();
    this.getLocation();
    // this.getrequesttype();
    this.registerDetails.date = new Date();
    this.user_name = localStorage.getItem('Login_name');

    // this.dataservice
    //   .getfromAssest(`assets/model/countries.json`)
    //   .subscribe((data: []) => {
    //     this.countries = data;
    //     console.log(this.countries);
    //   });
  }

  Dialog() {
    // const dialogRef = this.dialog.open(DialogOverviewExampleDialog);

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });

    if (
      this.registerDetails.date === undefined ||
      this.registerDetails.BreakageReason === '' ||
      this.registerDetails.calibrationtype === undefined ||
      this.registerDetails.Requesttype === undefined ||
      this.registerDetails.InstrumentCode === undefined ||
      this.registerDetails.InstrumentName === undefined ||
      this.registerDetails.MachineCode === undefined ||
      this.registerDetails.Location === undefined ||
      this.registerDetails.Employee === undefined ||
      this.registerDetails.Calibrationlocation === undefined
    ) {
      alert('Enter the Details');
      // } else {
      //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog);

      //   dialogRef.afterClosed().subscribe((result) => {
      //     console.log(`Dialog result: ${result}`);

      //     this.dataservice
      //       .BreakageDetails_postUser(this.registerDetails)
      //       .subscribe(
      //         (data) => {
      //           console.log(data.data);

      //           if (data.data) {
      //             this.toastr.success('Created!!!', ' Successfully.', {
      //               timeOut: 3000,
      //             });
      //           }
      //         },
      //         (err) => console.log('its error')
      //       );
      //   });
    }
  }

  openDialogAccept() {
    debugger;
    if (
      this.registerDetails.date === undefined ||
      this.registerDetails.BreakageReason === '' ||
      this.registerDetails.BreakageReason === undefined ||
      this.registerDetails.calibrationtype === undefined ||
      this.registerDetails.Requesttype === undefined ||
      this.registerDetails.InstrumentCode === undefined ||
      this.registerDetails.InstrumentName === undefined ||
      this.registerDetails.MachineCode === undefined ||
      this.registerDetails.Location === undefined ||
      this.registerDetails.Employee === undefined ||
      this.registerDetails.Calibrationlocation === undefined
    ) {
      alert('Enter the Details');
    } else {
      const dialogRef = this.dialog.open(DialogContentExampleDialog);

      // dialogRef.afterClosed().subscribe((result) => {
      //   console.log(`Dialog result: ${result}`);

      //   this.dataservice
      //     .BreakageDetails_postUser(this.registerDetails)
      //     .subscribe(
      //       (data) => {
      //         console.log(data.data);

      //         if (data.data) {
      //           this.toastr.success('Created!!!', ' Successfully.', {
      //             timeOut: 3000,
      //           });
      //         }
      //       },
      //       (err) => console.log('its error')
      //     );
      // });
    }
  }

  conditionalrejection2() {
    if (
      this.registerDetails.date === undefined ||
      this.registerDetails.BreakageReason === '' ||
      this.registerDetails.BreakageReason === undefined ||
      this.registerDetails.calibrationtype === undefined ||
      this.registerDetails.Requesttype === undefined ||
      this.registerDetails.InstrumentCode === undefined ||
      this.registerDetails.InstrumentName === undefined ||
      this.registerDetails.MachineCode === undefined ||
      this.registerDetails.Location === undefined ||
      this.registerDetails.Employee === undefined ||
      this.registerDetails.Calibrationlocation === undefined
    ) {
      alert('Enter the Details');
    }
    // else {
    //   const dialogRef = this.dialog.open(conrejection2);
    //   dialogRef.afterClosed().subscribe((result) => {
    //     console.log(`Dialog result: ${result}`);
    //     this.dataservice
    //       .BreakageDetails_postUser(this.registerDetails)
    //       .subscribe(
    //         (data) => {
    //           console.log(data.data);
    //           if (data.data) {
    //             this.toastr.success('Created!!!', ' Successfully.', {
    //               timeOut: 3000,
    //             });
    //           }
    //         },
    //         (err) => console.log('its error')
    //       );
    //   });
    // }
  }

  filterCountry(event: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }
  private tabledata(): void {
    this.dataservice.BreakageDetails_getView().subscribe((data) => {
      this.collection = data.data;
      this.BackUpdata = data.data;
    });
  }
  update() {
    if (
      this.registerDetails.date === undefined ||
      this.registerDetails.BreakageReason === undefined ||
      this.registerDetails.calibrationtype === '' ||
      this.registerDetails.Requesttype === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.MachineCode === undefined ||
      this.registerDetails.Location === undefined ||
      this.registerDetails.Employee === undefined ||
      this.registerDetails.Calibrationlocation === ''
    ) {
      alert('Enter the Details');
    } else {
      // this.submitted = true;
      this.dataservice
        .BreakageDetails_updateSingleUser(
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
                this.toastr.error('Error!!!', ' Already Exists.', {
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
      .BreakageDetails_DeleteSingleUser(id, this.collection)
      .subscribe(
        (data: any) => {
          this.tabledata();
        },
        (err) => console.log('its error')
      );
  }

  public store(): void {
    // if (
    //   this.registerDetails.date === undefined ||
    //   this.registerDetails.BreakageReason === undefined ||
    //   this.registerDetails.calibrationtype === undefined ||
    //   this.registerDetails.InstrumentCode === undefined ||
    //   this.registerDetails.InstrumentName === undefined ||
    //   this.registerDetails.MachineCode === undefined ||
    //   this.registerDetails.Location === undefined ||
    //   this.registerDetails.Employee === undefined ||
    //   this.registerDetails.Requesttype === undefined ||
    //   this.registerDetails.Calibrationlocation === undefined
    // ) {
    //   alert('Enter the Details');
    // } else {
    //   this.dataservice.BreakageDetails_postUser(this.registerDetails).subscribe(
    //     (data) => {
    //       // alert("Added");
    //       // console.log("Inserted"+data);
    //       if (data.data) {
    //         this.toastr.success('Created!!!', 'Created Successfully.', {
    //           timeOut: 3000,
    //         });
    //         // let currentUrl = this.router.url;
    //         // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //         // this.router.onSameUrlNavigation = 'reload';
    //         // this.router.navigate([currentUrl]);
    //         // this.tabledata();
    //       } else {
    //         if (data.error.errors[0].validatorKey) {
    //           this.toastr.error('Error!!!', ' Already Exists.', {
    //             timeOut: 3000,
    //           });

    //           // this.tabledata();
    //         }
    //       }
    //     },
    //     (err) => console.log('its error')
    //   );
    // }

    var date = this.registerDetails.date;
    var InstrumentCode = this.registerDetails.InstrumentCode;
    var InstrumentName = this.registerDetails.InstrumentName;
    var MachineCode = this.registerDetails.MachineCode;
    var Location = this.registerDetails.Location;
    var Employee = this.registerDetails.Employee;
    var HistryDetails = this.registerDetails.HistryDetails;
    var BreakageReason = this.registerDetails.BreakageReason;
    var calibrationtype = this.registerDetails.calibrationtype;
    var Calibrationlocation = this.registerDetails.Calibrationlocation;
    var file = this.registerDetails.file;

    if (date == undefined || date == undefined) {
      this.toastr.warning('Warning!!!', 'date is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (InstrumentCode == '' || InstrumentCode == undefined) {
      this.toastr.warning('Warning!!!', 'InstrumentCode  is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (InstrumentName == '' || InstrumentName == undefined) {
      this.toastr.warning('Warning!!!', 'InstrumentName is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (MachineCode == '' || MachineCode == undefined) {
      this.toastr.warning('Warning!!!', 'MachineCode is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Location == '' || Location == undefined) {
      this.toastr.warning('Warning!!!', 'Location is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Employee == '' || Employee == undefined) {
      this.toastr.warning('Warning!!!', 'Employee is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (HistryDetails == '' || HistryDetails == undefined) {
      this.toastr.warning('Warning!!!', 'HistryDetails is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (BreakageReason == '' || BreakageReason == undefined) {
      this.toastr.warning('Warning!!!', 'BreakageReason  is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (calibrationtype == '' || calibrationtype == undefined) {
      this.toastr.warning('Warning!!!', 'calibrationtype  is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Calibrationlocation == '' || Calibrationlocation == undefined) {
      this.toastr.warning('Warning!!!', 'Calibrationlocation  is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (file == undefined || file == undefined) {
      this.toastr.warning('Warning!!!', 'file  is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    this.dataservice
      .BreakageDetails_postUser(this.registerDetails)
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
  public getEmployee(): void {
    this.dataservice.GetEmplyee_user().subscribe((data) => {
      console.log(data);
      this.Employee = data.data;
      // console.log("usdhfshdgoifdhgi");
      // console.log(this.Employee);
      // this.BackUpdata = data.data;
    });
  }
  // Calibrationlocationmaster_getView
  public getLocation(): void {
    this.dataservice.Calibrationlocationmaster_getView().subscribe((data) => {
      console.log(data);
      this.Location = data.data;
      // console.log("usdhfshdgoifdhgi");
      console.log(this.Location);
      // this.BackUpdata = data.data;
    });

    this.dataservice.MasterCali_Request_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.Requesttypeof = data.data;
      // this.BackUpdata = data.data;
    });

    this.dataservice.MasterTest_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.InstrumentNameof = data.data;
      // this.BackUpdata = data.data;
    });

    this.dataservice.MasterTest_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.InstrumentCodeof = data.data;
      // this.BackUpdata = data.data;
    });

    this.dataservice.calibrationtype_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.calibrationtypeof = data.data;
      // this.BackUpdata = data.data;
    });

    this.dataservice.MasterCali_Request_getView().subscribe((data) => {
      // console.log("dfgsdfgdfg",data.data);
      this.calibrationtypeof = data.data;
      // this.BackUpdata = data.data;
    });
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

  // $('#exampleModal').on('show.bs.modal', function (event) {
  //   var checkbox = $(event.relatedTarget)
  //   var recipient = checkbox.data('whatever')
  //   var modal = $(this)
  //   modal.find('.modal-title').text('New message to ' + recipient)
  //   modal.find('.modal-body input').val(recipient)
  // })

  reset() {
    (this.registerDetails.date = undefined),
      (this.registerDetails.InstrumentCode = undefined);
    this.registerDetails.InstrumentName = undefined;
    this.registerDetails.MachineCode = undefined;
    this.registerDetails.Location = undefined;
    this.registerDetails.Employee = undefined;
    this.registerDetails.HistryDetails = undefined;
    this.registerDetails.BreakageReason = undefined;
    this.registerDetails.calibrationtype = undefined;
    this.registerDetails.Requesttype = undefined;
    this.registerDetails.Calibrationlocation = undefined;
    this.registerDetails.FileUpload = undefined;
  }
}
// import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'dailog-models',
  templateUrl: 'dailog-models.html',
})
export class DialogContentExampleDialog {
  public registerDetails: dialogmodel = {};
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    private dataservice: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onNoClick1(): void {
    console.log(this.registerDetails);

    // if (
    //   this.registerDetails.date === undefined ||
    //   this.registerDetails.BreakageReason === ''
    // ) {
    //   alert('Enter the Details');
    // } else {
    //   this.dataservice.BreakageDetails_postUser(this.registerDetails).subscribe(
    //     (data) => {
    //       // alert("Added");
    //       // console.log("Inserted"+data);
    //       if (data.data) {
    //         this.toastr.success('Created!!!', ' Created Successfully.', {
    //           timeOut: 3000,
    //         });
    //         let currentUrl = this.router.url;
    //         this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //         this.router.onSameUrlNavigation = 'reload';
    //         this.router.navigate([currentUrl]);
    //       } else {
    //         if (data.error.errors[0].validatorKey) {
    //           this.toastr.error('Error!!!', ' Already Exists.', {
    //             timeOut: 3000,
    //           });
    //         }
    //       }
    //     },
    //     (err) => console.log('its error')
    //   );
    // }
    // setTimeout(() => {
    //   this.dialogRef.close();
    // }, 1000);
  }
}

@Component({
  selector: 'modal-textbox',
  templateUrl: 'modal-textbox.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private dataservice: DataService,
    private toastr: ToastrService,
    private router: Router // @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'con-rejection',
  templateUrl: 'con-rejection.html',
})
export class conrejection2 {
  constructor(public dialogRef: MatDialogRef<conrejection2>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
