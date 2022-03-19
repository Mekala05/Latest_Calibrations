import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { calibrationEntry } from './model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe, getLocaleFirstDayOfWeek } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogContent1 } from './contentdialogmodel';
// import { conrejection2 } from './conrejection2';
import { conrejection } from './con-rejection';
import { modaltextbox } from './modal-textbox';

@Component({
  selector: 'app-calibrationentry',
  templateUrl: './calibrationEntry.component.html',
  styleUrls: ['./calibrationEntry.component.scss'],
})
export class CalibrationentryComponent implements OnInit {
  public collection: any[] = [];
  public searchvalue: any;
  public HighlightRow: any;
  public HighlightHead: any = 1;
  public SearchField: string = 'Type';
  public registerDetails: calibrationEntry = {};

  public BackUpdata = [] as any;
  public timeout: any = null;
  public instrmentCode: any[] = [];
  public instrmentName: any[] = [];
  public ScheduleNo: any[] = [];
  // public masterDetails: any = {};
  public ScheNo: any;
  public RequestType: any[] = [];
  public CalibrationRequestof: any = [];
  public CardCodeResult: any[] = [];
  public Card_Code: any[] = [];
  public code: any[] = [];
  public name: any[] = [];
  public EntryScheNo: any;
  public EntryInsCode: any;
  public EntryInsName: any;
  public SelectedItem: any[] = [];
  public SelectedItem1: any[] = [];
  public SelectedItem3: any[] = [];
  public user_name: any = [];
  public SelectedItem2: any[] = [];
  public InstrumentCodeof: any[] = [];
  public EntryPartySelect: any;
  public InstrumentNameof: any = [];
  public RequestTypeof: any = [];
  public date: any;
  public breakagerequestNo: any = [];
  test = false;
  public Redate: any;
  public MxLifeTimeNumber: any;
  public MxLifeTime: any;
  public inputvalue: any;
  public TotalDay: any;
  public dueDate: string = '';
  public TableHeading = [
    {
      name: 'Description',
    },
    {
      name: 'Specification',
    },
    {
      name: 'Observation',
    },
    {
      name: 'Remark',
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
    public dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // this.tabledata();
    this.getRequestType();
    this.registerDetails.date = new Date();
    this.registerDetails.ReportDate = new Date();
    this.registerDetails.Quantity = '1';
    this.user_name = localStorage.getItem('Login_name');
  }

  conrejection() {
    if (
      this.registerDetails.date === undefined ||
      this.registerDetails.ScheduleNo === undefined ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.LPIdentification === '' ||
      this.registerDetails.partySelection === '' ||
      this.registerDetails.Quantity === undefined ||
      this.registerDetails.collabrationCost === undefined ||
      this.registerDetails.DCDetails === '' ||
      this.registerDetails.ReportNo === '' ||
      this.registerDetails.ReportDate === undefined ||
      this.registerDetails.date.toString() === '' ||
      this.registerDetails.ScheduleNo === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.LPIdentification === '' ||
      this.registerDetails.partySelection === '' ||
      this.registerDetails.Quantity.toString() === '' ||
      this.registerDetails.collabrationCost.toString() === '' ||
      this.registerDetails.DCDetails === '' ||
      this.registerDetails.ReportNo === '' ||
      this.registerDetails.ReportDate.toString() === '' ||
      this.registerDetails.Observation === '' ||
      this.registerDetails.Description === '' ||
      this.registerDetails.Remark === '' ||
      this.registerDetails.Specification === ''
    ) {
      alert('Enter the Details');
    } else {
      // console.log('data');
      // console.log(this.registerDetails);

      this.dataservice.setAdmin(this.registerDetails);
      const dialogRef = this.dialog.open(conditionalRejection);
    }
  }

  Dialogbox() {
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
    this.dataservice.setAdmin(this.registerDetails);
    const dialogRef = this.dialog.open(rejectionmodalbox);
    // }
  }

  openDialog() {
    if (
      this.registerDetails.date === undefined ||
      this.registerDetails.ScheduleNo === undefined ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.LPIdentification === '' ||
      this.registerDetails.partySelection === '' ||
      this.registerDetails.Quantity === undefined ||
      this.registerDetails.collabrationCost === undefined ||
      this.registerDetails.DCDetails === '' ||
      this.registerDetails.ReportNo === '' ||
      this.registerDetails.ReportDate === undefined ||
      this.registerDetails.date.toString() === '' ||
      this.registerDetails.ScheduleNo === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.LPIdentification === '' ||
      this.registerDetails.partySelection === '' ||
      this.registerDetails.Quantity.toString() === '' ||
      this.registerDetails.collabrationCost.toString() === '' ||
      this.registerDetails.DCDetails === '' ||
      this.registerDetails.ReportNo === '' ||
      this.registerDetails.ReportDate.toString() === '' ||
      this.registerDetails.Observation === '' ||
      this.registerDetails.Description === '' ||
      this.registerDetails.Remark === '' ||
      this.registerDetails.Specification === ''
    ) {
      alert('Enter the Details');
    } else {
      const dialogRef = this.dialog.open(DialogContent);
      this.accept();
      // dialogRef.afterClosed().subscribe((result) => {
      //   console.log(`Dialog result: ${result}`);

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
      // });
    }
    // this.store();
  }

  private tabledata(): void {
    // this.dataservice.Entry_getView().subscribe((data) => {
    //   //console.log(data.data);

    //   this.collection = data.data;
    //   this.BackUpdata = data.data;
    // });
    // this.dataservice.Tabledata1_getView().subscribe((item: any) => {
    //   this.collection = item.data;
    //   this.BackUpdata = item.data;
    // });

    this.dataservice.MasterCali_Request_getView().subscribe((data) => {
      // console.log(data.data);
      this.CalibrationRequestof = data.data;
      // this.BackUpdata = data.data;
    });
  }

  instru(event: any) {
    let selectedLaw: any = event.target.value;

    let splitValue = selectedLaw.split(',');
    // console.log(splitValue);
    this.registerDetails.InstrumentName = splitValue[1];
  }

  public year(): void {
    // debugger;
    // console.log(this.registerDetails.date);
    var year = this.datePipe.transform(this.registerDetails.date, 'yyyy');
    var month = this.datePipe.transform(this.registerDetails.date, 'MM');
    if (year != undefined && month != undefined) {
      this.dataservice.Calibration_request(year, month).subscribe((data) => {
        if (data.data != '') {
          const ShecMonth = this.datePipe.transform(data.data[0].date, 'MM');
          this.ScheNo = ShecMonth;
          const SNo = {
            name: this.ScheNo,
          };
          this.ScheduleNo.push(SNo);
          this.instrmentCode = [];
          this.instrmentName = [];
          for (let i = 0; i < data.data.length; i++) {
            this.code = data.data[i].InstrumentCode;
            this.name = data.data[i].InstrumentName;
            const ICode = {
              name: this.code,
            };
            const IName = {
              name: this.name,
            };
            this.instrmentCode.push(ICode);
            this.instrmentName.push(IName);

            this.BackUpdata = data.data;
            // console.log(data.data);
            this.dataservice.Card_Code().subscribe((data) => {
              // console.log(data.data[0].CardCode);

              if (data.data != '') {
                for (let i = 0; i < data.data.length; i++) {
                  this.Card_Code = data.data[i].CardCode;
                  // console.log(this.Card_Code);
                  const Code = {
                    name: this.Card_Code,
                  };
                  this.CardCodeResult.push(Code);
                  // alert(coderesult);
                  // console.log(data.data);
                }
                // this.CardCodeResult.
                // console.log(this.CardCodeResult);
              }
            });
          }
          // }
        } else {
          this.toastr.error('No Data!!!', 'Data Not Found!.', {
            timeOut: 3000,
          });
          // let currentUrl = this.router.url;
          // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          // this.router.onSameUrlNavigation = 'reload';
          // this.router.navigate([currentUrl]);
          // alert("No data avaliable");
        }
      });
    }
  }
  public getRequestType(): void {
    this.dataservice.Entry_getView().subscribe((data) => {
      //console.log(data);
      this.RequestType = data.data;
      // console.log("usdhfshdgoifdhgi");
      //console.log(this.RequestType);
      // this.BackUpdata = data.data;
    });

    this.dataservice.MasterCali_Request_getView().subscribe((data) => {
      // console.log(data.data);
      this.CalibrationRequestof = data.data;
      // this.BackUpdata = data.data;
    });

    this.dataservice.MasterTest_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.InstrumentCodeof = data.data;
      // console.log('code', this.InstrumentCodeof);

      // this.BackUpdata = data.data;
    });

