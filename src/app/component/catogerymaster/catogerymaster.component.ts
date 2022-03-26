import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { User } from './model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catogerymaster',
  templateUrl: './catogerymaster.component.html',
  styleUrls: ['./catogerymaster.component.scss'],
})
export class CatogerymasterComponent implements OnInit {
  public collection: any[] = [];
  public searchvalue: any;
  public HighlightRow: any;
  public HighlightHead: any = 1;
  public SearchField: string = 'category';
  public BackUpdata = [] as any;
  public timeout: any = null;
  public registerDetails: User = {};
  // public validate: any = [];
  public user_name: any = [];
  showButton: boolean = false;
  editAccess: boolean = false;
  public TableHeading = [
    {
      name: 'SI No',
    },
    {
      name: 'category',
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
    let datas = useraccess.filter((element: any) => element.moduleid === 6);
    this.editAccess = datas[0].Edit;

    this.dataservice.getViewOhem().subscribe((item: any) => {
      console.log('ohem', item);
    });
    this.tabledata();
    this.user_name = localStorage.getItem('Login_name');
  }
  // Get All Data
  public tabledata(): void {
    this.dataservice.getView().subscribe((data) => {
      // console.log(data.data);
      this.collection = data.data;
      this.BackUpdata = data.data;
    });
  }
  // Delete the Particular Data
  public deleteUsers(id: string): void {
    // console.log(id);
    this.dataservice.DeleteSingleUser(id, this.collection).subscribe(
      (data: any) => {
        this.tabledata();
      },
      (err) => console.log('its error')
    );
  }
  // Insert the New Data
  public store(): void {
    var category = this.registerDetails.category;

    if (category == '' || category == undefined) {
      this.toastr.warning('Warning!!!', 'category is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();

      // return false;
    } else {
      this.dataservice.postUser(this.registerDetails).subscribe(
        (data) => {
          // alert("Added");
          if (data.data) {
            this.toastr.success(
              'Created!!!',
              'Category Created Successfully.',
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
              this.toastr.error('Error!!!', 'Category Already Exists.', {
                timeOut: 3000,
              });
            }
          }
          // console.log(data.error.errors[0].validatorKey);
        },
        (err) => console.log('its error')
      );
    }
  }

  // public store(): void {
  //   var category = this.registerDetails.category;
  //   if (category == '' || category == undefined) {
  //     this.toastr.warning('Warning!!!', 'category is required!', {
  //       timeOut: 3000,
  //     });
  //     (<HTMLInputElement>document.getElementById('id')).focus();

  //     // return false;
  //   }

  //   this.dataservice
  //     .MasterTest_postUser(this.registerDetails)
  //     .subscribe((data) => {
  //       // this.dataservice.MasterTest_getViewtablerecord1().subscribe((data) => {
  //       this.collection = data.data;
  //       //   this.BackUpdata = data.data;
  //       // });
  //     });

  // }

  // Update the Exist Data
  update() {
    if (
      this.registerDetails.category === '' ||
      this.registerDetails.category === undefined
    ) {
      alert('Enter the Details');
    } else {
      this.dataservice
        .updateSingleUser(this.registerDetails.id, this.registerDetails)
        .subscribe(
          (data) => {
            // alert("Update");
            // console.log(data);
            if (data.data) {
              this.toastr.success(
                'Updated!!!',
                'Category Updated Successfully.',
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
                this.toastr.error('Error!!!', 'Category Already Exists.', {
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
    if (heading == 'Type') {
      this.SearchField = heading;
      this.HighlightHead = index;
    } else {
      // this.toastr.info(`Search Field Invalid`);
    }
  }
  public Empty(): void {}
  public onKeySearch(event: any) {}

  reset() {
    this.registerDetails.category = '';
  }
}
