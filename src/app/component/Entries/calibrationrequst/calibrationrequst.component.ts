import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CalibrationRequest } from './model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calibrationrequst',
  templateUrl: './calibrationrequst.component.html',
  styleUrls: ['./calibrationrequst.component.scss'],
})
export class CalibrationrequstComponent implements OnInit {
  public collection: any[] = [];
  public searchvalue: any;
  public HighlightRow: any;
  public HighlightHead: any = 1;
  public SearchField: string = 'RequestType';
  public BackUpdata = [] as any;
  public timeout: any = null;
  public code: any[] = [];
  public name: any[] = [];
  public Card_Code: any[] = [];
  public date: any;
  public registerDetails: CalibrationRequest = {};
  public instrmentCode: any[] = [];
  public instrmentName: any[] = [];
  public SelectedItem: any[] = [];
  public SelectedItem1: any[] = [];
  public SelectedItem2: any[] = [];
  public CardCodeResult: any[] = [];
  public calibrationtypeof: any[] = [];
  public InsCode: any;
  public InsName: any;
  public user_name: any = [];
  public codeValue: any;
  public PartySelect: any;
  public InstrumentNameof: any = [];
  public InstrumentCode: any = [];
  public InstrumentCodeof: any = [];
  public CalibrationRequestof: any = [];
  public BreakageRequestof: any = [];

  public Party: any = [];
  public Requesttypelist: any = [];
  public RaiseDcItem: any = [];

  // public InstrumentCode: any;
  public instrucodetionselect: any;

  public TableHeading = [
    {
      name: '',
    },
    {
      name: 'SI No',
    },
    {
      name: 'Date',
    },
    {
      name: 'RequestType',
    },

    {
      name: 'shedule/BreakageNo',
    },

    {
      name: 'InstrumentCode',
    },

    {
      name: 'InstrumentName',
    },

    {
      name: 'Calibration Type',
    },

    {
      name: 'LPIdentification',
    },

    {
      name: 'Party',
    },

    {
      name: 'Calibration Location',
    },

    {
      name: 'Create On',
    },
    {
      name: 'createdAt',
    },
    {
      name: 'Update On',
    },
    {
      name: 'UpdateAt',
    },

    {
      name: 'RaiseDc',
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
    private router: Router,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.tabledata();
    this.registerDetails.date = new Date();
    this.user_name = localStorage.getItem('Login_name');
    this.partyoffun();
    // this.year();
    // this.getRequestTypeDetails('breakage');

    // console.log(this.registerDetails.date);
    this.registerDetails.Quantity = '1';
    this.dataservice.MasterTest_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.InstrumentNameof = data.data;
      // console.log('name', data.data);

      // this.BackUpdata = data.data;
    });
    this.dataservice.MasterTest_getView().subscribe((data) => {
      // console.log('code', data.data);

      // console.log(data.data[0].type);
      this.InstrumentCodeof = data.data;
      // this.BackUpdata = data.data;
    });
    // this.dataservice.MasterTest_getView().subscribe((data) => {
    //   // console.log(data.data[0].type);
    //   this.InstrumentCode = data.data;
    //   // this.BackUpdata = data.data;
    // });

    this.dataservice.MasterCali_Request_getView().subscribe((data) => {
      // console.log(data.data);
      this.CalibrationRequestof = data.data;
      // this.BackUpdata = data.data;
    });

