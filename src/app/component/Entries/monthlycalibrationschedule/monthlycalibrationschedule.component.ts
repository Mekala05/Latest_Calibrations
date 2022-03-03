import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { monthly } from './model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-monthlycalibrationschedule',
  templateUrl: './monthlycalibrationschedule.component.html',
  styleUrls: ['./monthlycalibrationschedule.component.scss'],
})
export class MonthlycalibrationscheduleComponent implements OnInit {
  public collection: any[] = [];
  public registerDetails: monthly = {};
  public searchvalue: any;
  public HighlightRow: any;
  public HighlightHead: any = 1;
  public SearchField: string = 'Type';
  public BackUpdata = [] as any;
  public timeout: any = null;
  selectedCountryAdvanced: any[] = [];
  public Requesttypelist: any = [];
  filteredCountries: any[] = [];
  countries: any[] = [];
  public TableHeading = [
    {
      name: 'SheduleNo',
    },
    {
      name: 'Instrument Code',
    },
    {
      name: 'Instrument Name',
    },
    {
      name: 'Due Date',
    },
    {
      name: 'Error Description',
    },
    {
      name: 'Type',
    },
  ];
  constructor(
    private dataservice: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.year();
    // this.tabledata();
    // this.dataservice
    //   .getfromAssest(`assets/model/countries.json`)
    //   .subscribe((data: []) => {
    //     this.countries = data;
    //     console.log(this.countries);
    //   });

    this.dataservice.Monthly_reportsheduleNo().subscribe((data) => {
      // console.log(data.data[0].id);
      let limitId = parseInt(data.data[0].id);
      let SheduleNo = 'u4-Br-2022_' + (limitId + 1);
      this.registerDetails.SheduleNo = SheduleNo;
    });
  }

  public store(): void {
    if (
      this.registerDetails.SheduleNo === undefined ||
      this.registerDetails.Month === '' ||
      this.registerDetails.Year === ''
    ) {
      alert('Enter the Details');
    } else {
      this.dataservice.Monthly_report_postUser(this.registerDetails).subscribe(
        (data) => {
          // alert("Added");
          if (data.data) {
            this.toastr.success(
              'Created!!!',
              'RequestType Created Successfully.',
              {
                timeOut: 3000,
              }
            );
            let currentUrl = this.router.url;
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate([currentUrl]);
          } else {
            if (data.error.errors[0].validatorKey) {
              this.toastr.error('Error!!!', 'RequestType Already Exists.', {
                timeOut: 3000,
              });
            }
          }
        },
        (err) => console.log('its error')
      );
    }
  }

  filterCountry(event: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }
  // private tabledata(): void {
  //   this.dataservice
  //     .getfromAssest('assets/model/category.json')
  //     .subscribe((data) => {
  //       this.collection = data;
  //       this.BackUpdata = data;
  //     });
  // }

  public year() {
    var year = this.registerDetails.Year;
    var month = this.registerDetails.Month;
    var SheduleNo = this.registerDetails.SheduleNo;

    console.log(month);
    console.log(year);
    if (year != undefined && month != undefined) {
      this.dataservice.Monthly_report(year, month).subscribe((data) => {
        if (data.data != '') {
          this.collection = data.data;
          this.BackUpdata = data.data;
          console.log(data.data);
        } else {
          this.toastr.error('No Data!!!', 'Data Not Found!.', {
            timeOut: 3000,
          });
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
          // alert("No data avaliable");
        }
      });
    }

    // year = ((year == '')) ? new Date().getFullYear() : year;
    // month = ((month == '')) ? (new Date().getMonth() + 1) : month;
  }

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
}
function data(year: string | undefined, month: string | undefined, data: any) {
  throw new Error('Function not implemented.');
}
