import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { Request_Cali } from './model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calibartion-request-type',
  templateUrl: './calibartion-request-type.component.html',
  styleUrls: ['./calibartion-request-type.component.scss'],
})
export class CalibartionRequestTypeComponent implements OnInit {
  public collection: any[] = [];
  public searchvalue: any;
  public HighlightRow: any;
  public HighlightHead: any = 1;
  public SearchField: string = 'CalibrationRequest';
  public BackUpdata = [] as any;
  public timeout: any = null;
  public registerDetails: Request_Cali = {};
  showButton: boolean = false;
  public user_name: any = [];
  public editAccess: boolean = false;

  public TableHeading = [
    {
      name: 'SI No',
    },
    {
      name: 'RequestType',
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
    private router: Router
  ) {}

  ngOnInit(): void {
    let useraccess = JSON.parse(localStorage.getItem('userAccess') || '[]');
    let datas = useraccess.filter((element: any) => element.moduleid === 8);
    this.editAccess = datas[0].Edit;
    this.tabledata();
    this.user_name = localStorage.getItem('Login_name');
  }
  // Get All Data
  public tabledata(): void {
    this.dataservice.MasterCali_Request_getView().subscribe((data) => {
      // console.log(data.data);
      this.collection = data.data;
      this.BackUpdata = data.data;
    });
  }
  // Delete the Particular Data
  public deleteUsers(id: string): void {
    // console.log(id);
    this.dataservice
      .MasterCali_Request_DeleteSingleUser(id, this.collection)
      .subscribe(
        (data: any) => {
          this.tabledata();
        },
        (err) => console.log('its error')
      );
  }
  // Insert the New Data
  public store(): void {
    // if (
    //   this.registerDetails.CalibrationRequest === undefined ||
    //   this.registerDetails.CalibrationRequest === ''
    // ) {
    //   alert('Enter the Details');
    // } else {
    //   this.dataservice
    //     .MasterCali_Request_postUser(this.registerDetails)
    //     .subscribe(
    //       (data) => {
    //         // alert("Added");
    //         if (data.data) {
    //           this.toastr.success(
    //             'Created!!!',
    //             'RequestType Created Successfully.',
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
    //             this.toastr.error('Error!!!', 'RequestType Already Exists.', {
    //               timeOut: 3000,
    //             });
    //           }
    //         }
    //         // console.log(data.error.errors[0].validatorKey);
    //       },
    //       (err) => console.log('its error')
    //     );
    // }

    var CalibrationRequest = this.registerDetails.CalibrationRequest;

    if (CalibrationRequest == '' || CalibrationRequest == undefined) {
      this.toastr.warning('Warning!!!', ' CalibrationRequest is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    this.dataservice
      .MasterCali_Request_postUser(this.registerDetails)
      .subscribe((data) => {
        this.collection = data.data;

        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        this.tabledata();

        // this.dataservice.MasterTest_getViewtablerecord1().subscribe((data) => {
        //   this.BackUpdata = data.data;
        // });
      });
  }
  // Update the Exist Data
  update() {
    if (
      this.registerDetails.CalibrationRequest === '' ||
      this.registerDetails.CalibrationRequest === undefined
    ) {
      alert('Enter the Details');
    } else {
      this.dataservice
        .MasterCali_Request_updateSingleUser(
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
                'RequestType Updated Successfully.',
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
                this.toastr.error('Error!!!', 'RequestType Already Exists.', {
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

  public Click_Head(index: number, heading: string): void {
    this.collection = [...this.BackUpdata];
    if (heading == 'CalibrationRequest') {
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
      if (this.SearchField == 'CalibrationRequest') {
        this.collection = this.collection.filter(
          (f) => f.type == this.searchvalue
        );
      }
    }
  }

  reset() {
    this.registerDetails.CalibrationRequest = '';
  }
}
