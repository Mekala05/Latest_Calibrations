import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { MakeMaster } from './model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-makemaster',
  templateUrl: './makemaster.component.html',
  styleUrls: ['./makemaster.component.scss'],
})
export class MakemasterComponent implements OnInit {
  public collection: any[] = [];
  public searchvalue: any;
  public HighlightRow: any;
  public HighlightHead: any = 1;
  public SearchField: string = 'Description';
  public BackUpdata = [] as any;
  public timeout: any = null;
  CalibrationNew = null;
  public registerDetails: MakeMaster = {};
  public user_name: any = [];
  public editAccess: boolean = false;
  public TableHeading = [
    {
      name: 'SI No',
    },
    {
      name: 'Description',
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
    // let useraccess = JSON.parse(localStorage.getItem('userAccess') || '[]');
    // let datas = useraccess.filter((element: any) => element.moduleid === 4);
    // this.editAccess = datas[0].Edit;
    this.editAccess = true;

    // useraccess.map((element: any) => {
    //   if (element.moduleid === 4) {
    //     if (element.Edit) {
    //       this.editAccess = element.Edit;
    //     }
    //   }
    // });
    this.tabledata();
    this.user_name = localStorage.getItem('Login_name');
  }

  public tabledata(): void {
    this.dataservice.make_getView().subscribe((data) => {
      // console.log(data.data);
      this.collection = data.data;
      this.BackUpdata = data.data;
    });
    // console.log(this.collection);
  }
  public deleteUsers(id: string): void {
    // console.log(id);
    this.dataservice.make_DeleteSingleUser(id, this.collection).subscribe(
      (data: any) => {
        this.tabledata();
      },
      (err) => console.log('its error')
    );
  }
  public store(): void {
    // if (
    //   this.registerDetails.description === undefined ||
    //   this.registerDetails.description === ''
    // ) {
    //   alert('Enter the Details');
    // } else {
    //   this.dataservice.make_postUser(this.registerDetails).subscribe(
    //     (data) => {
    //       // alert("Added");
    //       // console.log("Inserted" + data);
    //       if (data.data) {
    //         this.toastr.success('Created!!!', 'Make Created Successfully.', {
    //           timeOut: 3000,
    //         });
    //         let currentUrl = this.router.url;
    //         this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //         this.router.onSameUrlNavigation = 'reload';
    //         this.router.navigate([currentUrl]);
    //         this.tabledata();
    //       } else {
    //         if (data.error.errors[0].validatorKey) {
    //           this.toastr.error('Error!!!', 'Make Already Exists.', {
    //             timeOut: 3000,
    //           });
    //         }
    //       }
    //     },
    //     (err) => console.log('its error')
    //   );
    // }

    var description = this.registerDetails.description;

    if (description == '' || description == undefined) {
      this.toastr.warning('Warning!!!', 'description is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    this.dataservice.make_postUser(this.registerDetails).subscribe((data) => {
      this.collection = data.data;

      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
      this.tabledata();

      if (data.error.errors[0].validatorKey) {
        this.toastr.error('Error!!!', 'Type Already Exists.', {
          timeOut: 3000,
        });
      }
    });
  }
  update() {
    if (
      this.registerDetails.description === '' ||
      this.registerDetails.description === undefined
    ) {
      alert('Enter the Details');
    } else {
      // this.submitted = true;
      this.dataservice
        .make_updateSingleUser(this.registerDetails.id, this.registerDetails)
        .subscribe(
          (data) => {
            // alert("Update");
            // console.log(data);
            if (data.data) {
              this.toastr.success('Updated!!!', 'Make Created Successfully.', {
                timeOut: 3000,
              });
              let currentUrl = this.router.url;
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate([currentUrl]);
              this.tabledata();
            } else {
              if (data.error.errors[0].validatorKey) {
                this.toastr.error('Error!!!', 'Make Already Exists.', {
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

  // public Click_Head(index: number, heading: string): void {
  //   this.collection = [...this.BackUpdata];
  //   if (heading == "Type") {
  //     this.SearchField = heading;
  //     this.HighlightHead = index;
  //     this.searchvalue = "";
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
  //     if (this.SearchField == "Type") {
  //       this.collection = this.collection.filter(f => f.description == this.searchvalue
  //       );
  //     }
  //     // else if (this.SearchField == "Date") {
  //     //   this.collection = this.collection.filter(f => f.type == this.searchvalue);

  //     // }
  //   }
  // }

  public Click_Head(index: number, heading: string): void {
    this.collection = [...this.BackUpdata];
    if (heading == 'description') {
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
      if (this.SearchField == 'description') {
        this.collection = this.collection.filter(
          (f) => f.type == this.searchvalue
        );
      }
    }
  }

  reset() {
    this.registerDetails.description = '';
  }
}
