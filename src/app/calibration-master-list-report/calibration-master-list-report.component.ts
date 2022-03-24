import { Component } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { calibrationlistReport } from './model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
type NewType = any[];
@Component({
  selector: 'app-calibration-master-list-report',
  templateUrl: './calibration-master-list-report.component.html',
  styleUrls: ['./calibration-master-list-report.component.scss'],
})
export class CalibrationMasterListReportComponent implements OnInit {
  public title: any = 'Angular Search Using ng2-search-filter';
  public collection: NewType = [];
  public searchvalue: any;
  public HighlightRow: any;
  public registerDetails: calibrationlistReport = {};
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

  dataSource = new MatTableDataSource<calibrationlistReport>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | any;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    this.tabledata();
    // debugger;
  }

  ngOnInit(): void {
    this.user_name = localStorage.getItem('Login_name');
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
      console.log('sdfasdf', data.data);

      this.collection = data.data;
      this.BackUpdata = data.data;
      // console.log(this.collection);
      this.dataSource = new MatTableDataSource<calibrationlistReport>(
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
    alert(id);
    this.router.navigate([`header/CalibrationReport`], {
      queryParams: { id: id },
    });
  }

  newbuttonclick() {
    // alert();
    this.router.navigate([`header/CalibrationReport`]);
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
        .ScrapApprovalList_postUser(this.registerDetails)
        .subscribe(
          (data) => {
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
          (err) => console.log('its error')
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

  reset(): void {
    this.registerDetails.InstrumentCode = '';
    this.registerDetails.InstrumentName = '';
    this.registerDetails.Location = '';
    this.registerDetails.Department = '';
  }

  onKeyIns(x: any) {
    this.dataservice
      .calibrationmasterlist_postUser(this.registerDetails)
      .subscribe((data) => {
        console.log(data.data[0]);
        this.registerDetails.InstrumentName = data.data[0].InstrumentName;
        this.registerDetails.Location = data.data[0].Location;
        this.registerDetails.Department = data.data[0].Department;
      });
  }
}