    this.dataservice.MasterTest_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.InstrumentNameof = data.data;
      // this.BackUpdata = data.data;
    });

    this.dataservice.MasterCali_Request_getView().subscribe((data) => {
      // console.log(data.data);
      this.RequestTypeof = data.data;
      // this.BackUpdata = data.data;
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
  public deleteUsers(id: string): void {
    // console.log(id);
    this.dataservice.Entry_DeleteSingleUser(id, this.collection).subscribe(
      (data: any) => {
        this.tabledata();
      },
      (err) => console.log('its error')
    );
  }
  public store(): void {
    // let dueDate, maxLifeTime, Day;
    this.dataservice.MasterTest_getViewData().subscribe((data: any) => {
      console.log('data', data);
      data.data.map((item: any) => {
        let splittedCode = this.registerDetails.InstrumentCode.split(',');
        let code = splittedCode[0];
        let name = splittedCode[1];

        if (item.InstrumentCode === code && item.InstrumentName === name) {
          // console.log('item', item.InstrumentCode);
          // console.log('code', code);
          this.modifyDate(item.date, this.registerDetails.ReportDate, item);
          // this.dataservice.Tabledata1_getView().subscribe((item: any) => {
          //   console.log('data collection', data.data);

          //   this.collection = item.data;
          //   this.BackUpdata = item.data;
          // });

          // let date1 = this.datePipe.transform(
          //   new Date(item.date),
          //   'YYYY-MM-dd'
          // );
          // console.log('sample', date1);
          // let date2 = this.datePipe.transform(
          //   this.registerDetails.ReportDate,
          //   'YYYY-MM-dd'
          // );
          // if (date1 && date2) {
          //   if (date2 === date1) {
          //     let dateValue = new Date(date2);
          //     // if(dateValue !== null) {
          //     this.dueDate = JSON.stringify(
          //       this.datePipe.transform(dateValue, 'dd-MMM-YYYY')
          //     );
          //     // }
          //   }

          //   if (date1 < date2) {
          //     this.TotalDay = 0;
          //     let today = new Date();
          //     let todayDate = this.datePipe.transform(today, 'MM/dd/YYYY');
          //     let compareDate1 = new Date(`${todayDate}`);

          //     let reversedDate1 = this.datePipe.transform(date1, 'MM/dd/YYYY');
          //     let compareDate2 = new Date(`${reversedDate1}`);
          //     let reversedDate2 = this.datePipe.transform(date2, 'MM/dd/YYYY');
          //     let compareDate3 = new Date(`${reversedDate2}`);

          //     var Time1 = compareDate1.getTime() - compareDate2.getTime();
          //     var Time2 = compareDate3.getTime() - compareDate1.getTime();

          //     var Day1 = Time1 / (1000 * 3600 * 24); //Difference in Day
          //     var Day2 = Time2 / (1000 * 3600 * 24);
          //     // console.log(Day1, Day2);

          //     this.TotalDay = Day1 + Day2;
          //     console.log('total', this.TotalDay);
          //   }

          //   if (item.MxLifeTime === 'Week') {
          //     console.log('week');

          //     let week = Math.round(this.TotalDay / 7);
          //     let weekValue = week * 7;
          //     //  console.log(weekValue);
          //     let send_date: any = new Date();
          //     send_date.setDate(send_date.getDate() + weekValue);
          //     if (send_date != 'Invalid Date') {
          //       let setDate: any = this.datePipe.transform(
          //         send_date,
          //         'dd-MMM-YYYY'
          //       );
          //       //  console.log(setDate);
          //       this.dueDate = setDate;
          //     }
          //     this.MxLifeTime = 'Week';
          //     this.MxLifeTimeNumber = week;
          //   }

          //   if (item.MxLifeTime === 'Day') {
          //     console.log('Day');

          //     let Day = this.TotalDay;
          //     let weekValue = Day * 1;
          //     //  console.log(weekValue);
          //     let send_date: any = new Date();
          //     send_date.setDate(send_date.getDate() + weekValue);
          //     if (send_date != 'Invalid Date') {
          //       let setDate: any = this.datePipe.transform(
          //         send_date,
          //         'dd-MMM-YYYY'
          //       );
          //       //  console.log(setDate);
          //       this.dueDate = setDate;
          //     }
          //     this.MxLifeTimeNumber = Day;
          //     this.MxLifeTime = 'Day';
          //   }

          //   if (
          //     item.MxLifeTime === 'Month' ||
          //     item.MxLifeTime === 'Quarterly||3'
          //   ) {
          //     console.log('inside month');

          //     let Day = parseInt(this.TotalDay) * 1;
          //     let send_date: any = new Date(item.date);
          //     send_date.setDate(send_date.getDate() + Day);

          //     if (send_date != 'Invalid Date') {
          //       let setDate: any = send_date.setMonth(send_date.getMonth());
          //       let setmonths = this.datePipe.transform(setDate, 'dd-MM-YYYY');
          //       let setitem = this.datePipe.transform(item.date, 'dd-MM-YYYY');
          //       // console.log(setmonths);
          //       if (setmonths && setitem) {
          //         let dateMonth1 = setmonths.split('-');
          //         let dateMonth2 = setitem.split('-');
          //         let mon1 = dateMonth1[1];
          //         let mon2 = dateMonth2[1];
          //         let total_month = parseInt(mon2) - parseInt(mon1);
          //         if (total_month < 0) {
          //           total_month = total_month * -1;
          //         }
          //         // console.log('setDate', setDate);

          //         this.MxLifeTimeNumber = total_month;
          //         if (total_month === 3) {
          //           this.MxLifeTime = 'Quarterly||3';
          //         } else {
          //           this.MxLifeTime = 'Month';
          //         }
          //         this.dueDate = setmonths;
          //       }

          //       // let settedMonth = dateMonth[1]
          //     }
          //   }
          //   if (item.MxLifeTime === 'Year') {
          //     console.log('year');

          //     let Day = parseInt(this.TotalDay) * 1;
          //     let send_date: any = new Date(item.date);
          //     send_date.setDate(send_date.getDate() + Day);
          //     let year = send_date.setFullYear(send_date.getFullYear());
          //     // console.log('year', year);
          //     // console.log('item', item.year);

          //     let setdate1 = this.datePipe.transform(year, 'dd-MM-YYYY');
          //     let setdate2 = this.datePipe.transform(item.date, 'dd-MM-YYYY');

          //     if (setdate1 && setdate2) {
          //       let splityear1 = setdate1.split('-');
          //       let splityear2 = setdate2.split('-');
          //       let year1 = splityear1[2];
          //       let year2 = splityear2[2];
          //       let total = parseInt(year1) - parseInt(year2);
          //       if (total < 0) {
          //         total = total * -1;
          //       }

          //       this.dueDate = setdate1;
          //       this.MxLifeTimeNumber = total;
          //       this.MxLifeTime = 'Year';
          //     }
          //   }
          // }
          // let dateDetails = new Date(this.dueDate);
          // console.log(dateDetails);

          // this.dueDate = JSON.stringify(
          //   this.datePipe.transform(dateDetails, 'dd-MMM-YYYY')
          // );
          // console.log(this.dueDate);

          // this.masterDetails.push({
          //   dueDate: this.dueDate,
          //   MxLifeTime: this.MxLifeTime,
          //   MxLifeTimeNumber: this.MxLifeTimeNumber,
          // });

          // console.log(this.masterDetails);

          // this.dataservice
          //   .MasterTest_updateSingleUser(item.id, this.masterDetails)
          //   .subscribe((data) => {
          //     console.log(data);
          //   });
        }
      });
    });

    // console.log(this.registerDetails.Description);

    // this.EntryScheNo = this.registerDetails.ScheduleNo?.toString();
    // this.registerDetails.ScheduleNo = this.EntryScheNo;
    // this.EntryInsName = this.registerDetails.InstrumentName?.toString();
    // this.registerDetails.InstrumentName = this.EntryInsName;
    // this.EntryInsCode = this.registerDetails.InstrumentCode?.toString();
    // this.registerDetails.InstrumentCode = this.EntryInsCode;
    // this.EntryPartySelect = this.registerDetails.partySelection?.toString();
    // this.registerDetails.partySelection = this.EntryPartySelect;
    // // console.log(this.registerDetails.ScheduleNo);
    // // console.log(this.registerDetails.InstrumentName);
    // // console.log(this.registerDetails.InstrumentCode);
    // // console.log(this.registerDetails.Description);

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
    //       // alert("Added");
    //       console.log(data.data);

    //       if (data.data) {
    //         this.toastr.success('Created!!!', 'Entry Created Successfully.', {
    //           timeOut: 3000,
    //         });

    //         this.registerDetails.Description = '';
    //         this.registerDetails.Specification = '';
    //         this.registerDetails.Observation = '';
    //         this.registerDetails.Remark = '';

    //         // let currentUrl = this.router.url;
    //         // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //         // this.router.onSameUrlNavigation = 'reload';
    //         // this.router.navigate([currentUrl]);
    //         this.tabledata();
    //       }
    //       // else {
    //       //   if (data.error.errors[0].validatorKey) {
    //       //     this.toastr.error('Error!!!', 'Category Already Exists.', {
    //       //       timeOut: 3000,
    //       //     });
    //       //   }
    //       // }
    //       // console.log(data.error.errors[0].validatorKey);
    //     },
    //     (err) => console.log('its error')
    //   );
    // }
    // console.log(this.registerDetails.InstrumentCode.toString());

    var date = this.registerDetails.date;
    var ScheduleNo = this.registerDetails.ScheduleNo?.toString();
    var InstrumentCode = this.registerDetails.InstrumentCode?.toString();
    var InstrumentName = this.registerDetails.InstrumentName?.toString();
    // var LPIdentification = this.registerDetails.LPIdentification;
    var partySelection = this.registerDetails.partySelection?.toString();
    var Quantity = this.registerDetails.Quantity;
    var collabrationCost = this.registerDetails.collabrationCost;
    var DCDetails = this.registerDetails.DCDetails;
    var ReportNo = this.registerDetails.ReportNo;
    var ReportDate = this.registerDetails.ReportDate;
    var RequestType = this.registerDetails.RequestType;
    var Description = this.registerDetails.Description;
    var Specification = this.registerDetails.Specification;
    var Observation = this.registerDetails.Observation;
    var fileErrorDiscription = this.registerDetails.fileErrorDiscription;
    var Remark = this.registerDetails.Remark;
    // var Requesttypeselected = this.registerDetails.Requesttypeselected;

    if (date == undefined || date == undefined) {
      this.toastr.warning('Warning!!!', 'date is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    // if (ScheduleNo == '' || ScheduleNo == undefined) {
    //   this.toastr.warning('Warning!!!', 'ScheduleNo  is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    // }

    if (InstrumentCode == '' || InstrumentCode == undefined) {
      this.toastr.warning('Warning!!!', 'InstrumentCode is required!', {
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

    // if (LPIdentification == '' || LPIdentification == undefined) {
    //   this.toastr.warning('Warning!!!', 'LPIdentification  is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    // }

    if (partySelection == '' || partySelection == undefined) {
      this.toastr.warning('Warning!!!', 'partySelection   is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Quantity == '' || Quantity == undefined) {
      this.toastr.warning('Warning!!!', 'Quantity   is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (collabrationCost == undefined || collabrationCost == undefined) {
      this.toastr.warning('Warning!!!', 'collabrationCost    is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (DCDetails == '' || DCDetails == undefined) {
      this.toastr.warning('Warning!!!', 'DCDetails   is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (ReportNo == '' || ReportNo == undefined) {
      this.toastr.warning('Warning!!!', 'ReportNo   is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (ReportDate == undefined || ReportDate == undefined) {
      this.toastr.warning('Warning!!!', 'ReportDate    is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (RequestType == '' || RequestType == undefined) {
      this.toastr.warning('Warning!!!', 'RequestType    is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Description == '' || Description == undefined) {
      this.toastr.warning('Warning!!!', 'Description      is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Specification == '' || Specification == undefined) {
      this.toastr.warning('Warning!!!', 'Specification       is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Observation == '' || Observation == undefined) {
      this.toastr.warning('Warning!!!', 'Observation        is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    // if (
    //   fileErrorDiscription == undefined ||
    //   fileErrorDiscription == undefined
    // ) {
    //   this.toastr.warning(
    //     'Warning!!!',
    //     'fileErrorDiscription         is required!',
    //     {
    //       timeOut: 3000,
    //     }
    //   );
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    // }

    if (Remark == '' || Remark == undefined) {
      this.toastr.warning('Warning!!!', 'Remark          is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    // if (Requesttypeselected == undefined || Requesttypeselected == undefined) {
    //   this.toastr.warning('Warning!!!', 'Requesttypeselected  is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    // }
    this.registerDetails.status = 'Accept';
    this.registerDetails.option = 'None';
    if (this.registerDetails) {
      this.dataservice
        .Entry_postUser(this.registerDetails)
        .subscribe((data) => {
          this.collection = data.data;
          this.BackUpdata = data.data;

          // let currentUrl = this.router.url;
          // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          // this.router.onSameUrlNavigation = 'reload';
          // this.router.navigate([currentUrl]);
          // this.tabledata();
          // this.collection = [];
          (this.registerDetails.Description = ''),
            (this.registerDetails.Specification = ''),
            (this.registerDetails.Observation = ''),
            (this.registerDetails.Remark = ''),
            (this.test = true);
          this.dataservice.Tabledata1_getView().subscribe((item: any) => {
            // console.log('data collection', data.data);

            this.collection = item.data;
            this.BackUpdata = item.data;
          });
        });
    }
  }

  public accept(): void {
    // let dueDate, maxLifeTime, Day;
    this.dataservice.MasterTest_getViewData().subscribe((data: any) => {
      console.log('data', data);
      data.data.map((item: any) => {
        let splittedCode = this.registerDetails.InstrumentCode.split(',');
        let code = splittedCode[0];
        let name = splittedCode[1];

        if (item.InstrumentCode === code && item.InstrumentName === name) {
          // console.log('item', item.InstrumentCode);
          // console.log('code', code);
          this.modifyDate(item.date, this.registerDetails.ReportDate, item);
          // this.dataservice.Tabledata1_getView().subscribe((item: any) => {
          //   console.log('data collection', data.data);

          //   this.collection = item.data;
          //   this.BackUpdata = item.data;
          // });

          // let date1 = this.datePipe.transform(
          //   new Date(item.date),
          //   'YYYY-MM-dd'
          // );
          // console.log('sample', date1);
          // let date2 = this.datePipe.transform(
          //   this.registerDetails.ReportDate,
          //   'YYYY-MM-dd'
          // );
          // if (date1 && date2) {
          //   if (date2 === date1) {
          //     let dateValue = new Date(date2);
          //     // if(dateValue !== null) {
          //     this.dueDate = JSON.stringify(
          //       this.datePipe.transform(dateValue, 'dd-MMM-YYYY')
          //     );
          //     // }
          //   }

          //   if (date1 < date2) {
          //     this.TotalDay = 0;
          //     let today = new Date();
          //     let todayDate = this.datePipe.transform(today, 'MM/dd/YYYY');
          //     let compareDate1 = new Date(`${todayDate}`);

          //     let reversedDate1 = this.datePipe.transform(date1, 'MM/dd/YYYY');
          //     let compareDate2 = new Date(`${reversedDate1}`);
          //     let reversedDate2 = this.datePipe.transform(date2, 'MM/dd/YYYY');
          //     let compareDate3 = new Date(`${reversedDate2}`);

          //     var Time1 = compareDate1.getTime() - compareDate2.getTime();
          //     var Time2 = compareDate3.getTime() - compareDate1.getTime();

          //     var Day1 = Time1 / (1000 * 3600 * 24); //Difference in Day
          //     var Day2 = Time2 / (1000 * 3600 * 24);
          //     // console.log(Day1, Day2);

          //     this.TotalDay = Day1 + Day2;
          //     console.log('total', this.TotalDay);
          //   }

          //   if (item.MxLifeTime === 'Week') {
          //     console.log('week');

          //     let week = Math.round(this.TotalDay / 7);
          //     let weekValue = week * 7;
          //     //  console.log(weekValue);
          //     let send_date: any = new Date();
          //     send_date.setDate(send_date.getDate() + weekValue);
          //     if (send_date != 'Invalid Date') {
          //       let setDate: any = this.datePipe.transform(
          //         send_date,
          //         'dd-MMM-YYYY'
          //       );
          //       //  console.log(setDate);
          //       this.dueDate = setDate;
          //     }
          //     this.MxLifeTime = 'Week';
          //     this.MxLifeTimeNumber = week;
          //   }

          //   if (item.MxLifeTime === 'Day') {
          //     console.log('Day');

          //     let Day = this.TotalDay;
          //     let weekValue = Day * 1;
          //     //  console.log(weekValue);
          //     let send_date: any = new Date();
          //     send_date.setDate(send_date.getDate() + weekValue);
          //     if (send_date != 'Invalid Date') {
          //       let setDate: any = this.datePipe.transform(
          //         send_date,
          //         'dd-MMM-YYYY'
          //       );
          //       //  console.log(setDate);
          //       this.dueDate = setDate;
          //     }
          //     this.MxLifeTimeNumber = Day;
          //     this.MxLifeTime = 'Day';
          //   }

          //   if (
          //     item.MxLifeTime === 'Month' ||
          //     item.MxLifeTime === 'Quarterly||3'
          //   ) {
          //     console.log('inside month');

          //     let Day = parseInt(this.TotalDay) * 1;
          //     let send_date: any = new Date(item.date);
          //     send_date.setDate(send_date.getDate() + Day);

          //     if (send_date != 'Invalid Date') {
          //       let setDate: any = send_date.setMonth(send_date.getMonth());
          //       let setmonths = this.datePipe.transform(setDate, 'dd-MM-YYYY');
          //       let setitem = this.datePipe.transform(item.date, 'dd-MM-YYYY');
          //       // console.log(setmonths);
          //       if (setmonths && setitem) {
          //         let dateMonth1 = setmonths.split('-');
          //         let dateMonth2 = setitem.split('-');
          //         let mon1 = dateMonth1[1];
          //         let mon2 = dateMonth2[1];
          //         let total_month = parseInt(mon2) - parseInt(mon1);
          //         if (total_month < 0) {
          //           total_month = total_month * -1;
          //         }
          //         // console.log('setDate', setDate);

          //         this.MxLifeTimeNumber = total_month;
          //         if (total_month === 3) {
          //           this.MxLifeTime = 'Quarterly||3';
          //         } else {
          //           this.MxLifeTime = 'Month';
          //         }
          //         this.dueDate = setmonths;
          //       }

          //       // let settedMonth = dateMonth[1]
          //     }
          //   }
          //   if (item.MxLifeTime === 'Year') {
          //     console.log('year');

          //     let Day = parseInt(this.TotalDay) * 1;
          //     let send_date: any = new Date(item.date);
          //     send_date.setDate(send_date.getDate() + Day);
          //     let year = send_date.setFullYear(send_date.getFullYear());
          //     // console.log('year', year);
          //     // console.log('item', item.year);

          //     let setdate1 = this.datePipe.transform(year, 'dd-MM-YYYY');
          //     let setdate2 = this.datePipe.transform(item.date, 'dd-MM-YYYY');

          //     if (setdate1 && setdate2) {
          //       let splityear1 = setdate1.split('-');
          //       let splityear2 = setdate2.split('-');
          //       let year1 = splityear1[2];
          //       let year2 = splityear2[2];
          //       let total = parseInt(year1) - parseInt(year2);
          //       if (total < 0) {
          //         total = total * -1;
          //       }

          //       this.dueDate = setdate1;
          //       this.MxLifeTimeNumber = total;
          //       this.MxLifeTime = 'Year';
          //     }
          //   }
          // }
          // let dateDetails = new Date(this.dueDate);
          // console.log(dateDetails);

          // this.dueDate = JSON.stringify(
          //   this.datePipe.transform(dateDetails, 'dd-MMM-YYYY')
          // );
          // console.log(this.dueDate);

          // this.masterDetails.push({
          //   dueDate: this.dueDate,
          //   MxLifeTime: this.MxLifeTime,
          //   MxLifeTimeNumber: this.MxLifeTimeNumber,
          // });

          // console.log(this.masterDetails);

          // this.dataservice
          //   .MasterTest_updateSingleUser(item.id, this.masterDetails)
          //   .subscribe((data) => {
          //     console.log(data);
          //   });
        }
      });
    });

    // console.log(this.registerDetails.Description);

    // this.EntryScheNo = this.registerDetails.ScheduleNo?.toString();
    // this.registerDetails.ScheduleNo = this.EntryScheNo;
    // this.EntryInsName = this.registerDetails.InstrumentName?.toString();
    // this.registerDetails.InstrumentName = this.EntryInsName;
    // this.EntryInsCode = this.registerDetails.InstrumentCode?.toString();
    // this.registerDetails.InstrumentCode = this.EntryInsCode;
    // this.EntryPartySelect = this.registerDetails.partySelection?.toString();
    // this.registerDetails.partySelection = this.EntryPartySelect;
    // // console.log(this.registerDetails.ScheduleNo);
    // // console.log(this.registerDetails.InstrumentName);
    // // console.log(this.registerDetails.InstrumentCode);
    // // console.log(this.registerDetails.Description);

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
    //       // alert("Added");
    //       console.log(data.data);

    //       if (data.data) {
    //         this.toastr.success('Created!!!', 'Entry Created Successfully.', {
    //           timeOut: 3000,
    //         });

    //         this.registerDetails.Description = '';
    //         this.registerDetails.Specification = '';
    //         this.registerDetails.Observation = '';
    //         this.registerDetails.Remark = '';

    //         // let currentUrl = this.router.url;
    //         // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //         // this.router.onSameUrlNavigation = 'reload';
    //         // this.router.navigate([currentUrl]);
    //         this.tabledata();
    //       }
    //       // else {
    //       //   if (data.error.errors[0].validatorKey) {
    //       //     this.toastr.error('Error!!!', 'Category Already Exists.', {
    //       //       timeOut: 3000,
    //       //     });
    //       //   }
    //       // }
    //       // console.log(data.error.errors[0].validatorKey);
    //     },
    //     (err) => console.log('its error')
    //   );
    // }
    // console.log(this.registerDetails.InstrumentCode.toString());

    var date = this.registerDetails.date;
    var ScheduleNo = this.registerDetails.ScheduleNo?.toString();
    var InstrumentCode = this.registerDetails.InstrumentCode?.toString();
    var InstrumentName = this.registerDetails.InstrumentName?.toString();
    // var LPIdentification = this.registerDetails.LPIdentification;
    var partySelection = this.registerDetails.partySelection?.toString();
    var Quantity = this.registerDetails.Quantity;
    var collabrationCost = this.registerDetails.collabrationCost;
    var DCDetails = this.registerDetails.DCDetails;
    var ReportNo = this.registerDetails.ReportNo;
    var ReportDate = this.registerDetails.ReportDate;
    var RequestType = this.registerDetails.RequestType;
    var Description = this.registerDetails.Description;
    var Specification = this.registerDetails.Specification;
    var Observation = this.registerDetails.Observation;
    var fileErrorDiscription = this.registerDetails.fileErrorDiscription;
    var Remark = this.registerDetails.Remark;
    // var Requesttypeselected = this.registerDetails.Requesttypeselected;

    if (date == undefined || date == undefined) {
      this.toastr.warning('Warning!!!', 'date is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    // if (ScheduleNo == '' || ScheduleNo == undefined) {
    //   this.toastr.warning('Warning!!!', 'ScheduleNo  is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    // }

    if (InstrumentCode == '' || InstrumentCode == undefined) {
      this.toastr.warning('Warning!!!', 'InstrumentCode is required!', {
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

    // if (LPIdentification == '' || LPIdentification == undefined) {
    //   this.toastr.warning('Warning!!!', 'LPIdentification  is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    // }

    if (partySelection == '' || partySelection == undefined) {
      this.toastr.warning('Warning!!!', 'partySelection   is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Quantity == '' || Quantity == undefined) {
      this.toastr.warning('Warning!!!', 'Quantity   is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (collabrationCost == undefined || collabrationCost == undefined) {
      this.toastr.warning('Warning!!!', 'collabrationCost    is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (DCDetails == '' || DCDetails == undefined) {
      this.toastr.warning('Warning!!!', 'DCDetails   is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (ReportNo == '' || ReportNo == undefined) {
      this.toastr.warning('Warning!!!', 'ReportNo   is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (ReportDate == undefined || ReportDate == undefined) {
      this.toastr.warning('Warning!!!', 'ReportDate    is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (RequestType == '' || RequestType == undefined) {
      this.toastr.warning('Warning!!!', 'RequestType    is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Description == '' || Description == undefined) {
      this.toastr.warning('Warning!!!', 'Description      is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Specification == '' || Specification == undefined) {
      this.toastr.warning('Warning!!!', 'Specification       is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Observation == '' || Observation == undefined) {
      this.toastr.warning('Warning!!!', 'Observation        is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    // if (
    //   fileErrorDiscription == undefined ||
    //   fileErrorDiscription == undefined
    // ) {
    //   this.toastr.warning(
    //     'Warning!!!',
    //     'fileErrorDiscription         is required!',
    //     {
    //       timeOut: 3000,
    //     }
    //   );
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    // }

    if (Remark == '' || Remark == undefined) {
      this.toastr.warning('Warning!!!', 'Remark          is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    // if (Requesttypeselected == undefined || Requesttypeselected == undefined) {
    //   this.toastr.warning('Warning!!!', 'Requesttypeselected  is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    // }
    this.registerDetails.status = 'Accept';
    this.registerDetails.option = 'None';
    if (this.registerDetails) {
      this.dataservice
        .Entry_postUser(this.registerDetails)
        .subscribe((data) => {
          // this.collection = data.data;
          // this.BackUpdata = data.data;

          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
          // this.tabledata();
          // this.collection = [];
          // this.dataservice.Tabledata1_getView().subscribe((item: any) => {
          //   // console.log('data collection', data.data);

          //   this.collection = item.data;
          //   this.BackUpdata = item.data;
          // });
        });
    }
  }

  modifyDate(_modifydate1: any, _modifydate2: any, data: any) {
    let date1 = this.datePipe.transform(new Date(_modifydate1), 'YYYY-MM-dd');
    console.log('sample', date1);
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
        console.log('total', this.TotalDay);
      }

      if (data.MxLifeTime === 'Week') {
        console.log('week');

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
        console.log('Day');

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
        console.log('inside month');

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
        console.log('year');

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
    let dateDetails = new Date(this.dueDate);
    // console.log(dateDetails);

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

    this.dataservice
      .MasterTest_updateSingleUser(data.id, data)
      .subscribe((data: any) => {});
  }

  error() {
    this.dataservice.Entry_postUser(this.registerDetails).subscribe((data) => {
      (this.registerDetails.Description = ''),
        (this.registerDetails.Specification = ''),
        (this.registerDetails.Observation = ''),
        (this.registerDetails.Remark = ''),
        (this.collection = data.data);
      this.test = true;

      // let currentUrl = this.router.url;
      // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      // this.router.onSameUrlNavigation = 'reload';
      // this.router.navigate([currentUrl]);
      // this.tabledata();
    });
  }

  update() {
    this.EntryScheNo = this.registerDetails.ScheduleNo?.toString();
    this.registerDetails.ScheduleNo = this.EntryScheNo;
    this.EntryInsName = this.registerDetails.InstrumentName?.toString();
    this.registerDetails.InstrumentName = this.EntryInsName;
    this.EntryInsCode = this.registerDetails.InstrumentCode?.toString();
    this.registerDetails.InstrumentCode = this.EntryInsCode;
    this.EntryPartySelect = this.registerDetails.partySelection?.toString();
    this.registerDetails.partySelection = this.EntryPartySelect;

    if (
      this.registerDetails.date === undefined ||
      this.registerDetails.ScheduleNo === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.LPIdentification === '' ||
      this.registerDetails.partySelection === '' ||
      this.registerDetails.Quantity === '' ||
      this.registerDetails.collabrationCost === undefined ||
      this.registerDetails.DCDetails === '' ||
      this.registerDetails.ReportNo === '' ||
      this.registerDetails.ReportDate === undefined ||
      this.registerDetails.date.toString() === '' ||
      this.registerDetails.ScheduleNo === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.LPIdentification === '' ||
      this.registerDetails.partySelection === '' ||
      this.registerDetails.collabrationCost.toString() === '' ||
      this.registerDetails.DCDetails === '' ||
      this.registerDetails.ReportNo === '' ||
      this.registerDetails.ReportDate.toString() === '' ||
      this.registerDetails.RequestType === '' ||
      this.registerDetails.Description === '' ||
      this.registerDetails.Specification === '' ||
      this.registerDetails.Observation === '' ||
      this.registerDetails.Remark === ''
    ) {
      alert('Enter the Details');
    } else {
      this.collection = [];
      this.collection.push(this.registerDetails);
      this.dataservice
        .Entry_updateSingleUser(this.registerDetails.id, this.registerDetails)
        .subscribe(
          (data) => {
            // alert("Update");
            // console.log(data);
            if (data.data) {
              this.dataservice.Tabledata1_getView().subscribe((data) => {
                this.collection = data.data;
                this.BackUpdata = data.data;
              });
              this.toastr.success('Updated!!!', 'Entry Updated Successfully.', {
                timeOut: 3000,
              });
              // let currentUrl = this.router.url;
              // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              // this.router.onSameUrlNavigation = 'reload';
              // this.router.navigate([currentUrl]);
              this.tabledata();
            }
            // else {
            //   if (data.error.errors[0].validatorKey) {
            //     this.toastr.error('Error!!!', 'Category Already Exists.', {
            //       timeOut: 3000,
            //     });
            //   }
            // }
          },
          (err) => console.log(err)
        );
    }
  }

  getRequestTypeDetails(type: any) {
    // debugger;
    // const requestType=event.value;
    // alert(this.registerDetails.RequestType);
    switch (this.registerDetails.RequestType) {
      case 'breakage':
        // debugger;
        this.dataservice.BreakageRequestno_getView().subscribe((data) => {
          // console.log(data.data[1]);
          //alert(data.data[0].BreakageNo);
          this.breakagerequestNo = data.data;
          // this.BackUpdata = data.data;
        });

        break;
      case 'shedule':
        this.dataservice.MasterTest_getViewsheduleno().subscribe((data) => {
          console.log(data.data[1]);
          //alert(data.data[0].BreakageNo);
          this.breakagerequestNo = data.data;
          // this.BackUpdata = data.data;
        });

        break;

      case 'Recalibration':
        this.dataservice.MasterTest_getViewrecalibration().subscribe((data) => {
          // console.log(data.data[1]);
          //alert(data.data[0].BreakageNo);
          this.breakagerequestNo = data.data;
          // this.BackUpdata = data.data;
        });

        break;

      case 'Reservice':
        this.dataservice.MasterTest_getViewreservice().subscribe((data) => {
          // console.log(data.data[1]);
          //alert(data.data[0].BreakageNo);
          this.breakagerequestNo = data.data;
          // this.BackUpdata = data.data;
        });

        break;
      default:
        break;
    }
  }

  getUser(id: object) {
    this.registerDetails = { ...id };
    this.date = this.datePipe.transform(
      this.registerDetails.date,
      'yyyy-MM-dd'
    );
    this.Redate = this.datePipe.transform(
      this.registerDetails.ReportDate,
      'yyyy-MM-dd'
    );

    this.registerDetails.date = this.date;
    this.registerDetails.ReportDate = this.Redate;
    if (this.registerDetails.date == this.date) {
      this.dataservice.Card_Code().subscribe((data) => {
        if (data.data != '') {
          this.CardCodeResult = [];
          for (let i = 0; i < data.data.length; i++) {
            this.Card_Code = data.data[i].CardCode;
            const Code = {
              name: this.Card_Code,
            };
            this.CardCodeResult.push(Code);
          }
          let PartySelection: [];
          PartySelection = this.registerDetails.partySelection?.split(',');
          this.SelectedItem = [];
          PartySelection?.forEach((result, index) => {
            // console.log(result);
            // const IName = {
            //    result
            // }
            this.SelectedItem.push(result);
            // if (PartySelection.length - 1 == index) {
            //   this.registerDetails.partySelection = this.SelectedItem
            // console.log(this.registerDetails);
            // console.log(PartySelection );
            // }
          });
          this.registerDetails.partySelection = this.SelectedItem;
        }
      });
      var year = this.datePipe.transform(this.date, 'yyyy');
      var month = this.datePipe.transform(this.date, 'MM');
      this.dataservice.Calibration_request(year, month).subscribe((data) => {
        if (data.data != '') {
          const ShecMonth = this.datePipe.transform(data.data[0].date, 'MM');
          this.ScheNo = ShecMonth;
          const SNo = {
            name: this.ScheNo,
          };
          this.ScheduleNo.push(SNo);
          this.instrmentCode = [];
          this.instrmentName = [];
          for (let i = 0; i < data.data.length; i++) {
            this.code = data.data[i].InstrumentCode;
            this.name = data.data[i].InstrumentName;
            const ICode = {
              name: this.code,
            };
            const IName = {
              name: this.name,
            };
            this.instrmentCode.push(ICode);
            this.instrmentName.push(IName);

            this.BackUpdata = data.data;
            // console.log(data.data);
          }
          let EnSchNo: [];
          EnSchNo = this.registerDetails.ScheduleNo?.split(',');
          this.SelectedItem3 = [];
          EnSchNo?.forEach((result, index) => {
            this.SelectedItem3.push(result);
          });
          this.registerDetails.ScheduleNo = this.SelectedItem3;
          //console.log(this.registerDetails.ScheduleNo);

          let InsCodeSplit: [];
          InsCodeSplit = this.registerDetails.InstrumentCode?.split(',');
          this.SelectedItem1 = [];
          InsCodeSplit?.forEach((result, index) => {
            this.SelectedItem1.push(result);
          });
          this.registerDetails.InstrumentCode = this.SelectedItem1;

          let InsNameSplit: [];
          InsNameSplit = this.registerDetails.InstrumentName?.split(',');
          this.SelectedItem2 = [];
          InsNameSplit?.forEach((result, index) => {
            this.SelectedItem2.push(result);
          });
          this.registerDetails.InstrumentName = this.SelectedItem2;
        }
      });
    }
  }
  public Empty(): void {
    if (!this.searchvalue) {
      this.collection = [...this.BackUpdata];
    }
  }
  reset() {
    // this.registerDetails.date = undefined,
    // this.registerDetails.ScheduleNo = '',
    // this.registerDetails.InstrumentName = '',
    // this.registerDetails.InstrumentCode = '',
    // this.registerDetails.LPIdentification = '',
    // this.registerDetails.partySelection = '',
    // this.registerDetails.Quantity = '',
    // this.registerDetails.collabrationCost = undefined,
    // this.registerDetails.DCDetails="",
    // this.registerDetails.ReportNo="",
    // this.registerDetails.ReportDate=undefined,
    // this.registerDetails.RequestType=undefined,
    (this.registerDetails.Description = ''),
      (this.registerDetails.Specification = ''),
      (this.registerDetails.Observation = ''),
      (this.registerDetails.Remark = '');
  }
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
  //     if (this.SearchField == "Type") {
  //       this.collection=this.collection.filter(f=>f.type==this.searchvalue);
  //     } else if (this.SearchField == "Date") {
  //       this.collection=this.collection.filter(f=>f.type==this.searchvalue);

  //     }
  //   }
  // }
}

@Component({
  selector: 'modalbox',
  templateUrl: 'modalbox.html',
})
export class DialogContent {
  public registerDetails: DialogContent1 = {};
  constructor(
    public dialogRef: MatDialogRef<DialogContent>,
    private dataservice: DataService,
    private toastr: ToastrService
  ) {}
  onNoClick1(): void {
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
    //       // alert("Added");
    //       console.log(data.data);

    //       if (data.data) {
    //         this.toastr.success('Created!!!', ' Successfully.', {
    //           timeOut: 3000,
    //         });

    //         // this.tabledata();
    //       }
    //     },
    //     (err) => console.log('its error')
    //   );
    // }
  }
}

@Component({
  selector: 'modal-textbox',
  templateUrl: 'modal-textbox.html',
  styleUrls: ['./calibrationEntry.component.scss'],
})
export class rejectionmodalbox {
  public registerDetails: modaltextbox = {};
  type: any;
  refno: string = '';
  Data: any;
  constructor(
    public dialogRef: MatDialogRef<rejectionmodalbox>,
    private dataservice: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataservice.adminSubject$.subscribe((data: any) => {
      this.Data = data;
    });
  }

  changeType(event: any) {
    this.type = event.target.value;
    this.dataservice.Entry_getView().subscribe((data: any) => {
      this.refno = '';
      // console.log('data', data);
      // console.log('len', data.data.length);

      // if (data.data.length <= 0) {
      // console.log('separate len');

      if (data.data.length === 0) {
        if (this.type === 'Re-Calibration') {
          this.refno = 'RECL' + '-' + '1000';
          // console.log('reno', this.refno);
        } else if (this.type === 'ReService') {
          this.refno = 'RESV' + '-' + '1000';
        } else {
          if (this.type === 'Scrap') this.refno = 'SCRAP' + '-' + '1000';
        }
        // console.log(this.refno);
      }
      if (data.data.length >= 1) {
        // console.log('inside length');

        data.data.map((data: any) => {
          // console.log(data.ReferenceCode);
          // console.log('inside data length');
          // console.log(data.data.length);

          // && data.ReferenceCode
          if (data.ReferenceCode) {
            // console.log('inside refcode');

            if (data.status === 'Reject') {
              // console.log('ref', data.ReferenceCode);

              // if (data.ReferenceCode !== '') {
              // console.log('inside referenece');
              // console.log('data option');

              // if (this.type === data.option) {
              // console.log(data.option);

              // console.log(this.type === 'Re-Calibration');
              // console.log(data.option === 'Re-Calibration');

              // console.log(
              //   'con',
              //   this.type === 'Re-Calibration' &&
              //     data.option === 'Re-Calibration'
              // );
              if (
                this.type === 'Re-Calibration' &&
                data.option === 'Re-Calibration'
              ) {
                let code = data.ReferenceCode;
                if (code) {
                  let splitted = code.split('-');
                  let ref = parseInt(splitted[1]) + 1;
                  this.refno = 'RECL' + '-' + ref;
                }
                console.log('type', this.type);
                console.log('option', data.option);

                // console.log(this.type === 'ReService');
                // console.log(data.option === 'ReService');

                // console.log(
                //   'con',
                //   this.type === 'ReService' && data.option === 'ReService'
                // );
              } else if (
                this.type === 'ReService' &&
                data.option === 'ReService'
              ) {
                // console.log('isnide reservice');

                let code = data.ReferenceCode;
                if (code) {
                  let splitted = code.split('-');
                  let ref = parseInt(splitted[1]) + 1;
                  this.refno = 'RESV' + '-' + ref;
                }
              } else if (this.type === 'Scrap' && data.option === 'Scrap') {
                // console.log('inside scrap');
                // if (this.type === 'Scrap' && data.option === 'ReService') {
                let code = data.ReferenceCode;
                if (code) {
                  let splitted = code.split('-');
                  let ref = parseInt(splitted[1]) + 1;
                  this.refno = 'SCRAP' + '-' + ref;
                }
                // }
              } else {
                // console.log('reference code', !data.ReferenceCode);

                // console.log('isnide else');

                // console.log('type', this.type);

                if (this.type === 'Re-Calibration' && !data.ReferenceCode) {
                  this.refno = 'RECL' + '-' + '1000';
                  console.log('reno', this.refno);
                } else if (this.type === 'ReService' && !data.ReferenceCode) {
                  console.log('inside reserveice');

                  this.refno = 'RESV' + '-' + '1000';
                } else {
                  if (this.type === 'Scrap' && !data.ReferenceCode)
                    this.refno = 'SCRAP' + '-' + '1000';
                }
              }
              // }
              // }
            }
            console.log('ref', this.refno);
          }
        });
      }
      // }
    });
  }

  onNoClick(): void {
    // console.log(this.Data);

    this.Data.status = 'Reject';
    this.Data.option = this.type;
    this.Data.ReferenceCode = this.refno;
    // console.log(this.refno);

    // console.log('reference', this.refno?.toString());

    console.log(this.Data);
    if (this.Data) {
      this.dataservice.Entry_postUser(this.Data).subscribe((data) => {
        if (this.type === 'Scrap') {
          this.dataservice.setScrapDetails(this.Data);
          this.router.navigate(['/header/ScrapApproval']);
        } else {
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
        }
        // this.tabledata();
      });
    }

    this.dialogRef.close();
  }

  onKeyIns(x: any) {
    // this.dataservice.ReturnList_postUser(this.registerDetails.InstrumentCode,this.collection).subscribe((data)=>{
    //   console.log(data.data[0]);
    //    this.registerDetails.InstrumentName = data.data[0].InstrumentName;
    // })
  }
  // getUser1(id: any) {
  //   // alert(id)
  //   this.router.navigate([`header/Return2`], { queryParams: { id: id} });
  // }
}

@Component({
  selector: 'con-rejection',
  templateUrl: 'con-rejection.html',
  styleUrls: ['./calibrationEntry.component.scss'],
})
export class conditionalRejection {
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
    public dialogRef: MatDialogRef<conditionalRejection>,
    private dataservice: DataService,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataservice.adminSubject$.subscribe((data: any) => {
      this.reportDate = data.ReportDate;
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
    this.registerDetails.dueDate = '';
    // console.log('report date', this.reportDate);
    // console.log(event.target.value);

    let selectedLaw: any = event.target.value;
    this.maximumTime = selectedLaw;
    let defaultDay = '1';
    let selected_value;
    // console.log('select', selectedLaw);
    // console.log('inside data');
    this.registerDetails.MxLifeTime = this.maximumTime;
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
      let send_date: any = new Date(this.reportDate);
      send_date.setMonth(send_date.getMonth() + parseInt(quarterly[1]));
      // console.log(send_date);
      // debugger;
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        //  console.log(setDate);
        this.registerDetails.dueDate = setDate;
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
      let send_date: any = new Date(this.reportDate);
      send_date.setDate(send_date.getDate() + weekValue);
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        //  console.log(setDate);
        this.registerDetails.dueDate = setDate;
      }
    }
    if (this.maximumTime == 'Day') {
      // console.log(selected_value);

      let weekValue = parseInt(selected_value) * 1;
      // console.log('weekvalue', weekValue);
      let send_date: any = new Date(this.reportDate);
      send_date.setDate(send_date.getDate() + weekValue);
      // console.log('send', send_date);

      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        // console.log('setDate', setDate);
        this.registerDetails.dueDate = setDate;
      }
    }

    if (this.maximumTime == 'Month') {
      // console.log('selects', selectedLaw);

      let weekValue = parseInt(selected_value) * 1;
      //  console.log(weekValue);
      let send_date: any = new Date(this.reportDate);
      // console.log('send_date', send_date);

      send_date.setMonth(send_date.getMonth() + weekValue);

      // console.log('weekValue', weekValue);

      // console.log('month', send_date.getMonth());
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        // console.log('setDate', setDate);
        this.registerDetails.dueDate = setDate;
      }
    }

    if (this.maximumTime == 'Year') {
      let weekValue = parseInt(selected_value) * 1;
      //  console.log(weekValue);
      let send_date: any = new Date(this.reportDate);
      send_date.setFullYear(send_date.getFullYear() + weekValue);
      // console.log(send_date);
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        //  console.log(setDate);
        this.registerDetails.dueDate = setDate;
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
    console.log('report', this.reportDate);
    console.log('val', event.target.value);
    this.registerDetails.dueDate = '';

    this.registerDetails.MxLifeTimeNumber = selectedLaw;

    if (selectedLaw === '') {
      let send_date: any = new Date(this.reportDate);
      let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
      this.registerDetails.dueDate = setDate;
    }
    if (!reg.test(selectedLaw) || selectedLaw.length > 3) {
      this.toastr.warning('Warning!!!', 'Enter proper value!', {
        timeOut: 1000,
      });
    } else {
      // this.registerDetails.MxLifeTimeNumber = ""
      if (this.maximumTime == 'Week') {
        let weekValue = parseInt(selectedLaw) * 7;
        let send_date: any = new Date(this.reportDate);
        send_date.setDate(send_date.getDate() + weekValue);
        if (send_date != 'Invalid Date') {
          let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
          this.registerDetails.dueDate = setDate;
        }
      }
      if (this.maximumTime == 'Day') {
        let weekValue = parseInt(selectedLaw) * 1;
        // console.log('week', weekValue);

        let send_date: any = new Date(this.reportDate);
        send_date.setDate(send_date.getDate() + weekValue);
        // console.log('send', send_date);

        if (send_date != 'Invalid Date') {
          let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
          // console.log('set', setDate);

          this.registerDetails.dueDate = setDate;
        }
      }

      if (this.maximumTime == 'Month') {
        // console.log('selects', selectedLaw);

        let weekValue = parseInt(selectedLaw) * 1;
        let send_date: any = new Date(this.reportDate);
        send_date.setMonth(send_date.getMonth() + weekValue);
        if (send_date != 'Invalid Date') {
          let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
          this.registerDetails.dueDate = setDate;
        }
      }

      if (this.maximumTime == 'Year') {
        let weekValue = parseInt(selectedLaw) * 1;
        //  console.log(weekValue);
        let send_date: any = new Date(this.reportDate);
        send_date.setFullYear(send_date.getFullYear() + weekValue);
        // console.log(send_date);
        if (send_date != 'Invalid Date') {
          let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
          //  console.log(setDate);
          this.registerDetails.dueDate = setDate;
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

          item.dueDate = this.registerDetails.dueDate;
          item.MxLifeTime = this.registerDetails.MxLifeTime;
          item.MxLifeTimeNumber = this.registerDetails.MxLifeTimeNumber;
          this.dataservice
            .MasterTest_updateSingleUser(item.id, item)
            .subscribe((data: any) => {});
        }
      });
    });
    this.Data.option = this.selected;
    this.Data.status = 'Con-Accept';
    if (this.Data) {
      this.dataservice.Entry_postUser(this.Data).subscribe((data) => {
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
