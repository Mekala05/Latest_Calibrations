import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { calibrationReport } from './model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-calibration-report',
  templateUrl: './calibration-report.component.html',
  styleUrls: ['./calibration-report.component.scss'],
})
export class CalibrationReportComponent implements OnInit {
  public previousDate!: Date;
  public registerDetails: calibrationReport = {};
  public collection: any[] = [];
  public Category: any[] = [];
  public Type: any[] = [];
  public CurrentLocation: any[] = [];
  public Make: any[] = [];
  public BackUpdata = [] as any;
  public validate: any;
  public instrument: any[] = [];
  public instrumentnameof: any[] = [];
  public BranchUnit: any[] = [];
  public codeValue: any;
  public valueof: any;
  public storeDetails: any[] = [];
  public Location: any[] = [];
  public InstrumentCode: any[] = [];
  SAPRefferenceCode: any[] = [];
  public InstrumentCodeof: any[] = [];
  typeof: any[] = [];
  // type: any[] = [];
  public timeout: any = null;
  public searchvalue: any;
  public HighlightRow: any;
  public HighlightHead: any = 1;
  public date: any;
  public SearchField: string = '';
  public user_name: any = [];
  public butDisabled = false;
  public instruname: any;
  public Departmentof: any;
  public locationselect: any;
  public instrucodetionselect: any;
  public maximumTime: any;
  public TableHeading = [
    {
      name: 'SI No',
    },
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
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private routers: ActivatedRoute,
    private router: Router // private router: Router
  ) {
    {
      if (this.routers.snapshot.queryParams.id) {
        this.dataservice
          .MasterTest_getViewData(this.routers.snapshot.queryParams.id)
          .subscribe(
            (data: any) => {
              console.log(data);
              this.registerDetails.InstrumentName = data.data[0].InstrumentName;

              this.registerDetails.InstrumentCode = data.data[0].InstrumentCode;

              this.registerDetails.category = data.data[0].category;

              this.category('', data.data[0].category);

              this.registerDetails.type = data.data[0].type;
              this.typemaster('', data.data[0].type);

              this.registerDetails.MasterType = data.data[0].MasterType;
              this.registerDetails.InstrumentRefferenceCode =
                data.data[0].InstrumentRefferenceCode;
              // this.registerDetails.InstrumentName = data.data[0].InstrumentName;
              // this.registerDetails.InstrumentCode = data.data[0].InstrumentCode;
              this.registerDetails.Location = data.data[0].Location;
              this.registerDetails.CurrentLocation =
                data.data[0].CurrentLocation;
              this.registerDetails.make = data.data[0].make;
              this.registerDetails.Department = data.data[0].Department;
              this.registerDetails.range = data.data[0].range;
              this.registerDetails.Specification = data.data[0].Specification;
              this.registerDetails.masterspecification =
                data.data[0].masterspecification;

              this.registerDetails.Description = data.data[0].Description;
              this.registerDetails.Remark = data.data[0].Remark;
              this.registerDetails.MxLifeTime = data.data[0].MxLifeTime;
              this.registerDetails.SAPRefferenceCode =
                data.data[0].SAPRefferenceCode;

              this.registerDetails.Observation = data.data[0].Observation;
              this.registerDetails.MxLifeTimeNumber =
                data.data[0].MxLifeTimeNumber;

              this.registerDetails.active = data.data[0].active;
              this.registerDetails.amccheckbox = data.data[0].amccheckbox;
            },
            () => console.log('its error')
          );

        // }
      }
    }
  }

  ngOnInit(): void {
    this.getCategory();
    this.tabledata();
    this.getType();
    this.getMake();
    // this.Instrument();
    this.type();
    // this.SAPRefferenceCodefun();
    //this.Departmentof();

    // this.getLocation();

    // this.Branchunit();

    this.registerDetails.date = new Date();
    this.registerDetails.dueDate = new Date();

    this.user_name = localStorage.getItem('Login_name');
  }

  // onKeyIns(x:any) {

