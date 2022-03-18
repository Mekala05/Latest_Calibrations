import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BreakageListDetails } from './model';
// import { DataTableDirective } from 'angular-datatables';
// import { Subject } from 'rxjs/internal/Subject';
// import * as moment from 'moment';

@Component({
  selector: 'app-breakage-list-details',
  templateUrl: './breakage-list-details.component.html',
  styleUrls: ['./breakage-list-details.component.scss'],
})
export class BreakageListDetailsComponent implements OnInit {
  // @ViewChild(DataTableDirective, { static: false })
  // dtElement!: DataTableDirective;

  // dtOptions: any = {
  //   searching: true,
  //   paging: true,
  //   info: true,
  //   ordering: true,
  //   responsive: true,
  //   columns: [
  //     {
  //       title: 'DocumentNo',
  //       data: 'BreakageNo',
  //     },
  //     // {
  //     //   title: 'Date',
  //     //   render: function (data: any, type: any, row: any, meta: any) {
  //     //     return moment(new Date(row.Date)).format('DD/MM/YYYY');
  //     //   },
  //     // },
  //     {
  //       title: 'InstrumentCode',
  //       defaultContent: ' - ',
  //       data: 'InstrumentCode',
  //     },
  //     {
  //       title: 'InstrumentName',
  //       defaultContent: ' - ',
  //       data: 'InstrumentName',
  //     },
  //     {
  //       title: 'Action',
  //       render: function (data: any, type: any, full: any) {
  //         return '<button class="btn btn-dark my-1">View</button>';
  //       },
  //     },
  //   ],
  //   rowCallback: (row: Node, data: any[] | Object, index: number) => {
  //     // Unbind first in order to avoid any duplicate handler
  //     // (see https://github.com/l-lin/angular-datatables/issues/87)
  //     $('td', row).off('click');
  //     $('td', row).on('click', () => {
  //       this.getUser(data);
  //     });
  //     return row;
  //   },
  // };
  // dtTrigger: Subject<any> = new Subject<any>();
  // collection = [];
  public collection: any[] = [];
  public searchvalue: any;
  public HighlightRow: any;
  public registerDetails: BreakageListDetails = {};
  public HighlightHead: any = 1;
  public SearchField: string = 'Type';
  public BackUpdata = [] as any;
  public user_name: any = [];
  public InstrumentNameof: any = [];
  public InstrumentCodeof: any = [];
  public text: any = [];
  public BreakageDetails: any = [];
  public timeout: any = null;

  constructor(
    private dataservice: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   searching: true,
    //   processing: true,
    // };

    this.tabledata();

    // this.dataservice.BreakageRequest_getView1().subscribe((data) => {
    //   this.collection = data.data;
    //   this.BackUpdata = data.data;
    //   this.dtOptions.data = this.collection;
    //   this.dtTrigger.next();
    // });
    // this.tabledata();
    this.registerDetails.Date = new Date();
    // this.registerDetails.Quantity='1';
    this.user_name = localStorage.getItem('Login_name');
  }

