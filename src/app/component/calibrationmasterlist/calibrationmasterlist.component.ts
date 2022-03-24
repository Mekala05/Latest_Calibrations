import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { calibrationmasterlist } from './model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';

type NewType = any[];

@Component({
  selector: 'app-calibrationmasterlist',
  templateUrl: './calibrationmasterlist.component.html',
  styleUrls: ['./calibrationmasterlist.component.scss'],
})
export class CalibrationmasterlistComponent implements OnInit, AfterViewInit {
  public title: any = 'Angular Search Using ng2-search-filter';
  public collection: NewType = [];
  public searchvalue: any;
  // public collection: any = [];

  public HighlightRow: any;
  public registerDetails: calibrationmasterlist = {};
  public HighlightHead: any = 1;
  public SearchField: string = '';
  public BackUpdata = [] as any;
  // public displayedColumns: any;
  public user_name: any = [];
  public InstrumentNameof: any = [];
  InstrumentCode: any = [];
  public text: any = [];
  searchText: any;
  public BreakageDetails: any = [];
  // public dataSource: any;
  public timeout: any = null;
  public TableHeading = [
    {
      name: 'InstrumentCode',
    },
    {
      name: 'InstrumentName',
    },
    {
      name: 'Location',
    },
    {
      name: 'Department',
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
  displayedColumns: string[] = [
    'InstrumentCode',
    'InstrumentName',
    'Location',
    'Department',
    'actions',
  ];
  dataSource = new MatTableDataSource<calibrationmasterlist>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.tabledata();
  }

  ngOnInit(): void {
    this.user_name = localStorage.getItem('Login_name');
    this.tabledata();
    // this.calibrationlistdata();
  }
  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  private tabledata(): void {
    this.dataservice.calibrationmasterlist_getView().subscribe((data) => {
      // let item: any = [];
      // data.data.map((items: any) => {
      //   if (items.active === true) {
      //     console.log(items);

      //     item.push(items);
      //   }
      // });

      this.collection = data.data;
      this.BackUpdata = data.data;
      // console.log(this.collection);
      this.dataSource = new MatTableDataSource<calibrationmasterlist>(
        data.data
      );
      // console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    });
  }

  calibrationlistdata(): void {
    this.dataservice.calibrationmasterlist_getView().subscribe((data) => {
      // debugger;
    });
  }

  getUsers(id: any): void {
    // debugger;
    this.router.navigate([`header/Calibration`], { queryParams: { id: id } });
  }

  newbutton() {
    // alert();
    this.router.navigate([`header/Calibration`]);
  }

  update() {
    if (
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === ''
    ) {
      alert('Enter the Details');
    } else {
      // this.submitted = true;
      this.dataservice
        .ScrapApprovalList_updateSingleUser(
          this.registerDetails,
          this.registerDetails
        )
        .subscribe(
          (data) => {
            // alert("Update");
            // console.log(data);
            if (data.data) {
              this.toastr.success(
                'Updated!!!',
                'calibrationmasterlist Updated Successfully.',
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
                  'calibrationmasterlist Already Exists.',
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
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.Location === '' ||
      this.registerDetails.Department === ''
    ) {
      alert('Enter the Details');
    } else {
      this.dataservice
        .calibrationmasterlist_postUser(this.registerDetails)
        .subscribe(
          (data: any) => {
            // alert("Added");
            // console.log("Inserted"+data);
            if (data.data) {
              this.toastr.success(
                'Created!!!',
                'calibrationmasterlist  Created Successfully.',
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
                  'calibrationmasterlist Already Exists.',
                  {
                    timeOut: 3000,
                  }
                );
              }
            }
          },
          (err: any) => console.log('its error')
        );
    }
  }
  public Click_Head(index: number, heading: string): void {
    this.collection = [...this.BackUpdata];
    if (
      heading == 'InstrumentCode' ||
      heading == 'InstrumentName' ||
      heading == 'Location' ||
      heading == 'Department'
    ) {
      this.SearchField = heading;
      this.HighlightHead = index;
      this.searchvalue = '';
    } else {
    }
  }
  public Empty(): void {
    if (!this.searchvalue) {
      this.collection = [...this.BackUpdata];
    }
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
  //   if (this.searchvalue) {
  //     if (this.SearchField == 'InstrumentCode') {
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
  // public Click_Head(index: number, heading: string): void {
  //   this.collection = [...this.BackUpdata];
  //   if (heading == 'location') {
  //     this.SearchField = heading;
  //     this.HighlightHead = index;
  //   } else {
  //     // this.toastr.info(`Search Field Invalid`);
  //   }
  // }
  // public Empty(): void {}
  // public onKeySearch(event: any) {}
  reset(): void {
    this.registerDetails.InstrumentCode = '';
    this.registerDetails.InstrumentName = '';
    this.registerDetails.Location = '';
    this.registerDetails.Department = '';
  }

  onKeyIns(x: any) {
    this.dataservice
      .calibrationmasterlist_postUser(this.registerDetails)
      .subscribe((data: any) => {
        console.log(data.data[0]);
        this.registerDetails.InstrumentName = data.data[0].InstrumentName;
        this.registerDetails.Location = data.data[0].Location;
        this.registerDetails.Department = data.data[0].Department;
      });
  }
}
