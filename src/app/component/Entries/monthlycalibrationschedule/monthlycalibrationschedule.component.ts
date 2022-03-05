import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { monthly } from './model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

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
  // defaultYear: any;
  // defaultMonth: any;
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
    {
      name: 'History',
    },
  ];
  constructor(
    private dataservice: DataService,
    private router: Router,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.year();
    let today = new Date();
    let todayDate = this.datePipe.transform(today, 'MM,YYYY');
    let splitted: any = todayDate?.split(',');
    // console.log(splitted);
    // console.log(splitted[0]);

    this.registerDetails.Month = splitted[0];
    this.registerDetails.Year = splitted[1];

    this.tableData(this.registerDetails.Year, this.registerDetails.Month);

    // this.dataservice.Monthly_report(year, month).subscribe((data) => {
    //   if (data.data != '') {
    //     this.collection = data.data;
    //     this.BackUpdata = data.data;
    //   }
    // });

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

  public tableData(year: any, month: any) {
    this.dataservice.Monthly_report(year, month).subscribe((data) => {
      if (data.data != '') {
        // console.log(data.data);
        data.data.map((item: any) => {
          if (item.MxLifeTime === 'Quarterly||3') {
            var quarterly = item.MxLifeTime.split('||');
            let weekValue = 3;
            //  console.log(weekValue);
            // console.log(item.date);

            // let formatdate = this.datePipe.transform(item.date);
            // console.log('format', formatdate);

            let send_date: any = new Date(item.date);
            // console.log('send', send_date);

            send_date.setMonth(send_date.getMonth() + parseInt(quarterly[1]));
            // console.log(send_date);
            // debugger;
            if (send_date != 'Invalid Date') {
              let setDate: any = this.datePipe.transform(
                send_date,
                'dd-MMM-YYYY'
              );
              //  console.log(setDate);
              item.dueDate = setDate;
            }
          }
          if (item.MxLifeTime === 'Week') {
            // console.log('week');
            // console.log('maxlife', data);

            let weekValue = parseInt(item.MxLifeTimeNumber) * 7;
            //  console.log(weekValue);
            let send_date: any = new Date(item.date);
            send_date.setDate(send_date.getDate() + weekValue);
            if (send_date != 'Invalid Date') {
              let setDate: any = this.datePipe.transform(
                send_date,
                'dd-MMM-YYYY'
              );
              // console.log('set', setDate);
              item.dueDate = setDate;
              // console.log('item', item.dueDate);
            }
          }
          if (item.MxLifeTime === 'Day') {
            // console.log('day');

            let weekValue = parseInt(item.MxLifeTimeNumber) * 1;
            //  console.log(weekValue);
            let send_date: any = new Date(item.date);
            send_date.setDate(send_date.getDate() + weekValue);
            if (send_date != 'Invalid Date') {
              let setDate: any = this.datePipe.transform(
                send_date,
                'dd-MMM-YYYY'
              );
              //  console.log(setDate);
              item.dueDate = setDate;
            }
          }

          if (item.MxLifeTime === 'Month') {
            // console.log('month');

            let weekValue = parseInt(item.MxLifeTimeNumber) * 1;
            //  console.log(weekValue);
            let send_date: any = new Date(item.date);
            send_date.setMonth(send_date.getMonth() + weekValue);
            // console.log(send_date);
            if (send_date != 'Invalid Date') {
              let setDate: any = this.datePipe.transform(
                send_date,
                'dd-MMM-YYYY'
              );
              //  console.log(setDate);
              item.dueDate = setDate;
            }
          }

          if (item.MxLifeTime === 'Year') {
            // console.log('year');

            let weekValue = parseInt(item.MxLifeTimeNumber) * 1;
            //  console.log(weekValue);
            let send_date: any = new Date(item.date);
            send_date.setFullYear(send_date.getFullYear() + weekValue);
            // console.log(send_date);
            if (send_date != 'Invalid Date') {
              let setDate: any = this.datePipe.transform(
                send_date,
                'dd-MMM-YYYY'
              );
              //  console.log(setDate);
              item.dueDate = setDate;
            }
          }
        });
        this.collection = data.data;
        this.BackUpdata = data.data;
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

  public year() {
    var year = this.registerDetails.Year;
    var month = this.registerDetails.Month;
    var SheduleNo = this.registerDetails.SheduleNo;

    if (year != undefined && month != undefined) {
      this.tableData(year, month);
    }
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