  //   this.dataservice.calibrationmasterlist_postUser(this.registerDetails.InstrumentCode,this.collection).subscribe((data)=>{
  //     console.log(data.data[0]);
  //      this.registerDetails.InstrumentName = data.data[0].InstrumentName;
  //      this.registerDetails.Location = data.data[0].Location;
  //      this.registerDetails.Department = data.data[0].Department;

  //   })

  // }

  // public SAPRefferenceCodefun(): void {
  //   // debugger
  //   this.dataservice
  //     .MasterTest_getViewParticular_getView_sapref()
  //     .subscribe((data) => {
  //       // console.log('tt',data.data);

  //       this.SAPRefferenceCode = data.data;
  //     });

  //   this.dataservice.Calibrationlocationmaster_getView().subscribe((data) => {
  //     console.log(data);
  //     this.Location = data.data;
  //     // debugger
  //     // console.log("usdhfshdgoifdhgi");
  //     console.log(this.Location);
  //     // this.BackUpdata = data.data;
  //   });
  // }
  public loadInstrument(): void {}
  public tabledata(): void {
    // this.dataservice.MasterTest_getView().subscribe((data) => {
    //   console.log('tabledata', data.data);
    //   this.collection = data.data;
    //   this.BackUpdata = data.data;
    // });
    //console.log(this.collection);

    this.dataservice.calibrationmaster_getView().subscribe((data) => {
      console.log(',,,,' + data.data);

      this.collection = data.data;
      this.BackUpdata = data.data;
      this.instrumentnameof = data.data;
    });
    // console.log(this.collection);

    this.dataservice.MasterTest_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.InstrumentCodeof = data.data;
      // this.BackUpdata = data.data;
    });

    this.dataservice.Calibrationlocationmaster_getView().subscribe((data) => {
      console.log(data.data);
      // console.log(data.data[0].type);

      this.BranchUnit = data.data;
      // this.BackUpdata = data.data;
    });

    this.dataservice.locationmasterdepartmet_getView().subscribe((data) => {
      console.log(data.data);
      // console.log(data.data[0].type);
      this.Departmentof = data.data;
      // this.BackUpdata = data.data;
    });

    this.dataservice
      .MasterTest_getViewParticular_getView_sapref()
      .subscribe((data) => {
        // console.log('tt',data.data);

        this.SAPRefferenceCode = data.data;
      });

    this.dataservice.Calibrationlocationmaster_getView().subscribe((data) => {
      console.log(data);
      this.Location = data.data;
      // debugger
      // console.log("usdhfshdgoifdhgi");
      console.log(this.Location);
      // this.BackUpdata = data.data;
    });
  }
  update() {
    if (
      this.registerDetails.Description === '' ||
      this.registerDetails.Specification === '' ||
      this.registerDetails.category === '' ||
      this.registerDetails.type === '' ||
      this.registerDetails.MasterType === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      // this.registerDetails.make === '' ||
      this.registerDetails.range === '' ||
      this.registerDetails.masterspecification === '' ||
      this.registerDetails.date === undefined ||
      this.registerDetails.MxLifeTime === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.active === undefined ||
      this.registerDetails.amccheckbox === undefined ||
      this.registerDetails.Observation === '' ||
      this.registerDetails.Remark === '' ||
      this.registerDetails.Description === '' ||
      this.registerDetails.Specification === '' ||
      this.registerDetails.CurrentLocation === '' ||
      this.registerDetails.Observation === '' ||
      this.registerDetails.Remark === '' ||
      this.registerDetails.category === '' ||
      this.registerDetails.type === '' ||
      this.registerDetails.Department === '' ||
      this.registerDetails.MasterType === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.make === '' ||
      this.registerDetails.range === '' ||
      // this.registerDetails.masterspecification === '' ||
      this.registerDetails.MxLifeTime === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.Specification === undefined ||
      this.registerDetails.category === undefined ||
      // this.registerDetails.type === undefined ||
      this.registerDetails.MasterType === undefined ||
      this.registerDetails.SAPRefferenceCode === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      // this.registerDetails.make === '' ||
      this.registerDetails.range === '' ||
      // this.registerDetails.masterspecification === '' ||
      this.registerDetails.date === undefined ||
      this.registerDetails.MxLifeTime === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.active === undefined ||
      this.registerDetails.amccheckbox === undefined ||
      this.registerDetails.Observation === '' ||
      this.registerDetails.Remark === '' ||
      this.registerDetails.Description === '' ||
      this.registerDetails.Specification === '' ||
      this.registerDetails.CurrentLocation === '' ||
      this.registerDetails.Observation === '' ||
      this.registerDetails.Remark === '' ||
      this.registerDetails.category === '' ||
      // this.registerDetails.type === '' ||
      this.registerDetails.MasterType === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      // this.registerDetails.make === '' ||
      this.registerDetails.range === '' ||
      // this.registerDetails.masterspecification === '' ||
      this.registerDetails.MxLifeTime === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.InstrumentRefferenceCode === ''
    ) {
      alert('Enter the Details');
    } else {
      console.log(`dsd  ${this.registerDetails.InstrumentCode}`);
      // this.submitted = true;
      this.dataservice
        .MasterTest_updateSingleUser(
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
                'Calibration Master & Error Description Updated Successfully.',
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
                  'Calibration Master & Error Description Already Exists.',
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
  // onDateChange(newDate: Date) {
  //   this.previousDate = new Date(newDate);
  // }
  getUser(id: object) {
    this.registerDetails = { ...id };
    // console.log(this.registerDetails.date);
    this.date = this.datePipe.transform(
      this.registerDetails.date,
      'dd-mm-yyyy'
    );
    this.registerDetails.date = this.date;
    // console.log(this.registerDetails.date);
    this.user_name = this.user_name;
  }
  // public deleteUsers(id: Number): void {
  //   // console.log(id);
  //   this.dataservice.MasterTest_DeleteSingleUser(id, this.collection).subscribe(
  //     () => {
  //       this.tabledata();
  //     },
  //     () => console.log('its error')
  //   );
  // }

  public deleteUsers(id: string): void {
    console.log(id);
    debugger;
    this.dataservice.MasterTest_DeleteSingleUser(id, this.collection).subscribe(
      (data: any) => {
        this.tabledata();
      },
      (err) => console.log('its error')
    );
  }

  public store(): void {
    // this.date = this.datePipe.transform(this.registerDetails.date, 'yyyy-MM-dd,h:mm a');
    // this.registerDetails.date = this.date;
    // console.log(this.registerDetails.date);

    if (
      this.registerDetails.Description === '' ||
      this.registerDetails.Specification === '' ||
      this.registerDetails.category === '' ||
      this.registerDetails.type === '' ||
      this.registerDetails.MasterType === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.make === '' ||
      this.registerDetails.range === '' ||
      this.registerDetails.masterspecification === '' ||
      this.registerDetails.date === undefined ||
      this.registerDetails.MxLifeTime === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.active === undefined ||
      this.registerDetails.amccheckbox === undefined ||
      this.registerDetails.Observation === '' ||
      this.registerDetails.Remark === '' ||
      this.registerDetails.Description === '' ||
      this.registerDetails.Specification === '' ||
      this.registerDetails.Observation === '' ||
      this.registerDetails.Remark === '' ||
      this.registerDetails.category === '' ||
      this.registerDetails.Department === '' ||
      // this.registerDetails.type === '' ||
      this.registerDetails.MasterType === '' ||
      this.registerDetails.SAPRefferenceCode === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.make === '' ||
      // this.registerDetails.range === '' ||
      this.registerDetails.masterspecification === '' ||
      // this.registerDetails.MxLifeTime === '' ||
      // this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.MxLifeTimeNumber === ''
    ) {
      alert('Enter the Details');
    } else {
      this.registerDetails.InstrumentCode = this.codeValue;
      console.log(this.codeValue);
      console.log('sdfasdfasdf', this.registerDetails);

      this.dataservice.MasterTest_postUser(this.registerDetails).subscribe(
        (data) => {
          // alert("Added");
          if (data.data) {
            this.toastr.success(
              'Created!!!',
              'Calibration Master & Error Description Created Successfully.',
              {
                timeOut: 3000,
              }
            );
            this.registerDetails.Description = '';
            this.registerDetails.Specification = '';
            this.registerDetails.Observation = '';
            this.registerDetails.Remark = '';

            let currentUrl = this.router.url;
            //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            //this.router.onSameUrlNavigation = 'reload';
            //this.router.navigate([currentUrl]);
            this.tabledata();
          } else {
            if (data.error.errors[0].validatorKey) {
              this.toastr.error(
                'Error!!!',
                'Calibration Master & Error Description Already Exists.',
                {
                  timeOut: 3000,
                }
              );
            }
          }
        },
        () => console.log('its error')
      );
    }
  }
  reset() {
    (this.registerDetails.Description = ''),
      (this.registerDetails.Specification = ''),
      (this.registerDetails.Observation = ''),
      (this.registerDetails.Remark = ''),
      (this.registerDetails.category = ''),
      (this.registerDetails.type = ''),
      (this.registerDetails.MasterType = ''),
      (this.registerDetails.InstrumentCode = ''),
      (this.registerDetails.InstrumentName = ''),
      (this.registerDetails.make = ''),
      (this.registerDetails.range = ''),
      (this.registerDetails.masterspecification = ''),
      // this.registerDetails.date = '',
      (this.registerDetails.MxLifeTime = ''),
      (this.registerDetails.MxLifeTimeNumber = ''),
      (this.registerDetails.InstrumentRefferenceCode = ''),
      (this.registerDetails.SAPRefferenceCode = ''),
      (this.registerDetails.CurrentLocation = ''),
      (this.registerDetails.Department = ''),
      (this.registerDetails.Location = '');
  }

  public getCategory(): void {
    this.dataservice.MasterCategory_getView().subscribe((data) => {
      // console.log(data.data[0].category);
      this.Category = data.data;
      // console.log(this.Category);
      // this.BackUpdata = data.data;
    });
  }
  public getType(): void {
    this.dataservice.MasterType_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.Type = data.data;
      // this.BackUpdata = data.data;
    });
  }

  public getMake(): void {
    this.dataservice.MasterMake_getView().subscribe((data) => {
      // console.log(data.data[0].description);
      this.Make = data.data;
      // this.BackUpdata = data.data;
    });
  }

  GetStats(event: any) {
    let selectedLaw: any = event.target.checked;
    console.log(selectedLaw);
  }

  //   res(event: any) {
  //     let selectedLaw: any = event.target.value;
  // this.instruname=selectedLaw;
  // console.log("instrumentname",this.instruname);

  //     // this.butDisabled = true;

  //   }

  locationdata(event: any) {
    let selectedLaw: any = event.target.value;
    // this.locationselect = selectedLaw;
    var shortname = selectedLaw.split(',');
    var instrument_code: any = this.InstrumentCodeof;
    let code = instrument_code.split('||');
    let typesortname = this.valueof;
    let tsortname = typesortname.split('||');

    console.log('inssd', code[0]);
    this.registerDetails.InstrumentRefferenceCode = shortname[0];
    this.registerDetails.InstrumentCode = shortname[0];

    this.codeValue = this.locationselect + '-' + this.InstrumentCodeof;
    this.registerDetails.InstrumentRefferenceCode =
      shortname[0] + '-' + this.InstrumentCodeof;
    this.registerDetails.InstrumentCode =
      shortname[0] + '-' + tsortname[1] + '-' + code[0];

    this.InstrumentCodeof + '-' + shortname[0];

    this.registerDetails.InstrumentRefferenceCode =
      shortname[0] + '-' + tsortname[1] + '-' + code[0];

    // this.InstrumentRefferenceCode + '-' + shortname[0];

    // this.registerDetails.Department = selectedLaw[2];

    this.dataservice.departmentdata(shortname[0]).subscribe((data) => {
      console.log(data.data[0].Department);
      this.registerDetails.Department = data.data[0].Department;
    });
  }

  public type(): void {
    this.dataservice.type_getView().subscribe((data) => {
      console.log('fgh', data);

      console.log(data.data[0].InstrumentName);

      // console.log(data.data[0].CategoryMaster.id);
      // console.log(data.data[0].CategoryMaster.category);

      this.type = data.data;
      // this.BackUpdata = data.data;
    });
  }

  code(event: any) {
    // alert(event);
    let selectedLaw: any = event.target.value;

    let coderesult = selectedLaw.split(',');
    this.codeValue = coderesult[1];
    console.log(coderesult);
    // var shortname = selectedLaw.split(',');
    // this.registerDetails.InstrumentCode = shortname[0];

    this.registerDetails.InstrumentCode = coderesult[1];
    this.registerDetails.InstrumentRefferenceCode = coderesult[1];
    // this.registerDetails.InstrumentName = coderesult[1];
    // this.registerDetails.InstrumentName=coderesult[1];
    this.InstrumentCodeof = selectedLaw;
    console.log('InstrumentCodeof', this.InstrumentCodeof);
  }

  lifeTime(event: any) {
    let selectedLaw: any = event.target.value;
    this.maximumTime = selectedLaw;
  }

  onKeyDate(event: any) {
    let selectedLaw: any = event.target.value;
    if (this.maximumTime == undefined) {
      alert('select the Maximum Lifetime');
      this.registerDetails.MxLifeTimeNumber = '';
    }
    // this.registerDetails.MxLifeTimeNumber = ""
    if (this.maximumTime == 'Week') {
      let weekValue = parseInt(selectedLaw) * 7;
      //  console.log(weekValue);
      let send_date: any = new Date();
      send_date.setDate(send_date.getDate() + weekValue);
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        //  console.log(setDate);
        this.registerDetails.dueDate = setDate;
      }
    }
    if (this.maximumTime == 'Day') {
      let weekValue = parseInt(selectedLaw) * 1;
      //  console.log(weekValue);
      let send_date: any = new Date();
      send_date.setDate(send_date.getDate() + weekValue);
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        //  console.log(setDate);
        this.registerDetails.dueDate = setDate;
      }
    }

    if (this.maximumTime == 'Month') {
      let weekValue = parseInt(selectedLaw) * 1;
      //  console.log(weekValue);
      let send_date: any = new Date();
      send_date.setMonth(send_date.getMonth() + weekValue);
      // console.log(send_date);
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        //  console.log(setDate);
        this.registerDetails.dueDate = setDate;
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
        this.registerDetails.dueDate = setDate;
      }
    }
    if (this.maximumTime == 'Quarterly') {
      let weekValue = parseInt(selectedLaw) * 3;
      //  console.log(weekValue);
      let send_date: any = new Date();
      send_date.setMonth(send_date.getMonth() + weekValue);
      // console.log(send_date);
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        //  console.log(setDate);
        this.registerDetails.dueDate = setDate;
      }
    }
  }

  category(event: any, data: any = '') {
    // alert(event.target.value);
    // console.log('data', data);

    let selectedvalue1: any = event != '' ? event.target.value : data;
    // console.log('ddddddddddddddddd', selectedvalue1);

    this.dataservice.categorydetails(selectedvalue1).subscribe((data) => {
      // console.log('typeeee', data);
      this.Type = data.data;
      this.instrument = data.data;
      // console.log(this.Category);
      // this.BackUpdata = data.data;
    });
  }

  typemaster(event: any, data: any = '') {
    // alert(event.target.value);
    let selectedvalue: any = event != '' ? event.target.value : data;
    var shortname = selectedvalue.split('||');

    this.valueof = selectedvalue;
    this.dataservice.typedetails(shortname[0]).subscribe((data) => {
      this.instrument = data.data;

      // this.BackUpdata = data.data;
    });
  }

  public Click_Head(index: number, heading: string): void {
    this.collection = [...this.BackUpdata];
    if (heading == 'Description') {
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
      if (this.SearchField == 'Description') {
        this.collection = this.collection.filter(
          (f) => f.type == this.searchvalue
        );
      }
    }
  }
}
