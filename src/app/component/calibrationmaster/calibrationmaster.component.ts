import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { Image, master } from './model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { Location } from '@angular/common';
// import { FileUploadService } from 'src/app/services/file-upload.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import {
//   NgxFileDropEntry,
//   FileSystemFileEntry,
//   FileSystemDirectoryEntry,
// } from 'ngx-file-drop';
// import { Router } from '@angular/router';

// import { CommonModelService } from 'src/app/shared/service/common-model.service';
//import { Console } from 'console';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-calibrationmaster',
  templateUrl: './calibrationmaster.component.html',
  styleUrls: ['./calibrationmaster.component.scss'],
})
export class CalibrationmasterComponent implements OnInit {
  // @ViewChild('fileUpload') : ElementRef;
  @ViewChild('fileUpload', { static: false })
  fileUpload: ElementRef<HTMLInputElement> = {} as ElementRef;
  fileInputLabel: string = '';
  src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  // public files: NgxFileDropEntry[] = [];
  public previousDate!: Date;
  public registerDetails: master = {};
  public collection: any[] = [];
  public targetpath: any;
  public Category: any[] = [];
  uploadService: any[] = [];
  public Type: any[] = [];
  uploadedFiles: any = [];
  attachmentdelete: any[] = [];
  images: any;
  event: any[] = [];
  closeResult = '';
  element: any[] = [];
  mydata: any[] = [];
  test = false;
  changedNumber: any;
  AmcChecked: any;
  viewDoc: any[] = [];
  @Output() fileUploadChangeEmitter = new EventEmitter<any>();
  public file: any;
  public imagePreviewUrl: any;
  public collectiondata: any[] = [];
  public CurrentLocation: any[] = [];
  public text: any;
  public Make: any[] = [];
  public data: any[] = [];

  public newDynamic: any[] = [];
  public MxLifeTimeNumber: any[] = [];
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
  public SAPRefferenceCode: any[] = [];
  public InstrumentCodeof: any[] = [];
  typeof: any[] = [];
  // type: any[] = [];
  public timeout: any = null;
  public searchvalue: any;
  public HighlightRow: any;
  public HighlightHead: any = 1;
  public date: any;
  public SearchField: string = 'Description';
  public user_name: any = [];
  public MxLifeTime: any = [];
  // uploadedFiles: any = [];
  public saveAs: any;
  public butDisabled = false;
  public instruname: any;
  public Departmentof: any;
  public locationselect: any;
  public isShown: boolean = true;
  public instrucodetionselect: any;
  public maximumTime: any;
  imageSrc: string = '';
  headerImage: any;
  myFiles: any[] = [];
  sMsg: string = '';

