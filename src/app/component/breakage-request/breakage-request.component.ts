import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { BreakageRequest } from './model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-breakage-request',
  templateUrl: './breakage-request.component.html',
  styleUrls: ['./breakage-request.component.scss'],
})
export class BreakageRequestComponent implements OnInit {
  public collection: any[] = [];
  public searchvalue: any;
  public HighlightRow: any;
  public Employee: any[] = [];
  public Location: any[] = [];
  public HighlightHead: any = 1;
  public SearchField: string = 'Type';
  public BackUpdata = [] as any;
  public registerDetails: BreakageRequest = {};
  public timeout: any = null;
  selectedCountryAdvanced: any[] = [];
  filteredCountries: any[] = [];
  countries: any[] = [];
  public user_name: any = [];
  public InstrumentNameof: any = [];
  public InstrumentCodeof: any = [];
  public MachineCode: any = [];
  editAccess: boolean = false;

  public TableHeading = [
    {
      name: 'BreakageNo',
    },
    {
      name: 'Date',
    },
    {
      name: 'InstrumentCode',
    },
    {
      name: 'InstrumentName',
    },
    {
      name: 'MachineCode',
    },
    {
      name: 'Location',
    },
    {
      name: 'Employee',
    },
    // {
    //   name: 'EmployeeName',
    // },
    // {
    //   name: 'HistoryDetails',
    // },

    {
      name: 'BreakageReason',
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
    // let datas = useraccess.filter((element: any) => element.moduleid === 11);
    // this.editAccess = datas[0].Edit;
    this.editAccess = true;

    this.tabledata();
    this.getEmployee();
    this.getLocation();
    this.MachineCodeof();
    this.registerDetails.date = new Date();
    this.user_name = localStorage.getItem('Login_name');

    this.dataservice.BreakageRequest_getViewParticular().subscribe((data) => {
      // console.log(data.data[0].id);
      let limitId = parseInt(data.data[0].id);
      let BreakageNo = 'U4-BR-2022_' + (limitId + 1);
      this.registerDetails.BreakageNo = BreakageNo;
    });
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
    this.dataservice.BreakageRequest_getView2().subscribe((data) => {
      this.collection = data.data;
      this.BackUpdata = data.data;
    });
  }
  update() {
    if (
      this.registerDetails.date === undefined ||
      this.registerDetails.BreakageNo === undefined ||
      this.registerDetails.BreakageReason === undefined ||
      this.registerDetails.InstrumentCode === undefined ||
      this.registerDetails.InstrumentName === undefined ||
      this.registerDetails.MachineCode === undefined ||
      this.registerDetails.Location === undefined ||
      this.registerDetails.Employee === undefined
    ) {
      alert('Enter the Details');
    } else {
      // this.submitted = true;
      this.dataservice
        .BreakageRequest_updateSingleUser(
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
                'BreakageRequest Updated Successfully.',
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
                this.toastr.error(
                  'Error!!!',
                  'BreakageRequest Already Exists.',
                  {
                    timeOut: 3000,
                  }
                );
              }
            }
          },
          (err) => console.log(err)
        );
    }
  }
  getUser1(id: object) {
    this.registerDetails = { ...id };
  }
  public deleteUsers(id: string): void {
    // console.log(id);
    this.dataservice
      .BreakageRequest_DeleteSingleUser(id, this.collection)
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
    //   this.registerDetails.BreakageNo === undefined ||
    //   this.registerDetails.BreakageReason === undefined ||
    //   this.registerDetails.InstrumentCode === undefined ||
    //   this.registerDetails.InstrumentName === undefined ||
    //   this.registerDetails.MachineCode === undefined ||
    //   this.registerDetails.Location === undefined ||
    //   this.registerDetails.Employee === undefined
    // ) {
    //   alert('Enter the Details');
    // } else {
    //   this.dataservice.BreakageRequest_postUser(this.registerDetails).subscribe(
    //     (data) => {
    //       // this.dataservice.BreakageRequest_getView2().subscribe((data) => {
    //       //   this.collection = data.data;
    //       //   this.BackUpdata = data.data;
    //       // });
    //       // alert("Added");
    //       // console.log("Inserted"+data);
    //       if (data.data) {
    //         this.toastr.success(
    //           'Created!!!',
    //           'BreakageRequest Created Successfully.',
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
    //           this.toastr.error('Error!!!', 'BreakageRequest Already Exists.', {
    //             timeOut: 3000,
    //           });
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
    // var EmployeeName = this.registerDetails.EmployeeName;
    var Employeee = this.registerDetails.Employee;
    // var HistryDetails = this.registerDetails.HistryDetails;
    var BreakageReason = this.registerDetails.BreakageReason;
    var BreakageNo = this.registerDetails.BreakageNo;
    // var Type = this.registerDetails.Type;
    var FileUpload = this.registerDetails.FileUpload;
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

    // if (EmployeeName == '' || EmployeeName == undefined) {
    //   this.toastr.warning('Warning!!!', 'EmployeeName   is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    // }

    if (Employeee == '' || Employeee == undefined) {
      this.toastr.warning('Warning!!!', 'EmployeeName   is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    // if (HistryDetails == '' || HistryDetails == undefined) {
    //   this.toastr.warning('Warning!!!', 'HistryDetails    is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    // }

    if (BreakageReason == '' || BreakageReason == undefined) {
      this.toastr.warning('Warning!!!', 'BreakageReason     is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (BreakageNo == '' || BreakageNo == undefined) {
      this.toastr.warning('Warning!!!', 'BreakageNo      is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    // if (Type == '' || Type == undefined) {
    //   this.toastr.warning('Warning!!!', 'Type       is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    // }

    // if (FileUpload   ==undefined || FileUpload    == undefined) {
    //   this.toastr.warning('Warning!!!', 'FileUpload        is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    // }

    // if (file == undefined || file == undefined) {
    //   this.toastr.warning('Warning!!!', 'file         is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    // }
    this.registerDetails.RefNo = this.registerDetails.BreakageNo;
    console.log('register', this.registerDetails);

    this.dataservice
      .BreakageRequest_postUser(this.registerDetails)
      .subscribe((data) => {
        this.collection = data.data;
        if (data.data) {
          this.toastr.success('Created!!!', ' Successfully.', {
            timeOut: 3000,
          });
        }

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
      console.log('name', data.data[0].name);
      this.registerDetails.Employee = data.data[0].name;
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
      // console.log('instrument data', data.data);

      this.InstrumentCodeof = data.data;
      // this.BackUpdata = data.data;
    });
  }

  public MachineCodeof(): void {
    this.dataservice.BreakageRequest_getView().subscribe((data) => {
      console.log('cardcode', data);

      this.MachineCode = data.data;
      console.log('dep', data.data);
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
      (this.registerDetails.InstrumentCode = '');
    this.registerDetails.InstrumentName = '';
    this.registerDetails.MachineCode = '';
    this.registerDetails.Location = '';
    this.registerDetails.Employee = '';
    this.registerDetails.HistryDetails = '';
    this.registerDetails.BreakageReason = '';
    this.registerDetails.BreakageNo = '';

    // this.registerDetails.Type = undefined
    this.registerDetails.FileUpload = undefined;
  }

  instru(event: any) {
    let selectedLaw: any = event.target.value;
    console.log(event.target.value);

    let splitValue = selectedLaw.split(',');
    // console.log(splitValue);
    this.registerDetails.InstrumentName = splitValue[1];
    // console.log(splitValue[0]);
    this.InstrumentCodeof.map((item: any) => {
      if (splitValue[0] === item.InstrumentCode) {
        this.registerDetails.Location = item.Location;
      }
    });
  }
}
