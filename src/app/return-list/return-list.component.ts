import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReturnList } from './model';

@Component({
  selector: 'app-return-list',
  templateUrl: './return-list.component.html',
  styleUrls: ['./return-list.component.scss']
})
export class ReturnListComponent implements OnInit {

  public collection: any[] = [];
  public searchvalue: any;
  public HighlightRow: any;
  public registerDetails:ReturnList  = {};
  public HighlightHead: any = 1;
  public SearchField: string = 'Type';
  public BackUpdata = [] as any;
  public user_name: any = [];
  public InstrumentNameof: any = [];
  public InstrumentCodeof: any = [];
  public timeout: any = null;
  public text : any = [];
  public Return: any = [];
  public TableHeading = [
    {
      name: 'IssueNo',
    },
    // {
    //   name: 'id',
    // },
    {
      name: 'IssueDate',
    },
    // {
    //   name: 'IssueNo',
    // },
    {
      name: 'InstrumentCode',
    },
    {
      name: 'InstrumentName',
    },
    {
      name: 'Action',
    },
    // {
    //   name: 'MachineCode',
    // },
    // {
    //   name: 'Location',
    // },
    // {
    //   name: 'Quantity',
    // },
    // {
    //   name: 'ReturnDate',
    // },
    // {
    //   name: 'ReturnNo',
    // },
    // {
    //   name: 'InstrumentDetails',
    // },
    // {
    //   name: 'Create On',
    // },
    // {
    //   name: 'Create_By',
    // },
    // {
    //   name: 'Update On',
    // },
    // {
    //   name: 'Update By',
    // },
    // {
    //   name: 'Edit',
    // },
    // {
    //   name: 'Delete',
    // },
  ];
  constructor(
    private dataservice: DataService,
    private toastr: ToastrService,
    private router: Router
  ) { }
  

  ngOnInit(): void {
    this.tabledata();
    this.registerDetails.IssueDate = new Date();
    this.registerDetails.ReturnDate = new Date();
    this.registerDetails.Quantity='1';
    this.user_name = localStorage.getItem('Login_name');

  }

  private tabledata(): void {
    this.dataservice
      .IssueReturn_getView()
      .subscribe((data) => {
        this.collection = data.data;
        this.BackUpdata = data.data;
      });

      this.dataservice
      .MasterTest_getView()
      .subscribe((data) => {
        // console.log(data.data[0].type);
        this.InstrumentNameof = data.data;
        // this.BackUpdata = data.data;
      });
      this.dataservice
      .MasterTest_getView()
      .subscribe((data) => {
        // console.log(data.data[0].type);
        this.InstrumentCodeof = data.data;
        // this.BackUpdata = data.data;
      });
  }

  onKeyIns(x:any) { 

    this.dataservice.ReturnList_postUser(this.registerDetails.InstrumentCode,this.collection).subscribe((data)=>{
      console.log(data.data[0]);
       this.registerDetails.InstrumentName = data.data[0].InstrumentName;
       this.registerDetails.MachineCode = data.data[0].MachineCode;
       this.registerDetails.IssueDate = data.data[0].IssueDate;
       this.registerDetails.Location = data.data[0].Location;
       this.registerDetails.ReturnDate = data.data[0].ReturnDate;
       this.registerDetails.ReturnNo = data.data[0].ReturnNo;
       this.registerDetails.InstrumentDetails = data.data[0].InstrumentDetails;
       this.registerDetails.IssueNo = data.data[0].IssueNo;


    })
   

   
  }
  getUser1(id: any) {
    // alert(id)
    this.router.navigate([`header/Return2`], { queryParams: { id: id} });
  }
  // helpWindow(id:any) {
  //   alert(id);
  //   // window.open(this.registerDetails.InstrumentCode,this.collection).subscribe((data)=>);
  // }

  update() {
    if ((this.registerDetails.IssueDate === undefined) || (this.registerDetails.IssueNo ==='') || (this.registerDetails.InstrumentCode ==='')|| (this.registerDetails.InstrumentName ==='')|| (this.registerDetails.MachineCode ==='')|| (this.registerDetails.Location ==='')|| (this.registerDetails.Quantity ==='')|| (this.registerDetails.ReturnDate ===undefined)|| (this.registerDetails.ReturnNo ==='')|| (this.registerDetails.InstrumentDetails ==='')) {
      alert("Enter the Details");
    }
    else{
    // this.submitted = true;
    this.dataservice.IssueReturn_updateSingleUser(this.registerDetails.id, this.registerDetails).subscribe(
      (data) => {
        // alert("Update");
        // console.log(data);
        if (data.data) {
          this.toastr.success('Updated!!!', 'IssueReturn Updated Successfully.', {
            timeOut: 3000,
          });
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
          this.tabledata();
        }
        else{
          if (data.error.errors[0].validatorKey) {
            this.toastr.error('Error!!!', 'issueReturn Already Exists.', {
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
    this.registerDetails = {...id};
  }
  public deleteUsers(id: string): void {
    // console.log(id);
    this.dataservice.IssueReturn_DeleteSingleUser(id,this.collection).subscribe((data: any) => {
      this.tabledata();
    }, err => console.log('its error')
    );
  }
  public store(): void {
    if ((this.registerDetails.IssueDate === undefined) || (this.registerDetails.IssueNo ==='') || (this.registerDetails.InstrumentCode ==='')|| (this.registerDetails.InstrumentName ==='')|| (this.registerDetails.MachineCode ==='')|| (this.registerDetails.Location ==='')|| (this.registerDetails.Quantity ==='')|| (this.registerDetails.ReturnDate ===undefined)|| (this.registerDetails.ReturnNo ==='')|| (this.registerDetails.InstrumentDetails ==='')) {
      alert("Enter the Details");
    }
    else{
    this.dataservice.IssueReturn_postUser(this.registerDetails).subscribe(
      (data) => {
        // alert("Added");
        // console.log("Inserted"+data);
        if (data.data) {
          this.toastr.success('Created!!!', 'IssueReturn Created Successfully.', {
            timeOut: 3000,
          });
          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
          this.tabledata();
        }
        else{
          if (data.error.errors[0].validatorKey) {
            this.toastr.error('Error!!!', 'IssueReturn Already Exists.', {
              timeOut: 3000,
            });
          }
        }
        
       
      },err => console.log('its error')
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
    this.registerDetails.IssueDate = new Date();
    this.registerDetails.IssueNo = '';
    this.registerDetails.InstrumentCode = '';
    this.registerDetails.InstrumentName = '';
    this.registerDetails.MachineCode = '';
    this.registerDetails.Location = '';
    this.registerDetails.Quantity = '';
    this.registerDetails.ReturnDate = new Date();
    this.registerDetails.ReturnNo = '';
    this.registerDetails.InstrumentDetails = ''
    
    
  }
   
}
