import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { calibrationEntry } from './model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
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
  public TableHeading = [
    // {
    //   name: "SI No",
    // },
    // {
    //   name: "Date",
    // },
    // {
    //   name: "Schedule No",
    // },
    // {
    //   name: "Instrument Code",
    // },
    // {
    //   name: "Instrument Name",
    // },
    // {
    //   name: "Last Party Identification",
    // },
    // {
    //   name: "Party Selection",
    // },
    // {
    //   name: "Quantity",
    // },
    // {
    //   name: "Collabration Cost",
    // },
    // {
    //   name: "DC Details",
    // },
    // {
    //   name: "Report No",
    // },
    // {
    //   name: "Report Date",
    // },
    // {
    //   name: "RequestType",
    // },
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
    this.tabledata();
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
      const dialogRef = this.dialog.open(conditionalRejection);

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
  }

  Dialogbox() {
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
      const dialogRef = this.dialog.open(rejectionmodalbox);

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
    this.store();
  }

  private tabledata(): void {
    this.dataservice.Entry_getView().subscribe((data) => {
      //console.log(data.data);

      this.collection = data.data;
      this.BackUpdata = data.data;
    });

    this.dataservice.MasterCali_Request_getView().subscribe((data) => {
      console.log(data.data);
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
      console.log(data.data);
      this.CalibrationRequestof = data.data;
      // this.BackUpdata = data.data;
    });

    this.dataservice.MasterTest_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.InstrumentCodeof = data.data;
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

    // if (RequestType == undefined || RequestType == undefined) {
    //   this.toastr.warning('Warning!!!', 'RequestType is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    // }

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

    this.dataservice.Entry_postUser(this.registerDetails).subscribe((data) => {
      this.collection = data.data;
      this.test = true;

      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
      this.tabledata();
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
      this.dataservice
        .Entry_updateSingleUser(this.registerDetails.id, this.registerDetails)
        .subscribe(
          (data) => {
            // alert("Update");
            // console.log(data);
            if (data.data) {
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
    debugger;
    // const requestType=event.value;
    alert(this.registerDetails.RequestType);
    switch (this.registerDetails.RequestType) {
      case 'breakage':
        debugger;
        this.dataservice.BreakageRequestno_getView().subscribe((data) => {
          console.log(data.data[1]);
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
          console.log(data.data[1]);
          //alert(data.data[0].BreakageNo);
          this.breakagerequestNo = data.data;
          // this.BackUpdata = data.data;
        });

        break;

      case 'Reservice':
        this.dataservice.MasterTest_getViewreservice().subscribe((data) => {
          console.log(data.data[1]);
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
})
export class rejectionmodalbox {
  public registerDetails: modaltextbox = {};

  constructor(
    public dialogRef: MatDialogRef<rejectionmodalbox>,
    private dataservice: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  onNoClick(): void {
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
})
export class conditionalRejection {
  public registerDetails: conrejection = {};

  constructor(
    public dialogRef: MatDialogRef<conditionalRejection>,
    private dataservice: DataService,
    private toastr: ToastrService
  ) {}

  onNoClick(): void {
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
