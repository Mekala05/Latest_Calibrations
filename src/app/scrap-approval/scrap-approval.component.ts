import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { ScrapApproval } from './model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scrap-approval',
  templateUrl: './scrap-approval.component.html',
  styleUrls: ['./scrap-approval.component.scss'],
})
export class ScrapApprovalComponent implements OnInit {
  public collection: any[] = [];
  public searchvalue: any;
  public HighlightRow: any;
  public Employee: any[] = [];
  public Location: any[] = [];
  public HighlightHead: any = 1;
  public SearchField: string = 'Type';
  public BackUpdata = [] as any;
  public registerDetails: ScrapApproval = {};
  public timeout: any = null;
  public selectedCountryAdvanced: any[] = [];
  public filteredCountries: any[] = [];
  public countries: any[] = [];
  public user_name: any = [];
  public InstrumentNameof: any = [];
  public InstrumentCodeof: any = [];

  // public TableHeading = [
  //   {
  //     name: 'SI No',
  //   },
  //   {
  //     name: 'Date',
  //   },
  //   {
  //     name: 'InstrumentCode',
  //   },
  //   {
  //     name: 'InstrumentName',
  //   },
  //   {
  //     name: 'MachineCode',
  //   },
  //   {
  //     name: 'Location',
  //   },
  //   {
  //     name: 'Employee',
  //   },
  //   // {
  //   //   name: 'EmployeeName',
  //   // },
  //   // {
  //   //   name: 'HistoryDetails',
  //   // },

  //   {
  //     name: 'BreakageReason',
  //   },
  //   {
  //     name: 'Type',
  //   },
  //   // {
  //   //   name: 'FileUpload',
  //   // },
  //   {
  //     name: 'Create On',
  //   },
  //   {
  //     name: 'Create By',
  //   },
  //   {
  //     name: 'Update On',
  //   },
  //   {
  //     name: 'Update By',
  //   },
  //   {
  //     name: 'Edit',
  //   },
  //   {
  //     name: 'Delete',
  //   },
  // ];

  constructor(
    private dataservice: DataService,
    private toastr: ToastrService,
    private router: Router,
    private routers: ActivatedRoute
  ) {
    console.log(this.routers.snapshot.queryParams);

    if (this.routers.snapshot.queryParams.id) {
      this.dataservice.Entry_getView().subscribe((data: any) => {
        data.data.map((item: any) => {
          if (item.id === parseInt(this.routers.snapshot.queryParams.id)) {
            console.log('inside if');

            this.registerDetails.InstrumentName = item.InstrumentName;
            this.registerDetails.InstrumentCode = item.InstrumentCode;
          }
        });
      });
      // this.dataservice.Request_getView().subscribe((data) => {
      //   data.data.map((item: any) => {
      //     console.log(
      //       'register',
      //       this.registerDetails.InstrumentCode,
      //       'item',
      //       item.InstrumentCode
      //     );
      //     if (this.registerDetails.InstrumentCode) {
      //       let registerInstrument =
      //         this.registerDetails.InstrumentCode.split(',');
      //       let itemInstrument = item.InstrumentCode.split(',');

      //       console.log(registerInstrument[0]);
      //       console.log(itemInstrument[0]);

      //       console.log(registerInstrument[0] === itemInstrument[0]);

      //       if (registerInstrument[0] === itemInstrument[0]) {
      //         this.registerDetails.Location = item.calibrationlocation;
      //       }
      //     }
      //   });
      // });
      //   this.dataservice
      //     .Entry_getViewdata(this.routers.snapshot.queryParams.id)
      //     .subscribe(
      //       (data: any) => {
      //         console.log(data);
      //         this.registerDetails.InstrumentName = data.data[0].InstrumentName;
      //         this.registerDetails.InstrumentCode = data.data[0].InstrumentCode;
      //       },
      //       (err) => console.log('its error')
      //     );

      //   // }
    }
    // this.routers.queryParams.subscribe(test => {
    //   this.userId = test
    // });
  }

  ngOnInit(): void {
    this.tabledata();
    // this.getEmployee();
    // this.getLocation();
    this.registerDetails.date = new Date();
    this.user_name = localStorage.getItem('Login_name');

    // this.dataservice
    //   .getfromAssest(`assets/model/countries.json`)
    //   .subscribe((data: []) => {
    //     this.countries = data;
    //     console.log(this.countries);
    //   });
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
    this.dataservice.ScrapApproval_getView().subscribe((data) => {
      this.collection = data.data;
      this.BackUpdata = data.data;
    });
  }
  update() {
    if (
      this.registerDetails.date === undefined ||
      this.registerDetails.BreakageReason === '' ||
      this.registerDetails.Type === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.Location === ''
    ) {
      alert('Enter the Details');
    } else {
      // this.submitted = true;
      this.dataservice
        .ScrapApproval_updateSingleUser(
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
                'ScrapApproval Updated Successfully.',
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
                this.toastr.error('Error!!!', 'ScrapApproval Already Exists.', {
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
      .ScrapApproval_DeleteSingleUser(id, this.collection)
      .subscribe(
        (data: any) => {
          this.tabledata();
        },
        (err) => console.log('its error')
      );
  }
  public store(): void {
    if (
      this.registerDetails.date === undefined ||
      this.registerDetails.BreakageReason === undefined ||
      this.registerDetails.Type === undefined ||
      this.registerDetails.InstrumentCode === undefined ||
      this.registerDetails.InstrumentName === undefined ||
      this.registerDetails.Location === undefined
    ) {
      alert('Enter the Details');
    } else {
      this.dataservice.BreakageDetails_postUser(this.registerDetails).subscribe(
        (data) => {
          // alert("Added");
          // console.log("Inserted"+data);
          if (data.data) {
            this.toastr.success(
              'Created!!!',
              'ScrapApproval Created Successfully.',
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
              this.toastr.error('Error!!!', 'ScrapApproval Already Exists.', {
                timeOut: 3000,
              });
            }
          }
        },
        (err) => console.log('its error')
      );
    }
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
    (this.registerDetails.date = undefined),
      (this.registerDetails.InstrumentCode = undefined);
    this.registerDetails.InstrumentName = undefined;
    this.registerDetails.Location = '';
    this.registerDetails.BreakageReason = '';
    this.registerDetails.Type = undefined;
    this.registerDetails.FileUpload = undefined;
  }
}
