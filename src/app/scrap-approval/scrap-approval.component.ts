import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { ScrapApproval } from './model';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, getLocaleFirstDayOfWeek } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { conrejection } from '../component/Entries/calibrationentry/con-rejection';
import { isNgTemplate } from '@angular/compiler';
import { master } from '../component/calibrationmaster/model';

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
  public remove: any;
  public Redate: any;
  public MxLifeTimeNumber: any;
  public MxLifeTime: any;
  public inputvalue: any;
  public TotalDay: any;
  public dueDate: string = '';
  public id: any;
  public status: any;
  public option: any;
  public Data: any;
  public entry: any;
  public editAccess: boolean = false;
  public master: master = {};
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
    private routers: ActivatedRoute,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {
    console.log(this.routers.snapshot.queryParams);

    if (this.routers.snapshot.queryParams.id) {
      this.dataservice.Entry_getView().subscribe((data: any) => {
        data.data.map((item: any) => {
          if (item.id === parseInt(this.routers.snapshot.queryParams.id)) {
            this.entry = item;
            this.dataservice.setAdmin(item);
            // console.log(item);

            this.id = item.id;
            this.registerDetails.InstrumentName = item.InstrumentName;
            let instrument = item.InstrumentCode.split(',');
            let code = instrument[0];
            this.registerDetails.InstrumentCode = code;
            this.registerDetails.BreakageReason = item.conditionRemark;
            this.dataservice.MasterTest_getViewData().subscribe((pack: any) => {
              this.Data = pack.data;
              pack.data.map((element: any) => {
                // console.log(element);

                if (
                  element.InstrumentCode === code &&
                  item.InstrumentName === element.InstrumentName
                ) {
                  // console.log('loc', element.calibrationlocation);
                  this.master = element;
                  console.log('master element', element);

                  this.registerDetails.Location = element.Location;
                }
              });
            });
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
    let useraccess = JSON.parse(localStorage.getItem('userAccess') || '[]');
    console.log('user',useraccess);
    
    let datas = useraccess.filter((element: any) => element.moduleid === 13);
    console.log('data',datas);
    
    this.editAccess = datas[0].Edit;
    // this.editAccess = true;

    this.registerDetails.Approve = false;
    this.registerDetails.Reject = false;
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

  getApprove(eve: any) {
    // console.log(eve.target.checked);
    this.remove = eve.target.checked;
    this.registerDetails.Reject = this.remove;
  }

  accept() {
    // this.dataservice.MasterTest_getViewData().subscribe((data: any) => {
    // console.log('data', data);
    // this.Data = data;
    this.Data.map((item: any) => {
      if (this.registerDetails.InstrumentCode) {
        let splittedCode = this.registerDetails.InstrumentCode.split(',');
        let code = splittedCode[0];
        let name = splittedCode[1];

        if (item.InstrumentCode === code && item.InstrumentName === name) {
          // console.log('item', item.InstrumentCode);
          // console.log('code', code);
          this.entry.status = 'Accept';
          this.entry.option = 'None';
          let sample = new Date(item.date);
          console.log('sample', sample);
          console.log('register', this.registerDetails.date);

          this.modifyDate(sample, this.registerDetails.date, item);
        }
      }
      // });
    });

    // console.log('Data', this.Data);

    // if (this.registerDetails) {
    //   this.dataservice
    //     .Entry_updateSingleUser(this.Data.id, this.Data)
    //     .subscribe((data) => {
    //       let currentUrl = this.router.url;
    //       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //       this.router.onSameUrlNavigation = 'reload';
    //       this.router.navigate([currentUrl]);
    //       this.tabledata();
    //     });
    // }
  }

  modifyDate(_modifydate1: any, _modifydate2: any, data: any) {
    let date1 = this.datePipe.transform(new Date(_modifydate1), 'YYYY-MM-dd');
    // let sample_date = new Date(_modifydate2);
    let date2 = this.datePipe.transform(_modifydate2, 'YYYY-MM-dd');
    if (date1 && date2) {
      if (date2 === date1) {
        let dateValue = new Date(date2);
        // if(dateValue !== null) {
        this.dueDate = JSON.stringify(
          this.datePipe.transform(dateValue, 'dd-MMM-YYYY')
        );
        // }
      }
      // console.log('date', date1 < date2);
      // console.log('data.max', data.MxLifeTime);

      if (date1 < date2) {
        this.TotalDay = 0;
        let today = new Date();
        let todayDate = this.datePipe.transform(today, 'MM/dd/YYYY');
        let compareDate1 = new Date(`${todayDate}`);

        let reversedDate1 = this.datePipe.transform(date1, 'MM/dd/YYYY');
        let compareDate2 = new Date(`${reversedDate1}`);
        let reversedDate2 = this.datePipe.transform(date2, 'MM/dd/YYYY');
        let compareDate3 = new Date(`${reversedDate2}`);

        var Time1 = compareDate1.getTime() - compareDate2.getTime();
        var Time2 = compareDate3.getTime() - compareDate1.getTime();

        var Day1 = Time1 / (1000 * 3600 * 24); //Difference in Day
        var Day2 = Time2 / (1000 * 3600 * 24);
        // console.log(Day1, Day2);

        this.TotalDay = Day1 + Day2;
        // console.log('total', this.TotalDay);
      }

      if (data.MxLifeTime === 'Week') {
        // console.log('week');

        let week = Math.round(this.TotalDay / 7);
        let weekValue = week * 7;
        //  console.log(weekValue);
        let send_date: any = new Date();
        send_date.setDate(send_date.getDate() + weekValue);
        if (send_date != 'Invalid Date') {
          let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
          //  console.log(setDate);
          this.dueDate = setDate;
        }
        this.MxLifeTime = 'Week';
        this.MxLifeTimeNumber = week;
      }

      if (data.MxLifeTime === 'Day') {
        // console.log('Day');

        let Day = this.TotalDay;
        let weekValue = Day * 1;
        //  console.log(weekValue);
        let send_date: any = new Date();
        send_date.setDate(send_date.getDate() + weekValue);
        if (send_date != 'Invalid Date') {
          let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
          //  console.log(setDate);
          this.dueDate = setDate;
        }
        this.MxLifeTimeNumber = Day;
        this.MxLifeTime = 'Day';
      }

      if (data.MxLifeTime === 'Month' || data.MxLifeTime === 'Quarterly||3') {
        // console.log('inside month');

        let Day = parseInt(this.TotalDay) * 1;
        let send_date: any = new Date(_modifydate1);
        send_date.setDate(send_date.getDate() + Day);

        if (send_date != 'Invalid Date') {
          let setDate: any = send_date.setMonth(send_date.getMonth());
          let setmonths = this.datePipe.transform(setDate, 'dd-MM-YYYY');
          let setitem = this.datePipe.transform(_modifydate1, 'dd-MM-YYYY');
          // console.log(setmonths);
          if (setmonths && setitem) {
            let dateMonth1 = setmonths.split('-');
            let dateMonth2 = setitem.split('-');
            let mon1 = dateMonth1[1];
            let mon2 = dateMonth2[1];
            let total_month = parseInt(mon2) - parseInt(mon1);
            if (total_month < 0) {
              total_month = total_month * -1;
            }
            // console.log('setDate', setDate);

            this.MxLifeTimeNumber = total_month;
            if (total_month === 3) {
              this.MxLifeTime = 'Quarterly||3';
            } else {
              this.MxLifeTime = 'Month';
            }
            this.dueDate = setmonths;
          }

          // let settedMonth = dateMonth[1]
        }
      }
      if (data.MxLifeTime === 'Year') {
        // console.log('year');

        let Day = parseInt(this.TotalDay) * 1;
        let send_date: any = new Date(_modifydate1);
        send_date.setDate(send_date.getDate() + Day);
        let year = send_date.setFullYear(send_date.getFullYear());
        // console.log('year', year);
        // console.log('item', item.year);

        let setdate1 = this.datePipe.transform(year, 'dd-MM-YYYY');
        let setdate2 = this.datePipe.transform(_modifydate1, 'dd-MM-YYYY');

        if (setdate1 && setdate2) {
          let splityear1 = setdate1.split('-');
          let splityear2 = setdate2.split('-');
          let year1 = splityear1[2];
          let year2 = splityear2[2];
          let total = parseInt(year1) - parseInt(year2);
          if (total < 0) {
            total = total * -1;
          }

          this.dueDate = setdate1;
          this.MxLifeTimeNumber = total;
          this.MxLifeTime = 'Year';
        }
      }
    }
    // console.log('due', this.dueDate);

    let dateDetails = new Date(this.dueDate);
    // console.log('type', typeof dateDetails.toString());
    // console.log('ios', typeof dateDetails.toISOString());
    // console.log('date string', dateDetails.toString());
    // console.log('ion string', dateDetails.toISOString());

    this.dueDate = dateDetails.toISOString();

    // console.log(this.dueDate);

    // this.masterDetails.push({
    //   dueDate: this.dueDate,
    //   MxLifeTime: this.MxLifeTime,
    //   MxLifeTimeNumber: this.MxLifeTimeNumber,
    // });
    // this.masterDetails.dueDate = this.dueDate;
    // this.masterDetails.MxLifeTime = this.MxLifeTime;
    // this.masterDetails.MxLifeTimeNumber = this.MxLifeTimeNumber;

    // console.log(this.masterDetails);
    // console.log('due', this.dueDate);
    // console.log('type', typeof this.dueDate);
    // console.log(this.dueDate);

    data.MxLifeTime = this.MxLifeTime;
    data.MxLifeTimeNumber = this.MxLifeTimeNumber;
    data.dueDate = this.dueDate;
    // console.log('master accept', data.id, data);

    this.dataservice
      .MasterTest_updateSingleUser(data.id, data)
      .subscribe((data: any) => {});
    // console.log('accept', data.id, data);

    this.dataservice
      .Entry_updateSingleUser(this.entry.id, this.entry)
      .subscribe((data) => {
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        // this.tabledata();
      });
  }

  conaccept() {
    this.dataservice.setAdmin(this.registerDetails);
    const dialogRef = this.dialog.open(conditionalRejections);
  }

  update() {
    if (
      this.registerDetails.date === undefined ||
      this.registerDetails.BreakageReason === '' ||
      // this.registerDetails.Type === '' ||
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
      // this.registerDetails.Type === undefined ||
      this.registerDetails.InstrumentCode === undefined ||
      this.registerDetails.InstrumentName === undefined ||
      this.registerDetails.Location === undefined
    ) {
      alert('Enter the Details');
    } else {
      // let datas: any;
      this.registerDetails.Approve = true;
      // this.dataservice.calibrationmasterlist_getView().subscribe((data) => {
      //   console.log('sdfasdf', data.data);
      //   console.log('Code', this.registerDetails.InstrumentCode);
      //   console.log('item', data.data);
      //   data.data.map((item: any) => {
      //     if (
      //       this.registerDetails.InstrumentCode === item.InstrumentCode &&
      //       this.registerDetails.InstrumentName === item.InstrumentName
      //     ) {
      //       datas = item;
      //     }
      //   });

      // this.dataservice.Cali

      // this.collection = data.data;
      // this.BackUpdata = data.data;
      // console.log(this.collection);
      // this.dataSource = new MatTableDataSource<calibrationmasterlist>(
      //   data.data
      // );
      // });
      this.master.active = false;
      // console.log('master id', this.master);

      this.dataservice
        .MasterTest_updateSingleUser(this.master.id, this.master)
        .subscribe((item: any) => {});

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
            // let currentUrl = this.router.url;
            // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            // this.router.onSameUrlNavigation = 'reload';
            // this.router.navigate([currentUrl]);
            // this.tabledata();
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
    // this.registerDetails.Type = undefined;
    this.registerDetails.FileUpload = undefined;
  }
}

@Component({
  selector: 'con-rejections',
  templateUrl: 'con-rejections.html',
  styleUrls: ['./scrap-approval.component.scss'],
})
export class conditionalRejections {
  public registerDetails: conrejection = {};
  frequencyDetail = false;
  isShown = true;
  public maximumTime: any;
  changedNumber: any;
  reportDate: any;
  masterDetails: any;
  code: any;
  Data: any;
  selected: any;

  constructor(
    public dialogRef: MatDialogRef<conditionalRejections>,
    private dataservice: DataService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataservice.adminSubject$.subscribe((data: any) => {
      // this.reportDate = data.ReportDate;
      this.code = data.InstrumentCode;
      this.Data = data;
    });
  }

  checkFrequency(event: any) {
    this.selected = event.target.value;
    if (this.selected === 'frequencyReduced' && this.selected) {
      this.frequencyDetail = true;
    } else {
      this.frequencyDetail = false;
    }
  }

  lifeTime(event: any) {
    // console.log(this.reportDate);
    this.Data.dueDate = '';
    // console.log('report date', this.reportDate);
    // console.log(event.target.value);

    let selectedLaw: any = event.target.value;
    this.maximumTime = selectedLaw;
    let defaultDay = '1';
    let selected_value;
    // console.log('select', selectedLaw);
    // console.log('inside data');
    this.Data.MxLifeTime = this.maximumTime;
    if (selectedLaw == 'Quarterly||3') {
      this.isShown = false;
      // let weekValue = parseInt(selectedLaw) * 3;
      // //  console.log(weekValue);
      // let send_date: any = new Date();
      // send_date.setMonth(send_date.getMonth() + weekValue);
    } else {
      this.isShown = true;
    }
    if (this.maximumTime == 'Quarterly||3') {
      var quarterly = this.maximumTime.split('||');
      // let weekValue = 3;
      //  console.log(weekValue);
      let send_date: any = new Date();
      send_date.setMonth(send_date.getMonth() + parseInt(quarterly[1]));
      // console.log(send_date);
      // debugger;
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        //  console.log(setDate);
        this.Data.dueDate = setDate;
      }

      // let valCheck = checkbox == "" ? true : false;
      // this.MxLifeTime = event != "" ? event.target.checked : valCheck;
      // console.log(this.MxLifeTimeNumber);

      // if (this.MxLifeTimeNumber) {
      //   this.isShown = !this.isShown;
      // } else {
      //   this.isShown = false;
      // }
    }
    // console.log(defaultDay);

    if (this.changedNumber) {
      selected_value = this.changedNumber;
    } else {
      selected_value = defaultDay;
    }

    if (this.maximumTime == 'Week') {
      let weekValue = parseInt(selected_value) * 7;
      //  console.log(weekValue);
      let send_date: any = new Date();
      send_date.setDate(send_date.getDate() + weekValue);
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        //  console.log(setDate);
        this.Data.dueDate = setDate;
      }
    }
    if (this.maximumTime == 'Day') {
      // console.log(selected_value);

      let weekValue = parseInt(selected_value) * 1;
      // console.log('weekvalue', weekValue);
      let send_date: any = new Date();
      send_date.setDate(send_date.getDate() + weekValue);
      // console.log('send', send_date);

      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        // console.log('setDate', setDate);
        this.Data.dueDate = setDate;
      }
    }

    if (this.maximumTime == 'Month') {
      // console.log('selects', selectedLaw);

      let weekValue = parseInt(selected_value) * 1;
      //  console.log(weekValue);
      let send_date: any = new Date();
      // console.log('send_date', send_date);

      send_date.setMonth(send_date.getMonth() + weekValue);

      // console.log('weekValue', weekValue);

      // console.log('month', send_date.getMonth());
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        // console.log('setDate', setDate);
        this.Data.dueDate = setDate;
      }
    }

    if (this.maximumTime == 'Year') {
      let weekValue = parseInt(selected_value) * 1;
      //  console.log(weekValue);
      let send_date: any = new Date();
      send_date.setFullYear(send_date.getFullYear() + weekValue);
      // console.log(send_date);
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        //  console.log(setDate);
        this.Data.dueDate = setDate;
      }
    }
    // this.ngOnInit();
    // console.log('date', this.registerDetails.dueDate);
  }

  onKeyDate(event: any) {
    let selectedLaw: any = event.target.value;
    var reg = new RegExp('^[0-9]');
    this.changedNumber = selectedLaw;
    console.log('max', this.maximumTime);
    // console.log('report', this.reportDate);
    console.log('val', event.target.value);
    this.Data.dueDate = '';

    this.Data.MxLifeTimeNumber = selectedLaw;

    if (selectedLaw === '') {
      let send_date: any = new Date();
      let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
      this.Data.dueDate = setDate;
    }
    if (!reg.test(selectedLaw) || selectedLaw.length > 3) {
      this.toastr.warning('Warning!!!', 'Enter proper value!', {
        timeOut: 1000,
      });
    } else {
      // this.registerDetails.MxLifeTimeNumber = ""
      if (this.maximumTime == 'Week') {
        let weekValue = parseInt(selectedLaw) * 7;
        let send_date: any = new Date();
        send_date.setDate(send_date.getDate() + weekValue);
        if (send_date != 'Invalid Date') {
          let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
          this.Data.dueDate = setDate;
        }
      }
      if (this.maximumTime == 'Day') {
        let weekValue = parseInt(selectedLaw) * 1;
        // console.log('week', weekValue);

        let send_date: any = new Date();
        send_date.setDate(send_date.getDate() + weekValue);
        // console.log('send', send_date);

        if (send_date != 'Invalid Date') {
          let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
          // console.log('set', setDate);

          this.Data.dueDate = setDate;
        }
      }

      if (this.maximumTime == 'Month') {
        // console.log('selects', selectedLaw);

        let weekValue = parseInt(selectedLaw) * 1;
        let send_date: any = new Date();
        send_date.setMonth(send_date.getMonth() + weekValue);
        if (send_date != 'Invalid Date') {
          let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
          this.Data.dueDate = setDate;
        }
      }

      if (this.maximumTime == 'Year') {
        let weekValue = parseInt(selectedLaw) * 1;
        //  console.log(weekValue);
        let send_date: any = new Date();
        send_date.setFullYear(send_date.getFullYear() + weekValue);
        // console.log(send_date);
        if (send_date != 'Invalid Date') {
          let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
          //  console.log(setDate);
          this.Data.dueDate = setDate;
        }
      }
    }
    // console.log(this.registerDetails.dueDate);

    // this.ngOnInit();
  }

  onNoClick(): void {
    // console.log('inside click');
    this.dataservice.MasterTest_getViewData().subscribe((data: any) => {
      // console.log('data', data);
      data.data.map((item: any) => {
        let splittedCode = this.code.split(',');
        let code = splittedCode[0];
        let name = splittedCode[1];

        if (item.InstrumentCode === code && item.InstrumentName === name) {
          // console.log(this.registerDetails.dueDate);

          item.dueDate = this.Data.dueDate;
          item.MxLifeTime = this.Data.MxLifeTime;
          item.MxLifeTimeNumber = this.Data.MxLifeTimeNumber;
          // console.log('update master', item);

          this.dataservice
            .MasterTest_updateSingleUser(item.id, item)
            .subscribe((data: any) => {});
        }
      });
    });
    this.Data.option = this.selected;
    this.Data.status = 'Con-Accept';
    if (this.Data) {
      // console.log('con accept', this.Data.id, this.Data);

      this.dataservice
        .Entry_updateSingleUser(this.Data.id, this.Data)
        .subscribe((data) => {
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
          // this.tabledata();
        });
    }

    this.dialogRef.close();

    // if (
    //   this.registerDetails.date === undefined ||
    //   this.registerDetails.ScheduleNo === undefined ||
    //   this.registerDetails.InstrumentCode === '' ||
    //   this.registerDetails.InstrumentName === '' ||
    //   this.registerDetails.LPIdentification === '' ||
    //   this.registerDetails.partySelection === '' ||
    //   this.registerDetails.Quantity === undefined ||
    //   this.registerDetails.collabrationCost === undefined ||
    //   this.registerDetails.DCDetails === '' ||
    //   this.registerDetails.ReportNo === '' ||
    //   this.registerDetails.ReportDate === undefined ||
    //   this.registerDetails.date.toString() === '' ||
    //   this.registerDetails.ScheduleNo === '' ||
    //   this.registerDetails.InstrumentCode === '' ||
    //   this.registerDetails.InstrumentName === '' ||
    //   this.registerDetails.LPIdentification === '' ||
    //   this.registerDetails.partySelection === '' ||
    //   this.registerDetails.Quantity.toString() === '' ||
    //   this.registerDetails.collabrationCost.toString() === '' ||
    //   this.registerDetails.DCDetails === '' ||
    //   this.registerDetails.ReportNo === '' ||
    //   this.registerDetails.ReportDate.toString() === '' ||
    //   this.registerDetails.Observation === '' ||
    //   this.registerDetails.Description === '' ||
    //   this.registerDetails.Remark === '' ||
    //   this.registerDetails.Specification === ''
    // ) {
    //   alert('Enter the Details');
    // } else {
    //   this.dataservice.Entry_postUser(this.registerDetails).subscribe(
    //     (data) => {
    //       console.log(data.data);

    //       if (data.data) {
    //         this.toastr.success('Created!!!', ' Successfully.', {
    //           timeOut: 3000,
    //         });
    //       }
    //     },
    //     (err) => console.log('its error')
    //   );
    // }
  }
}