  public Heading = [
    {
      name: 'SI No',
    },
    {
      name: 'File Section',
    },
    {
      name: 'Choosefile',
    },
    {
      name: 'View',
    },
    {
      name: 'Download',
    },
    {
      name: 'Delete',
    },
  ];

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
    private http: HttpClient,
    public location: Location,
    public modalService: NgbModal,
    // private uploadService: FileUploadService,
    private router: Router // private router: Router
  ) {
    {
      if (this.routers.snapshot.queryParams.id) {
        this.dataservice
          .MasterTest_getViewData(this.routers.snapshot.queryParams.id)
          .subscribe(
            (data: any) => {
              let instrument: any = [];
              data.data.map((item: any) => {
                if (item.id === +this.routers.snapshot.queryParams.id) {
                  instrument.push(item);
                }
              });

              this.collection = instrument;
              this.BackUpdata = instrument;
              this.registerDetails.InstrumentName =
                instrument[0].InstrumentName;

              this.registerDetails.InstrumentCode =
                instrument[0].InstrumentCode;

              this.registerDetails.category = instrument[0].category;

              this.category('', instrument[0].category);

              this.registerDetails.type = instrument[0].type;
              this.typemaster('', instrument[0].type);

              this.registerDetails.MasterType = instrument[0].MasterType;
              this.registerDetails.InstrumentRefferenceCode =
                instrument[0].InstrumentRefferenceCode;

              this.registerDetails.Location = instrument[0].Location;
              this.registerDetails.CurrentLocation =
                instrument[0].CurrentLocation;
              this.registerDetails.make = instrument[0].make;
              this.registerDetails.Department = instrument[0].Department;
              this.registerDetails.range = instrument[0].range;
              this.registerDetails.Specification = instrument[0].Specification;
              this.registerDetails.masterspecification =
                instrument[0].masterspecification;

              this.registerDetails.Description = instrument[0].Description;
              this.registerDetails.Remark = instrument[0].Remark;
              this.registerDetails.MxLifeTime = instrument[0].MxLifeTime;
              this.registerDetails.SAPRefferenceCode =
                instrument[0].SAPRefferenceCode;

              this.registerDetails.Observation = instrument[0].Observation;
              this.registerDetails.MxLifeTimeNumber =
                instrument[0].MxLifeTimeNumber;

              this.registerDetails.active = instrument[0].active;
              this.registerDetails.amccheckbox = instrument[0].amccheckbox;
              this.registerDetails.headerImage = instrument[0].headerImage;

              console.log(instrument[0].headerImage);

              this.imageSrc = instrument[0].headerImage;
            },
            () => console.log('its error')
          );

        // }
      }
    }
  }

  ngOnInit(): void {
    this.getCategory();
    this.getType();
    this.getMake();
    this.type();
    this.tabledata();
    this.AmcChecked = false;

    this.registerDetails.date = new Date();
    this.registerDetails.dueDate = new Date();

    this.user_name = localStorage.getItem('Login_name');

    // this.dataservice.MasterTest_getViewtablerecord1().subscribe((data) => {
    //   console.log('asdfadf', data);

    //   this.collection = data.data;
    //   // this.BackUpdata = data.data;
    // });
    // this.tabledata();
  }

  public loadInstrument(): void {}
  private tabledata1(): void {
    this.dataservice.MasterTest_getViewtablerecord1().subscribe((data) => {
      this.collection = data.data;
      this.BackUpdata = data.data;
    });
  }
  private tabledata(): void {
    // this.dataservice.MasterTest_getViewtablerecord1().subscribe((data) => {
    //   this.collection = data.data;
    //   this.BackUpdata = data.data;
    // });

    // this.dataservice.MasterTest_getView().subscribe((data) => {
    //   console.log('tabledata', data.data);
    //   this.collection = data.data;
    //   this.BackUpdata = data.data;
    // });
    // console.log(this.collection);

    this.dataservice.calibrationmaster_getView().subscribe((data) => {
      // console.log(data.data);

      // this.collection = data.data;
      // console.log('getview', data.data);

      this.BackUpdata = data.data;
      this.instrumentnameof = data.data;
    });
    // console.log(this.collection);

    this.dataservice.MasterTest_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.InstrumentCodeof = data.data;
      // this.BackUpdata = data.data;
    });

    // this.dataservice.Calibrationlocationmaster_getView().subscribe((data) => {
    //   console.log(data.data);
    //   // console.log(data.data[0].type);

    //   this.BranchUnit = data.data;
    //   // this.BackUpdata = data.data;
    // });

    this.dataservice.locationmasterdepartmet_getView().subscribe((data) => {
      // console.log(data.data);
      // console.log(data.data[0].type);
      this.Departmentof = data.data;
      // this.BackUpdata = data.data;
    });

    // this.dataservice
    //   .MasterTest_getViewParticular_getView_sapref()
    //   .subscribe((data) => {
    //     // console.log('tt',data.data);

    //     this.SAPRefferenceCode = data.data;
    //   });

    // this.dataservice
    //   .MasterTest_getViewParticular_getView_sapref()
    //   .subscribe((data) => {
    //     // console.log('tt',data.data);

    //     this.SAPRefferenceCode = data.data;
    //   });

    this.dataservice.Calibrationlocationmaster_getView().subscribe((data) => {
      // console.log(data);
      this.Location = data.data;
      // debugger
      // console.log("usdhfshdgoifdhgi");
      // console.log(this.Location);
      // this.BackUpdata = data.data;
    });
  }

  back() {
    this.location.back();
  }

  update() {
    console.log('duedate', this.registerDetails.dueDate);

    if (
      this.registerDetails.Description === '' ||
      this.registerDetails.Specification === '' ||
      this.registerDetails.category === '' ||
      this.registerDetails.type === '' ||
      this.registerDetails.MasterType === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
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
      this.registerDetails.MxLifeTime === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.Specification === undefined ||
      this.registerDetails.category === undefined ||
      this.registerDetails.MasterType === undefined ||
      this.registerDetails.SAPRefferenceCode === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.range === '' ||
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
      this.registerDetails.MasterType === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.range === '' ||
      this.registerDetails.MxLifeTime === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.InstrumentRefferenceCode === ''
    ) {
      alert('Enter the Details');
    } else {
      this.collection = [];
      this.collection.push(this.registerDetails);

      this.dataservice
        .MasterTest_updateSingleUser(
          this.registerDetails.id,
          this.registerDetails
        )
        .subscribe(
          (data) => {
            if (data.data) {
              this.dataservice
                .MasterTest_getViewtablerecord1()
                .subscribe((data) => {
                  this.collection = data.data;
                  this.BackUpdata = data.data;
                });
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
              this.registerDetails.Description = '';
              this.registerDetails.Specification = '';
              this.registerDetails.Observation = '';
              this.registerDetails.Remark = '';
              // console.log(this.registerDetails.Description);
            } else {
              console.log('inside else');

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

  getUser(id: object) {
    this.registerDetails = { ...id };
    this.date = this.datePipe.transform(
      this.registerDetails.date,
      'dd-mm-yyyy'
    );
    this.registerDetails.date = this.date;
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
    // debugger;
    this.dataservice.MasterTest_DeleteSingleUser(id, this.collection).subscribe(
      (data: any) => {
        this.tabledata();
      },
      (err) => console.log('its error')
    );
  }

  fileChange(element: any) {
    this.uploadedFiles = element.target.files;
  }

  public selectimage() {
    console.log('inside image');

    //   console.log(event.target.files);
    //   this.images = event.target.files;
    //   debugger;
    //   this.dataservice.fileupload_Master(this.images).subscribe((data) => {
    //     console.log('suc', data);
    //   });
    //   // debugger;
    // if (event.target.files.length > 0) {
    //   const files = event.target.files[0];
    //   this.images = files;
    // }

    let formData = new FormData();
    console.log(this.uploadedFiles.length);

    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append(
        'uploads[]',
        this.uploadedFiles[i],
        this.uploadedFiles[i].name
      );
    }
    this.dataservice.fileupload_Master(formData).subscribe((data: any) => {
      console.log(data);
      this.registerDetails.headerImage = data.message;
    });
  }

  fileChanges(element: any) {
    this.uploadedFiles = element.target.files;
  }

  public store(): void {
    // this.date = this.datePipe.transform(this.registerDetails.date, 'yyyy-MM-dd,h:mm a');
    // this.registerDetails.date = this.date;
    // console.log(this.registerDetails.date);

    // if (
    //   this.registerDetails.Description === '' ||
    //   this.registerDetails.Specification === '' ||
    //   this.registerDetails.category === '' ||
    //   this.registerDetails.type === '' ||
    //   this.registerDetails.MasterType === '' ||
    //   this.registerDetails.InstrumentCode === '' ||
    //   this.registerDetails.InstrumentName === '' ||
    //   this.registerDetails.make === '' ||
    //   this.registerDetails.range === '' ||
    //   this.registerDetails.masterspecification === '' ||
    //   this.registerDetails.MxLifeTime === '' ||
    //   this.registerDetails.MxLifeTimeNumber === '' ||
    //   this.registerDetails.MxLifeTimeNumber === '' ||
    //   this.registerDetails.active === undefined ||
    //   this.registerDetails.amccheckbox === undefined ||
    //   this.registerDetails.Observation === '' ||
    //   this.registerDetails.Remark === '' ||
    //   this.registerDetails.Description === '' ||
    //   this.registerDetails.Specification === '' ||
    //   this.registerDetails.Observation === '' ||
    //   this.registerDetails.Remark === '' ||
    //   this.registerDetails.category === '' ||
    //   this.registerDetails.Department === '' ||
    //   // this.registerDetails.type === '' ||
    //   this.registerDetails.MasterType === '' ||
    //   this.registerDetails.SAPRefferenceCode === '' ||
    //   this.registerDetails.InstrumentCode === '' ||
    //   this.registerDetails.InstrumentName === '' ||
    //   this.registerDetails.make === '' ||
    //   // this.registerDetails.range === '' ||
    //   this.registerDetails.masterspecification === '' ||
    //   // this.registerDetails.MxLifeTime === '' ||
    //   // this.registerDetails.MxLifeTimeNumber === '' ||
    //   this.registerDetails.MxLifeTimeNumber === ''
    // ) {
    //   alert('Enter the Details');
    // } else {
    //   this.registerDetails.InstrumentCode = this.codeValue;
    //   console.log(this.codeValue);
    //   console.log('sdfasdfasdf', this.registerDetails);

    //   this.dataservice.MasterTest_postUser(this.registerDetails).subscribe(
    //     (data) => {
    //       this.dataservice
    //         .MasterTest_getViewtablerecord1()
    //         .subscribe((data) => {
    //           this.collection = data.data;
    //           this.BackUpdata = data.data;
    //         });

    //       // alert("Added");
    //       if (data.data) {
    //         this.toastr.success(
    //           'Created!!!',
    //           'Calibration Master & Error Description Created Successfully.',
    //           {
    //             timeOut: 3000,
    //           }
    //         );
    //         this.registerDetails.Description = '';
    //         this.registerDetails.Specification = '';
    //         this.registerDetails.Observation = '';
    //         this.registerDetails.Remark = '';

    //         let currentUrl = this.router.url;
    //         //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //         //this.router.onSameUrlNavigation = 'reload';
    //         //this.router.navigate([currentUrl]);
    //         this.tabledata();
    //       } else {
    //         if (data.error.errors[0].validatorKey) {
    //           this.toastr.error(
    //             'Error!!!',
    //             'Calibration Master & Error Description Already Exists.',
    //             {
    //               timeOut: 3000,
    //             }
    //           );
    //         }
    //       }
    //     },
    //     () => console.log('its error')
    //   );
    // }

    var category = this.registerDetails.category;
    var type = this.registerDetails.type;
    var MasterType = this.registerDetails.MasterType;
    var InstrumentCode = this.registerDetails.InstrumentCode;
    var InstrumentName = this.registerDetails.InstrumentName;
    var make = this.registerDetails.make;
    var range = this.registerDetails.range;
    var masterspecification = this.registerDetails.masterspecification;
    var CurrentLocation = this.registerDetails.CurrentLocation;
    var date = this.registerDetails.date;
    // var MxLifeTime = this.registerDetails.MxLifeTime;
    var MxLifeTimeNumber = this.registerDetails.MxLifeTimeNumber;
    var Location = this.registerDetails.Location;
    var file = this.registerDetails.file;
    var active = this.registerDetails.active;
    // var amccheckbox = this.registerDetails.amccheckbox;
    var Description = this.registerDetails.Description;
    var Specification = this.registerDetails.Specification;

    var Observation = this.registerDetails.Observation;
    var Remark = this.registerDetails.Remark;
    // var fileErrorDiscription = this.registerDetails.fileErrorDiscription;
    var InstrumentRefferenceCode =
      this.registerDetails.InstrumentRefferenceCode;
    var SAPRefferenceCode = this.registerDetails.SAPRefferenceCode;
    var Department = this.registerDetails.Department;
    var dueDate = this.registerDetails.dueDate;

    if (category == '' || category == undefined) {
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
      // return false;
    }

    if (MasterType == '' || MasterType == undefined) {
      this.toastr.warning('Warning!!!', 'MasterType is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (InstrumentCode == '' || InstrumentCode == undefined) {
      this.toastr.warning('Warning!!!', 'InstrumentCode is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (InstrumentName == '' || InstrumentName == undefined) {
      this.toastr.warning('Warning!!!', 'InstrumentName is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (make == '' || make == undefined) {
      this.toastr.warning('Warning!!!', 'make is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (range == '' || range == undefined) {
      this.toastr.warning('Warning!!!', 'range is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (masterspecification == '' || masterspecification == undefined) {
      this.toastr.warning('Warning!!!', 'masterspecification is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (CurrentLocation == '' || CurrentLocation == undefined) {
      this.toastr.warning('Warning!!!', 'CurrentLocation is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (date == undefined || date == undefined) {
      this.toastr.warning('Warning!!!', 'date is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    // if (MxLifeTime == '' || MxLifeTime == undefined) {
    //   this.toastr.warning('Warning!!!', 'MxLifeTime is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    if (MxLifeTimeNumber == '' || MxLifeTimeNumber == undefined) {
      this.toastr.warning('Warning!!!', 'MxLifeTimeNumber is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (Location == '' || Location == undefined) {
      this.toastr.warning('Warning!!!', 'Location is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    // if (file == '' || file == undefined) {
    //   this.toastr.warning('Warning!!!', 'file is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    // if (amccheckbox == undefined || amccheckbox == undefined) {
    //   this.toastr.warning('Warning!!!', 'amccheckbox is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    if (Description == '' || Description == undefined) {
      this.toastr.warning('Warning!!!', 'Description is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (Specification == '' || Specification == undefined) {
      this.toastr.warning('Warning!!!', 'Specification is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (Observation == '' || Observation == undefined) {
      this.toastr.warning('Warning!!!', 'Observation is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (Remark == '' || Remark == undefined) {
      this.toastr.warning('Warning!!!', 'Remark is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    // if (
    //   fileErrorDiscription == undefined ||
    //   fileErrorDiscription == undefined
    // ) {
    //   this.toastr.warning('Warning!!!', 'fileErrorDiscription is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    if (
      InstrumentRefferenceCode == '' ||
      InstrumentRefferenceCode == undefined
    ) {
      this.toastr.warning(
        'Warning!!!',
        'InstrumentRefferenceCode is required!',
        {
          timeOut: 3000,
        }
      );
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (SAPRefferenceCode == '' || SAPRefferenceCode == undefined) {
      this.toastr.warning('Warning!!!', 'SAPRefferenceCode required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (Department == '' || Department == undefined) {
      this.toastr.warning('Warning!!!', 'Departmentis required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (dueDate == undefined || dueDate == undefined) {
      this.toastr.warning('Warning!!!', 'dueDate is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }
    this.registerDetails.file = this.images;

    console.log('vvvv      ', this.images);

    // this.dataservice.fileupload(this.registerDetails).subscribe((data) => {
    //   console.log(data);
    //   // this.Location = data.data;
    // });

    // const imagedata = new FormData();
    // imagedata.append('image', this.images);
    // console.log('images', this.images[0], this.images[0].name);

    // this.registerDetails.headerImage = this.images[0].name;
    // console.log('imagedata', imagedata);

    // this.dataservice.MasterImage_postUser(imagedata).subscribe((data) => {
    //   console.log('data', data);
    //   console.log('working...');
    // });

    this.registerDetails.active = true;

    // console.log(this.registerDetails.headerImage);
    // console.log('store header image', this.registerDetails.headerImage);
    // let formData = new FormData();
    // // console.log(this.uploadedFiles.length);

    // for (var i = 0; i < this.uploadedFiles.length; i++) {
    //   formData.append(
    //     'uploads[]',
    //     this.uploadedFiles[i],
    //     this.uploadedFiles[i].name
    //   );
    // }

    // this.dataservice
    //   .MasterImage_postUser(formData)
    //   .subscribe((data: any) => {});

    this.dataservice.MasterTest_postUser(this.registerDetails).subscribe(
      (data) => {
        // console.log('post', data);
        //                  fgdfgdfg
        this.dataservice.MasterTest_getViewtablerecord1().subscribe((data) => {
          // console.log('view', data);

          this.collection = data.data;
          this.BackUpdata = data.data;
        });

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
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
          this.tabledata();
        } else {
          // console.log('error');
          // console.log('data.error', typeof data.error.errors);

          // console.log(data.error?.errors);
          // console.log(data.error?.errors[0].validatorKey);

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

  adderror() {
    var category = this.registerDetails.category;
    var type = this.registerDetails.type;
    var MasterType = this.registerDetails.MasterType;
    var InstrumentCode = this.registerDetails.InstrumentCode;
    var InstrumentName = this.registerDetails.InstrumentName;
    var make = this.registerDetails.make;
    var range = this.registerDetails.range;
    var masterspecification = this.registerDetails.masterspecification;
    var CurrentLocation = this.registerDetails.CurrentLocation;
    var date = this.registerDetails.date;
    // var MxLifeTime = this.registerDetails.MxLifeTime;
    var MxLifeTimeNumber = this.registerDetails.MxLifeTimeNumber;
    var Location = this.registerDetails.Location;
    // var file = this.registerDetails.file;
    var active = this.registerDetails.active;
    // var amccheckbox = this.registerDetails.amccheckbox;
    var Description = this.registerDetails.Description;
    var Specification = this.registerDetails.Specification;
    var Observation = this.registerDetails.Observation;
    var Remark = this.registerDetails.Remark;
    // var fileErrorDiscription = this.registerDetails.fileErrorDiscription;
    var InstrumentRefferenceCode =
      this.registerDetails.InstrumentRefferenceCode;
    var SAPRefferenceCode = this.registerDetails.SAPRefferenceCode;
    var Department = this.registerDetails.Department;
    var dueDate = this.registerDetails.dueDate;

    if (category == '' || category == undefined) {
      this.toastr.warning('Warning!!!', 'category is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (type == '' || type == undefined) {
      this.toastr.warning('Warning!!!', 'type  is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (MasterType == '' || MasterType == undefined) {
      this.toastr.warning('Warning!!!', 'MasterType is required!', {
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

    if (make == '' || make == undefined) {
      this.toastr.warning('Warning!!!', 'make is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (range == '' || range == undefined) {
      this.toastr.warning('Warning!!!', 'range is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (masterspecification == '' || masterspecification == undefined) {
      this.toastr.warning('Warning!!!', 'masterspecification is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (CurrentLocation == '' || CurrentLocation == undefined) {
      this.toastr.warning('Warning!!!', 'CurrentLocation is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (date == undefined || date == undefined) {
      this.toastr.warning('Warning!!!', 'date is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    // if (MxLifeTime == '' || MxLifeTime == undefined) {
    //   this.toastr.warning('Warning!!!', 'MxLifeTime is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    // if (MxLifeTimeNumber == '' || MxLifeTimeNumber == undefined) {
    //   this.toastr.warning('Warning!!!', 'MxLifeTimeNumber is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    if (Location == '' || Location == undefined) {
      this.toastr.warning('Warning!!!', 'Location is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    // if (file == undefined || file == undefined) {
    //   this.toastr.warning('Warning!!!', 'file is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    // if (amccheckbox == undefined || amccheckbox == undefined) {
    //   this.toastr.warning('Warning!!!', 'amccheckbox is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    if (Description == '' || Description == undefined) {
      this.toastr.warning('Warning!!!', 'Description is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Specification == '' || Specification == undefined) {
      this.toastr.warning('Warning!!!', 'Specification is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Observation == '' || Observation == undefined) {
      this.toastr.warning('Warning!!!', 'Observation is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Remark == '' || Remark == undefined) {
      this.toastr.warning('Warning!!!', 'Remark is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    // if (
    //   fileErrorDiscription == undefined ||
    //   fileErrorDiscription == undefined
    // ) {
    //   this.toastr.warning('Warning!!!', 'fileErrorDiscription is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    if (
      InstrumentRefferenceCode == '' ||
      InstrumentRefferenceCode == undefined
    ) {
      this.toastr.warning(
        'Warning!!!',
        'InstrumentRefferenceCode is required!',
        {
          timeOut: 3000,
        }
      );
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (SAPRefferenceCode == '' || SAPRefferenceCode == undefined) {
      this.toastr.warning('Warning!!!', 'SAPRefferenceCode required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (Department == '' || Department == undefined) {
      this.toastr.warning('Warning!!!', 'Departmentis required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (dueDate == undefined || dueDate == undefined) {
      this.toastr.warning('Warning!!!', 'dueDate is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    this.dataservice
      .MasterTest_postUser(this.registerDetails)
      .subscribe((data) => {
        // console.log('postuser', this.collection);

        this.collection = data.data;
        this.BackUpdata = data.data;
        this.test = true;
        (this.registerDetails.Description = ''),
          (this.registerDetails.Specification = ''),
          (this.registerDetails.Observation = ''),
          (this.registerDetails.Remark = ''),
          this.dataservice
            .MasterTest_getViewtablerecord1()
            .subscribe((data) => {
              // console.log('view', this.collection);

              this.collection = data.data;
              this.BackUpdata = data.data;
            });
      });
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

  // resetError() {
  //   (this.registerDetails.Description = ''),
  //     (this.registerDetails.Specification = ''),
  //     (this.registerDetails.Observation = ''),
  //     (this.registerDetails.Remark = ''),
  // }

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
    //debugger;

    let selectedLaw: any = event.target.value;
    // this.locationselect = selectedLaw;
    //console.log('00000000          ' + selectedLaw);
    var shortname = selectedLaw.split(',');
    // console.log('short', shortname);

    var instrument_code: any = this.InstrumentCodeof;
    // console.log(instrument_code);
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

    this.registerDetails.Department = selectedLaw[2];

    this.dataservice.departmentdata(shortname[0]).subscribe((data) => {
      // console.log(data.data[0].Department);
      this.registerDetails.Department = data.data[0].Department;
    });

    this.dataservice
      .MasterTest_getViewParticular_getView_sapref1(shortname[1])
      .subscribe((data) => {
        // console.log('tt',data.data);
        console.log(data.data);

        this.SAPRefferenceCode = data.data;
      });
  }

  public type(): void {
    this.dataservice.type_getView().subscribe((data) => {
      // console.log('fgh', data);

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
    let defaultDay = '1';
    let selected_value;
    console.log('select', selectedLaw);
    console.log('inside data');

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
      let weekValue = 3;
      //  console.log(weekValue);
      let send_date: any = new Date();
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
      let send_date: any = new Date();
      send_date.setDate(send_date.getDate() + weekValue);
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        //  console.log(setDate);
        this.registerDetails.dueDate = setDate;
      }
    }
    if (this.maximumTime == 'Day') {
      let weekValue = parseInt(selected_value) * 1;
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
      console.log('selects', selectedLaw);

      let weekValue = parseInt(selected_value) * 1;
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
      let weekValue = parseInt(selected_value) * 1;
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
  }

  onKeyDate(event: any) {
    let selectedLaw: any = event.target.value;
    var reg = new RegExp('^[0-9]');
    this.changedNumber = selectedLaw;

    if (selectedLaw === '') {
      let send_date: any = new Date();
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
        let send_date: any = new Date();
        send_date.setDate(send_date.getDate() + weekValue);
        if (send_date != 'Invalid Date') {
          let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
          this.registerDetails.dueDate = setDate;
        }
      }
      if (this.maximumTime == 'Day') {
        let weekValue = parseInt(selectedLaw) * 1;
        let send_date: any = new Date();
        send_date.setDate(send_date.getDate() + weekValue);
        if (send_date != 'Invalid Date') {
          let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
          this.registerDetails.dueDate = setDate;
        }
      }

      if (this.maximumTime == 'Month') {
        console.log('selects', selectedLaw);

        let weekValue = parseInt(selectedLaw) * 1;
        let send_date: any = new Date();
        send_date.setMonth(send_date.getMonth() + weekValue);
        if (send_date != 'Invalid Date') {
          let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
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
    console.log(typeof selectedvalue);

    var shortname = selectedvalue.split('||');

    this.valueof = selectedvalue;
    this.dataservice.typedetails(shortname[0]).subscribe((data) => {
      this.instrument = data.data;

      // this.BackUpdata = data.data;
    });
  }

  public Click_Head(index: number, heading: string): void {
    console.log(this.collection);

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
        console.log('collect', this.collection);

        this.collection = this.collection.filter(
          (f) => f.type == this.searchvalue
        );
      }
    }
  }

  // onFileChanged(event: any, row: number) {
  //   this.image = event.target.files[0];
  //   this.imageArray[row] = this.image;
  //   // this.imageArray[row] = ;
  //   // (<HTMLInputElement>document.getElementById('targetpath'+row)).value = this.image;
  // }

  // downloadMyFile(file: string) {
  //   const link = document.createElement('a');
  //   link.setAttribute('target', '_blank');
  //   link.setAttribute('href', `${environment.filesURL}/${file}`);
  //   // link.setAttribute('download', `products.csv`);
  //   document.body.appendChild(link);
  //   link.click();
  //   link.remove();
  // }

  // getfile(){
  //   this.dataservice.getViewdownload().subscribe(data=>{
  //   let downloadURL = window.URL.createObjectURL(data);
  //   saveAs(downloadURL);
  //   })
  // }

  // private baseUrl = 'http://localhost:4200';
  // // constructor(private http: HttpClient) { }
  // upload(file: File): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);
  //   const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
  //     reportProgress: true,
  //     responseType: 'json',
  //   });
  //   return this.http.request(req);
  // }
  // getFiles(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/files`);
  // }

  // selectFile(event: any): void {
  //   this.selectedFiles = event.target.files;
  // }

  // AddRow() {
  //   alert();
  // }

  AddRow() {
    // this.dataservice = {};
    this.collectiondata.push(this.newDynamic);
    this.toastr.success('New row added successfully', 'New Row');
    // console.log(this.dynamicArray);
    return true;
  }

  checkedAmc(event: any) {
    this.AmcChecked = event.target.checked;
  }

  delete() {
    this.collectiondata.pop();
    this.toastr.success('New row deleted successfully');
  }

  // selectimage(event: any) {
  //   // debugger;
  //   if (event.target.files.length > 0) {
  //     const files = event.target.files[0];
  //     this.images = files;
  //   }
  // }

  //   fileChange($event) {
  //     this.uploadedFiles = element.target.files;
  // }

  upload() {
    let formData = new FormData();
    // FormData.append('file',this.images);
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append(
        'uploads[]',
        this.uploadedFiles[i],
        this.uploadedFiles[i].name
      );
    }
    this.http.post('/api/upload', formData).subscribe((response) => {
      console.log('response received is ', response);
    });
  }

  // onsubmit(){
  //   const formData = new FormData();
  //   FormData.append('file',this.images);

  //   this.http.post<any>( 'http://localhost:3000/api/file', FormData).subscribe
  //   (res) => console.log(res),

  //   (err) => console.log(res),

  // }

  onSelectFile(event: any) {
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (file.type.indexOf('image') > -1) {
            this.mydata.push({
              url: e.target.result,
              type: 'img',
            });
          } else if (file.type.indexOf('video') > -1) {
            this.mydata.push({
              url: e.target.result,
              type: 'video',
            });
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // public dropped(files: NgxFileDropEntry[]) {
  //   this.files = files;
  //   for (const droppedFile of files) {
  //     // Is it a file?
  //     if (droppedFile.fileEntry.isFile) {
  //       const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
  //       fileEntry.file((file: File) => {
  //         // Here you can access the real file
  //         console.log(droppedFile.relativePath, file);
  //         this.viewDoc.push(file);
  //         console.log(this.viewDoc);
  //         this.fileUploadChangeEmitter.emit(file);
  //         this.imagePreviewUrl = '';
  //         this.file = file;
  //       });
  //     } else {
  //       // It was a directory (empty directories are added, otherwise only files)
  //       const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
  //       console.log(droppedFile.relativePath, fileEntry);
  //     }
  //   }
  // }

  public removeUploadedFile(): void {
    this.file = '';
    this.fileUploadChangeEmitter.emit('');
  }

  public viewImage(content: any): void {
    console.log('inside view image');

    console.log('image', this.imagePreviewUrl);
    if (this.imagePreviewUrl) {
      // this.dataservice.setImageViewPopupTrigger(this.imagePreviewUrl);
      this.modalService.open('view-image-modal');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result as string;
      // this.dataservice.setImageViewPopupTrigger(this.imagePreviewUrl);
      // this.modalService.open('view-image-modal');
      this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(
          (result: any) => {
            this.closeResult = `Closed with: ${result}`;
          },
          (reason: any) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
    };
    // console.log('file', this.file);

    reader.readAsDataURL(this.file);
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === 'Cross click') {
      return 'Cross Click';
    } else {
      return `with: ${reason}`;
    }
  }

  // onFileChange(event: any) {
  //   const reader = new FileReader();

  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       this.imageSrc = reader.result as string;
  //       this.registerDetails.headerImage = this.imageSrc;
  //     };
  //   }
  // }
  getFileDetails(e: any) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
    console.log('myfiles', this.myFiles);
  }

  submit() {
    const frmData = new FormData();

    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append('fileUpload', this.myFiles[i]);
      // console.log('myfile', this.myFiles[i]);
    }
    // console.log('form data', frmData.getAll('fileUpload'));
    let imageData = frmData.getAll('fileUpload');
    // console.log('image data', imageData);
    imageData.map((item: any) => {
      this.dataservice.MasterImage_postUser(item).subscribe((data: any) => {});
    });
  }
}