    this.dataservice.calibrationtype_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.calibrationtypeof = data.data;
      // this.BackUpdata = data.data;
    });
  }

  public partyoffun(): void {
    this.dataservice.Request_getViewparty().subscribe((data) => {
      this.Party = data.data;
      // console.log('dep', data.data);
    });
  }

  public year(): void {
    // debugger;
    // console.log(this.registerDetails.date);
    var year = this.datePipe.transform(this.registerDetails.date, 'yyyy');
    var month = this.datePipe.transform(this.registerDetails.date, 'MM');
    // console.log(month);
    // console.log(year);
    // console.log(this.registerDetails.RequestType);

    if (year != undefined && month != undefined) {
      if (this.registerDetails.RequestType == 'Schedule') {
        this.dataservice.Calibration_request(year, month).subscribe((data) => {
          console.log('data', data.data);

          if (data.data != '') {
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
      } else {
        if (this.registerDetails.RequestType == 'Breakage') {
          this.toastr.error('Error!!!', 'Breakage Date Exists.', {
            timeOut: 3000,
          });
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
        }
        if (this.registerDetails.RequestType == 'Pre Plan') {
          this.toastr.error('Error!!!', 'Pre Plan Date Exists.', {
            timeOut: 3000,
          });
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
        }
        // alert("No");
      }
      // else if(this.registerDetails.RequestType != "Schedule"){
      //   this.toastr.error('Error!!!', 'Schedule Date Exists.', {
      //           timeOut: 3000,
      //         });
      //   let currentUrl = this.router.url;
      //   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      //   this.router.onSameUrlNavigation = 'reload';
      //   this.router.navigate([currentUrl]);

      // }
    }
  }

  public tabledata(): void {
    this.dataservice.Request_getView().subscribe((data) => {
      this.collection = data.data;
      this.BackUpdata = data.data;
    });
  }

  instrumentcodeclick(event: any) {
    let selectedLaw: any = event.target.value;
    let splitValue = selectedLaw.split(',');
    // console.log(splitValue);

    this.registerDetails.InstrumentName = splitValue[1];
  }

  public store(): void {
    // // console.log("code",this.registerDetails.InstrumentCode?.toString());
    // // console.log("code",this.registerDetails.InstrumentName?.toString());
    // // console.log("code",this.registerDetails.Party?.toString());
    // this.InsCode = this.registerDetails.InstrumentCode?.toString();
    // this.registerDetails.InstrumentCode = this.InsCode;
    // this.InsName = this.registerDetails.InstrumentName?.toString();
    // this.registerDetails.InstrumentName = this.InsName;
    // this.PartySelect = this.registerDetails.Party?.toString();
    // this.registerDetails.Party = this.PartySelect;

    // if (
    //   this.registerDetails.date === undefined ||
    //   //  (this.registerDetails.Quantity === undefined) ||
    //   this.registerDetails.calibrationlocation === '' ||
    //   this.registerDetails.InstrumentCode === '' ||
    //   this.registerDetails.RequestType === '' ||
    //   this.registerDetails.InstrumentName === '' ||
    //   this.registerDetails.LPIdentification === '' ||
    //   this.registerDetails.BreakageNo === '' ||
    //   this.registerDetails.Party === '' ||
    //   this.registerDetails.calibrationtype === '' ||
    //   // (this.registerDetails.Quantity === undefined) ||
    //   this.registerDetails.RaiseDc === ''
    // ) {
    //   alert('Enter the Details');
    // } else {
    //   this.dataservice.Request_postUser(this.registerDetails).subscribe(
    //     (data) => {
    //       // alert("Added");
    //       // console.log(data.data);

    //       if (data.data) {
    //         this.toastr.success('Created!!!', 'Request Created Successfully.', {
    //           timeOut: 3000,
    //         });
    //         let currentUrl = this.router.url;
    //         this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //         this.router.onSameUrlNavigation = 'reload';
    //         this.router.navigate([currentUrl]);
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
    var RequestType = this.registerDetails.RequestType;
    var InstrumentCode = this.registerDetails.InstrumentCode?.toString();
    var InstrumentName = this.registerDetails.InstrumentName?.toString();
    var LPIdentification = this.registerDetails.LPIdentification;
    var Party = this.registerDetails.Party?.toString();
    var Quantity = this.registerDetails.Quantity;
    var RaiseDc = this.registerDetails.RaiseDc;
    var calibrationlocation = this.registerDetails.calibrationlocation;
    var calibrationtype = this.registerDetails.calibrationtype;
    var BreakageNo = this.registerDetails.BreakageNo;
    var Requesttypeselected = this.registerDetails.Requesttypeselected;

    if (date == undefined || date == undefined) {
      this.toastr.warning('Warning!!!', 'date is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (RequestType == '' || RequestType == undefined) {
      this.toastr.warning('Warning!!!', 'RequestType is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

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

    if (LPIdentification == '' || LPIdentification == undefined) {
      this.toastr.warning('Warning!!!', 'LPIdentification is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Party == '' || Party == undefined) {
      this.toastr.warning('Warning!!!', 'Party  is required!', {
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

    if (RaiseDc == '' || RaiseDc == undefined) {
      this.toastr.warning('Warning!!!', 'RaiseDc   is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (calibrationlocation == '' || calibrationlocation == undefined) {
      this.toastr.warning('Warning!!!', 'calibrationlocation  is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (calibrationtype == '' || calibrationtype == undefined) {
      this.toastr.warning('Warning!!!', 'calibrationtype   is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (BreakageNo == '' || BreakageNo == undefined) {
      this.toastr.warning('Warning!!!', 'BreakageNo   is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Requesttypeselected == '' || Requesttypeselected == undefined) {
      this.toastr.warning('Warning!!!', 'Requesttypeselected    is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    this.dataservice
      .Request_postUser(this.registerDetails)
      .subscribe((data) => {
        this.collection = data.data;

        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        this.tabledata();
      });
  }
  public deleteUsers(id: string): void {
    // console.log(id);
    this.dataservice.Request_DeleteSingleUser(id, this.collection).subscribe(
      (data: any) => {
        this.tabledata();
      },
      (err) => console.log('its error')
    );
  }
  update() {
    this.InsCode = this.registerDetails.InstrumentCode?.toString();
    this.registerDetails.InstrumentCode = this.InsCode;
    this.InsName = this.registerDetails.InstrumentName?.toString();
    this.registerDetails.InstrumentName = this.InsName;
    this.PartySelect = this.registerDetails.Party?.toString();
    this.registerDetails.Party = this.PartySelect;
    if (
      this.registerDetails.date === undefined ||
      this.registerDetails.InstrumentCode === undefined ||
      this.registerDetails.RequestType === undefined ||
      this.registerDetails.InstrumentName === undefined ||
      this.registerDetails.LPIdentification === undefined ||
      this.registerDetails.Party === undefined ||
      this.registerDetails.Quantity === undefined ||
      this.registerDetails.calibrationlocation === undefined ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.RequestType === '' ||
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.LPIdentification === '' ||
      this.registerDetails.Party === '' ||
      this.registerDetails.calibrationtype === '' ||
      this.registerDetails.BreakageNo === '' ||
      this.registerDetails.Quantity === undefined
    ) {
      alert('Enter the Details');
    } else {
      this.dataservice
        .Request_updateSingleUser(this.registerDetails.id, this.registerDetails)
        .subscribe(
          (data) => {
            // alert("Update");
            // console.log(data);
            if (data.data) {
              this.toastr.success(
                'Updated!!!',
                'Request Updated Successfully.',
                {
                  timeOut: 3000,
                }
              );
              let currentUrl = this.router.url;
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate([currentUrl]);
              this.tabledata();
            }
            // else{
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
    alert(this.registerDetails.RequestType);
    switch (this.registerDetails.RequestType) {
      case 'breakage':
        // debugger;
        this.dataservice.BreakageRequestno_getView().subscribe((data) => {
          console.log(data.data[1]);
          //alert(data.data[0].BreakageNo);
          this.Requesttypelist = data.data;
          // this.BackUpdata = data.data;
        });

        break;
      case 'shedule':
        this.dataservice.MasterTest_getViewsheduleno().subscribe((data) => {
          console.log(data.data[1]);
          //alert(data.data[0].BreakageNo);
          this.Requesttypelist = data.data;
          // this.BackUpdata = data.data;
        });

        break;

      case 'Recalibration':
        this.dataservice.MasterTest_getViewrecalibration().subscribe((data) => {
          console.log(data.data[1]);
          //alert(data.data[0].BreakageNo);
          this.Requesttypelist = data.data;
          // this.BackUpdata = data.data;
        });

        break;

      case 'Reservice':
        this.dataservice.MasterTest_getViewreservice().subscribe((data) => {
          console.log(data.data[1]);
          //alert(data.data[0].BreakageNo);
          this.Requesttypelist = data.data;
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
    this.registerDetails.date = this.date;
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
          let Party: [];
          Party = this.registerDetails.Party?.split(',');
          this.SelectedItem = [];
          Party?.forEach((result, index) => {
            // console.log(result);
            // const IName = {
            //    result
            // }
            this.SelectedItem.push(result);
            // if (Party.length - 1 == index) {
            //   this.registerDetails.Party = this.SelectedItem
            // console.log(this.registerDetails);
            // console.log(Party );
            // }
          });
          this.registerDetails.Party = this.SelectedItem;
        }
      });
      var year = this.datePipe.transform(this.date, 'yyyy');
      var month = this.datePipe.transform(this.date, 'MM');
      this.dataservice.Calibration_request(year, month).subscribe((data) => {
        if (data.data != '') {
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
    // window.document.getElementById('selection')!.style.display='block';
  }

  public Click_Head(index: number, heading: string): void {
    this.collection = [...this.BackUpdata];
    if (heading == 'RequestType') {
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
      if (this.SearchField == 'RequestType') {
        this.collection = this.collection.filter(
          (f) => f.type == this.searchvalue
        );
      }
    }
  }

  reset() {
    (this.registerDetails.date = undefined),
      (this.registerDetails.RequestType = ''),
      (this.registerDetails.InstrumentName = ''),
      (this.registerDetails.InstrumentCode = ''),
      (this.registerDetails.LPIdentification = ''),
      (this.registerDetails.Party = ''),
      // this.registerDetails.Quantity = '',
      (this.registerDetails.calibrationlocation = ''),
      (this.registerDetails.calibrationtype = ''),
      (this.registerDetails.BreakageNo = ''),
      (this.registerDetails.RaiseDc = '');
  }
  requesttypedetails(event: any) {
    // debugger;
  }

  checkedAmc(event: any, i: any, data: any) {
    console.log('event', event.target.checked);
    console.log('i', i + 1);
    console.log('data', data);
  }
}
