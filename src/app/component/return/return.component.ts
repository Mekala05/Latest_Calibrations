import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
// import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { returncomponent } from './model';
import { ReturnList } from 'src/app/return-list/model';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.scss'],
})
export class ReturnComponent implements OnInit {
  public collection: any[] = [];
  public searchvalue: any;
  public HighlightRow: any;
  public registerDetails: returncomponent = {};
  public HighlightHead: any = 1;
  public SearchField: string = '';
  public BackUpdata = [] as any;
  public user_name: any = [];
  public InstrumentNameof: any = [];
  public InstrumentCodeof: any = [];
  public sub: any;
  public userId: any;
  public timeout: any = null;
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
      name: 'ReturnDate',
    },
    {
      name: 'ReturnNo',
    },
    {
      name: 'ReturnReason',
    },
    {
      name: 'ReturnLoginEmployeeDetails',
    },

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
    private router: Router,
    private routers: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    if (this.routers.snapshot.queryParams.id) {
      console.log(this.routers.snapshot.queryParams.id);
      // public getuserData(id: string): void {
      // console.log(id);
      this.dataservice
        .IssueReturn_getViewData(this.routers.snapshot.queryParams.id)
        .subscribe(
          (data: any) => {
            // this.tabledata();
            console.log(data);
            this.registerDetails.InstrumentName = data.data[0].InstrumentName;
            this.registerDetails.InstrumentCode = data.data[0].InstrumentCode;
            let issudate = this.datePipe.transform(
              data.data[0].IssueDate,
              'dd-mmm-yyyy'
            );
            if (issudate) {
              this.registerDetails.IssueDate = issudate;
            }
            this.registerDetails.IssueNo = data.data[0].IssueNo;
            this.registerDetails.MachineCode = data.data[0].MachineCode;
            this.registerDetails.Location = data.data[0].Location;
            this.user_name = localStorage.getItem('Login_name');
            console.log(this.user_name);

            this.registerDetails.ReturnLoginEmployeeDetails = this.user_name;
          },
          (err) => console.log('its error')
        );
      // }
    }
    // this.routers.queryParams.subscribe(test => {
    //   this.userId = test
    // });
  }

  ngOnInit(): void {
    let useraccess = JSON.parse(localStorage.getItem('userAccess') || '[]');    
    let datas = useraccess.filter((element: any) => element.moduleid === 15);    
    this.editAccess = datas[0].Edit;
    // this.editAccess = true;

    this.tabledata();
    this.registerDetails.ReturnDate = new Date();
    this.registerDetails.ReturnDate = new Date();

    this.dataservice.Return_getViewParticular().subscribe((data) => {
      // console.log(data.data[0].id);
      let limitId = parseInt(data.data[0].id);
      let ReturnNo = 'Br-No_' + (limitId + 1);
      this.registerDetails.ReturnNo = ReturnNo;
    });
  }

  private tabledata(): void {
    this.dataservice.Return_getView().subscribe((data) => {
      this.collection = data.data;
      this.BackUpdata = data.data;
    });
  }

  update() {
    if (
      this.registerDetails.ReturnDate === undefined ||
      this.registerDetails.ReturnNo === undefined ||
      this.registerDetails.ReturnReason === '' ||
      this.registerDetails.ReturnLoginEmployeeDetails === '' ||
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
        .Return_updateSingleUser(this.registerDetails.id, this.registerDetails)
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
    this.dataservice.Return_DeleteSingleUser(id, this.collection).subscribe(
      (data: any) => {
        this.tabledata();
      },
      (err) => console.log('its error')
    );
  }
  public store(): void {
    if (
      this.registerDetails.ReturnDate === undefined ||
      this.registerDetails.ReturnNo === undefined ||
      this.registerDetails.ReturnReason === undefined ||
      this.registerDetails.ReturnLoginEmployeeDetails === undefined ||
      this.registerDetails.IssueDate === undefined ||
      this.registerDetails.IssueNo === undefined ||
      this.registerDetails.InstrumentCode === undefined ||
      this.registerDetails.InstrumentName === undefined ||
      this.registerDetails.MachineCode === undefined ||
      this.registerDetails.Location === undefined
    ) {
      alert('Enter the Details');
    } else {
      this.dataservice.Return_postUser(this.registerDetails).subscribe(
        (data) => {
          // alert("Added");
          // console.log("Inserted"+data);
          if (data.data) {
            this.toastr.success('Created!!!', 'Return Created Successfully.', {
              timeOut: 3000,
            });
            let currentUrl = this.router.url;
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([currentUrl]);
            this.tabledata();
          } else {
            if (data.error.errors[0].validatorKey) {
              this.toastr.error('Error!!!', 'Return Already Exists.', {
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
    if (heading == 'InstrumentName') {
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
      if (this.SearchField == 'InstrumentName') {
        this.collection = this.collection.filter(
          (f) => f.type == this.searchvalue
        );
      }
    }
  }

  reset() {
    this.registerDetails.ReturnDate = new Date();
    this.registerDetails.ReturnNo = '';
    this.registerDetails.ReturnReason = '';
    this.registerDetails.ReturnLoginEmployeeDetails = '';
    this.registerDetails.IssueDate = '';
    this.registerDetails.IssueNo = '';
    this.registerDetails.InstrumentCode = '';
    this.registerDetails.InstrumentName = '';
    this.registerDetails.MachineCode = '';
    this.registerDetails.Location = '';
  }
}
