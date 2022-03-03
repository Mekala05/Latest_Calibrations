import { Component, OnInit } from '@angular/core';
import { equipment } from './model';
import { DataService } from 'src/app/shared/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipmentmaster',
  templateUrl: './equipmentmaster.component.html',
  styleUrls: ['./equipmentmaster.component.scss'],
})
export class EquipmentmasterComponent implements OnInit {
  public registerDetails: equipment = {};
  public collection: any[] = [];
  public BackUpdata = [] as any;
  public Type: any[] = [];
  public Category: any[] = [];
  public timeout: any = null;
  public searchvalue: any;
  public HighlightRow: any;
  public HighlightHead: any = 3;
  public user_name: any = [];
  public shortname: any;
  public SearchField: string = 'Instrument Name';
  public TableHeading = [
    {
      name: 'SI No',
    },
    {
      name: 'Category',
    },
    {
      name: 'Type',
    },
    {
      name: 'Short Name',
    },
    {
      name: 'Equipment Name',
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
    this.tabledata();
    this.getType();
    this.getCategory();
    this.user_name = localStorage.getItem('Login_name');
    // console.log("jjjjjjjjjjjjj",this.user_name);
  }
  keyFunc(data: any) {
    this.shortname = data.target.value;
    console.log('keyup', data.target.value);
  }

  public getType(): void {
    this.dataservice.MasterType_getView().subscribe((data) => {
      // console.log(data.data);
      this.Type = data.data;
      // this.BackUpdata = data.data;
    });
  }

  public getCategory(): void {
    this.dataservice.MasterCategory_getView().subscribe((data) => {
      //console.log(data.data);
      this.Category = data.data;
      // this.BackUpdata = data.data;
    });
  }
  public tabledata(): void {
    this.dataservice.Equipment_getView().subscribe((data) => {
      console.log(data.data);
      // console.log(data.data[0].CategoryMaster.id);
      // console.log(data.data[0].CategoryMaster.category);

      this.collection = data.data;
      this.BackUpdata = data.data;
    });
    // console.log(this.collection);
  }

  update() {
    if (
      this.registerDetails.shortName === undefined ||
      this.registerDetails.categoryId === undefined ||
      this.registerDetails.typeId === undefined ||
      this.registerDetails.shortName === ''
    ) {
      alert('Enter the Details');
    } else {
      this.dataservice
        .Equipment_updateSingleUser(
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
                'Equipment Updated Successfully.',
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
                this.toastr.error('Error!!!', 'Equipment Already Exists.', {
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
    this.dataservice.Equipment_DeleteSingleUser(id, this.collection).subscribe(
      (data: any) => {
        this.tabledata();
      },
      (err) => console.log('its error')
    );
  }
  public store(): void {
    console.log(this.registerDetails.categoryId);
    console.log(this.registerDetails.typeId);
    console.log(this.registerDetails.shortName);
    console.log(this.registerDetails.EquipmentName);
    // console.log(this.registerDetails.code);

    if (this.shortname.length < 3) {
      alert('Must have type 3 digits');
    } else if (
      this.registerDetails.shortName === undefined ||
      this.registerDetails.categoryId === undefined ||
      this.registerDetails.typeId === undefined ||
      this.registerDetails.shortName === ''
    ) {
      alert('Enter the Details');
    } else {
      this.dataservice.Equipment_postUser(this.registerDetails).subscribe(
        (data) => {
          //alert("Added");
          //console.log("Inserted" + data.data);
          if (data.data) {
            this.toastr.success(
              'Created!!!',
              'Equipment Created Successfully.',
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
              this.toastr.error('Error!!!', 'Equipment Already Exists.', {
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
    if (heading == 'Short Name') {
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
      if (this.SearchField == 'Short Name') {
        this.collection = this.collection.filter(
          (f) => f.shortName == this.searchvalue
        );
      }
      // else if (this.SearchField == "Date") {

      //   this.collection = this.collection.filter(f => f.type == this.searchvalue);

      // }
    }
  }
  reset() {
    (this.registerDetails.EquipmentName = ''),
      (this.registerDetails.shortName = '');
    (this.registerDetails.categoryId = undefined),
      (this.registerDetails.typeId = undefined);
  }
}
