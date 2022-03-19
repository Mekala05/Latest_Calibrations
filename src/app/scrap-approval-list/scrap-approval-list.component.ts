import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ScrapApprovalList } from './model';

@Component({
  selector: 'app-scrap-approval-list',
  templateUrl: './scrap-approval-list.component.html',
  styleUrls: ['./scrap-approval-list.component.scss'],
})
export class ScrapApprovalListComponent implements OnInit {
  public collection: any[] = [];
  public searchvalue: any;
  public HighlightRow: any;
  public registerDetails: ScrapApprovalList = {};
  public HighlightHead: any = 1;
  public SearchField: string = 'Type';
  public BackUpdata = [] as any;
  public user_name: any = [];
  public InstrumentNameof: any = [];
  public InstrumentCodeof: any = [];
  public text: any = [];
  public BreakageDetails: any = [];
  public timeout: any = null;
  public TableHeading = [
    {
      name: 'Scrap Code',
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
      name: 'Action',
    },
  ];

  constructor(
    private dataservice: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tabledata();
    this.registerDetails.Date = new Date();
    // this.registerDetails.Quantity='1';
    this.user_name = localStorage.getItem('Login_name');
    // this.dataservice.Entry_getView().subscribe((data: any) => {
    //   // console.log('data', data.data);
    //   data.data.map((item: any) => {
    //     if (item.status && item.option) {
    //       console.log('status - ', item.status, 'option -', item.option);

    //       if (item.status === 'Reject' && item.option === 'Scrap') {
    //         this.collection.push(item);
    //       }
    //     }
    //   });
    // });
  }

  private tabledata(): void {
    this.dataservice.Entry_getView().subscribe((data: any) => {
      // console.log('data', data.data);
      data.data.map((item: any) => {
        if (item.status && item.option) {
          // console.log('active', item);
          // console.log('status - ', item.status, 'option -', item.option);
          if (item.status === 'Reject' && item.option === 'Scrap') {
            this.collection.push(item);
            // console.log(item);
          }
        }
      });
    });

    this.dataservice.MasterTest_getView().subscribe((data) => {
      // console.log(data.data[0].type)
      this.InstrumentNameof = data.data;
      // this.BackUpdata = data.data;
    });
    this.dataservice.MasterTest_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.InstrumentCodeof = data.data;
      // this.BackUpdata = data.data;
    });
  }

  onKeyIns(x: any) {
    this.dataservice
      .BreakageListDetails_postUser(
        this.registerDetails.InstrumentCode,
        this.collection
      )
      .subscribe((data) => {
        console.log(data.data[0]);
        this.registerDetails.InstrumentName = data.data[0].InstrumentName;
        this.registerDetails.Date = data.data[0].Date;
        this.registerDetails.DocumentNo = data.data[0].DocumentNo;
        this.registerDetails.InstrumentCode = data.data[0].InstrumentCode;
      });
  }
  getUser(id: any) {
    // debugger;
    alert(id);
    this.router.navigate([`header/ScrapApproval`], {
      queryParams: { id: id },
    });
  }

  update() {
    if (
      this.registerDetails.Date === undefined ||
      this.registerDetails.DocumentNo === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === ''
    ) {
      alert('Enter the Details');
    } else {
      // this.submitted = true;
      this.dataservice
        .ScrapApprovalList_updateSingleUser(
          this.registerDetails.data,
          this.registerDetails
        )
        .subscribe(
          (data) => {
            // alert("Update");
            // console.log(data);
            if (data.data) {
              this.toastr.success(
                'Updated!!!',
                'ScrapApprovalList Updated Successfully.',
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
                  'ScrapApprovalList Already Exists.',
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
  getUser2(id: object) {
    this.registerDetails = { ...id };
  }
  public deleteUsers(id: string): void {
    console.log(id);
    this.dataservice
      .ScrapApprovalList_DeleteSingleUser(id, this.collection)
      .subscribe(
        (data: any) => {
          this.tabledata();
        },
        (err) => console.log('its error')
      );
  }
  public store(): void {
    if (
      this.registerDetails.Date === undefined ||
      this.registerDetails.DocumentNo === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === ''
    ) {
      alert('Enter the Details');
    } else {
      this.dataservice
        .ScrapApprovalList_postUser(this.registerDetails)
        .subscribe(
          (data) => {
            // alert("Added");
            // console.log("Inserted"+data);
            if (data.data) {
              this.toastr.success(
                'Created!!!',
                'ScrapApprovalList  Created Successfully.',
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
                  'ScrapApprovalList Already Exists.',
                  {
                    timeOut: 3000,
                  }
                );
              }
            }
          },
          (err) => console.log('its error')
        );
    }
  }
  // public reloadpage(){
  //   window.location.reload('');
  // }
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
    this.registerDetails.Date = new Date();
    this.registerDetails.DocumentNo = '';
    this.registerDetails.InstrumentCode = '';
    this.registerDetails.InstrumentName = '';
  }
}