  private tabledata(): void {
    this.dataservice.BreakageRequest_getView1().subscribe((data) => {
      this.collection = data.data;
      this.BackUpdata = data.data;
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

  setFilteredItems(eve: any) {
    const eventVal = eve.target.value;
    if (eventVal && eventVal.trim() !== '') {
      this.collection = this.BackUpdata.filter(
        (item: any) =>
          item.BreakageNo.toLowerCase().indexOf(eventVal.toLowerCase()) > -1 ||
          item.InstrumentCode.toLowerCase().indexOf(eventVal.toLowerCase()) >
            -1 ||
          item.InstrumentName.toLowerCase().indexOf(eventVal.toLowerCase()) >
            -1 ||
          item.date.toLowerCase().indexOf(eventVal.toLowerCase()) > -1
      );
    } else {
      this.collection = this.BackUpdata;
    }
  }

  // rerender() {
  //   console.log('inside rerender');
  //   console.log('dt', this.dtElement);

  //   if (this.dtElement) {
  //     console.log('inside dtelement');
  //     console.log(this.dtElement.dtInstance);

  //     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //       dtInstance.destroy(); // Destroy the table first
  //       console.log('rerender', this.collection);
  //       this.dataservice.BreakageRequest_getView1().subscribe((data) => {
  //         this.collection = data.data;
  //         this.BackUpdata = data.data;
  //         console.log(this.collection);

  //         this.dtOptions.data = this.collection;
  //       });
  // this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //   console.log('inside instance');

  //   dtInstance.destroy(); // Destroy the table first
  //   console.log('rerender', this.collection);
  //   this.dataservice.BreakageRequest_getView1().subscribe((data) => {
  //     this.collection = data.data;
  //     this.BackUpdata = data.data;
  //     console.log(this.collection);

  //     this.dtOptions.data = this.collection;
  //     // this.dtTrigger.next();
  //   });

  // this.dtOptions.data = this.collection;
  // this.dtTrigger.next(); // Call the dtTrigger to rerender again
  //     });
  //   }
  // }

  // ngAfterViewInit(): void {
  //   this.dtTrigger.next();
  // }

  // ngOnDestroy(): void {
  //   // Do not forget to unsubscribe the event
  //   this.dtTrigger.unsubscribe();
  // }

  // onKeyIns(x: any) {
  //   this.dataservice
  //     .BreakageListDetails_postUser(
  //       this.registerDetails.InstrumentCode,
  //       this.collection
  //     )
  //     .subscribe((data) => {
  //       console.log(data.data[0]);
  //       this.registerDetails.InstrumentName = data.data[0].InstrumentName;
  //       this.registerDetails.Date = data.data[0].Date;
  //       this.registerDetails.DocumentNo = data.data[0].DocumentNo;
  //       this.registerDetails.InstrumentCode = data.data[0].InstrumentCode;
  //     });
  // }
  getUser(data: any) {
    // debugger;
    // alert(id);
    // console.log('query data', data);

    this.router.navigate([`header/BreakageDetails`], {
      queryParams: { id: data },
    });
  }

  // update() {
  //   if (
  //     this.registerDetails.Date === undefined ||
  //     this.registerDetails.DocumentNo === '' ||
  //     this.registerDetails.InstrumentCode === '' ||
  //     this.registerDetails.InstrumentName === ''
  //   ) {
  //     alert('Enter the Details');
  //   } else {
  //     // this.submitted = true;
  //     this.dataservice
  //       .BreakageRequest_updateSingleUser(
  //         this.registerDetails.data,
  //         this.registerDetails
  //       )
  //       .subscribe(
  //         (data) => {
  //           // alert("Update");
  //           // console.log(data);
  //           if (data.data) {
  //             this.toastr.success(
  //               'Updated!!!',
  //               'BreakageList Updated Successfully.',
  //               {
  //                 timeOut: 3000,
  //               }
  //             );
  //             let currentUrl = this.router.url;
  //             this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //             this.router.onSameUrlNavigation = 'reload';
  //             this.router.navigate([currentUrl]);
  //             this.tabledata();
  //           } else {
  //             if (data.error.errors[0].validatorKey) {
  //               this.toastr.error('Error!!!', 'BreakageList Already Exists.', {
  //                 timeOut: 3000,
  //               });
  //             }
  //           }
  //         },
  //         (err) => console.log(err)
  //       );
  //   }
  // }
  // getUser2(id: object) {
  //   this.registerDetails = { ...id };
  // }

  // public deleteUsers(id: string): void {
  //   console.log(id);
  //   this.dataservice
  //     .BreakageRequest_DeleteSingleUser(id, this.collection)
  //     .subscribe(
  //       (data: any) => {
  //         this.tabledata();
  //       },
  //       (err) => console.log('its error')
  //     );
  // }
  // public store(): void {
  //   if (
  //     this.registerDetails.Date === undefined ||
  //     this.registerDetails.DocumentNo === '' ||
  //     this.registerDetails.InstrumentCode === '' ||
  //     this.registerDetails.InstrumentName === ''
  //   ) {
  //     alert('Enter the Details');
  //   } else {
  //     this.dataservice.BreakageRequest_postUser(this.registerDetails).subscribe(
  //       (data) => {
  //         // alert("Added");
  //         // console.log("Inserted"+data);
  //         if (data.data) {
  //           this.toastr.success(
  //             'Created!!!',
  //             'BreakageRequest Created Successfully.',
  //             {
  //               timeOut: 3000,
  //             }
  //           );
  //           let currentUrl = this.router.url;
  //           this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //           this.router.onSameUrlNavigation = 'reload';
  //           this.router.navigate([currentUrl]);
  //           this.tabledata();
  //         } else {
  //           if (data.error.errors[0].validatorKey) {
  //             this.toastr.error('Error!!!', 'BreakageRequest Already Exists.', {
  //               timeOut: 3000,
  //             });
  //           }
  //         }
  //       },
  //       (err) => console.log('its error')
  //     );
  //   }
  // }
  // public reloadpage(){
  //   window.location.reload('');
  // }
  // public Click_Head(index: number, heading: string): void {
  //   this.collection = [...this.BackUpdata];
  //   if (heading == 'Type' || heading == 'Create On') {
  //     this.SearchField = heading;
  //     this.HighlightHead = index;
  //     this.searchvalue = '';
  //   } else {
  //     // this.toastr.info(`Search Field Invalid`);
  //   }
  // }
  // public Empty(): void {
  //   if (!this.searchvalue) {
  //     this.collection = [...this.BackUpdata];
  //   }
  // }
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
  //     if (this.SearchField == 'Type') {
  //       this.collection = this.collection.filter(
  //         (f) => f.type == this.searchvalue
  //       );
  //     } else if (this.SearchField == 'Date') {
  //       this.collection = this.collection.filter(
  //         (f) => f.type == this.searchvalue
  //       );
  //     }
  //   }
  // }
  // reset() {
  //   this.registerDetails.Date = new Date();
  //   this.registerDetails.DocumentNo = '';
  //   this.registerDetails.InstrumentCode = '';
  //   this.registerDetails.InstrumentName = '';
  // }
}
