import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('sidenav', { static: false })
  sidenav!: MatSidenav;
  usermenu: boolean = false;
  headervalue!: any;
  sidenavSmall: boolean = false;
  name!: string;
  username!: string;
  public menus: any[] = [];
  public Divition: any[] = [];
  public current_access_branch: any;
  public accessbranch: any[] = [];
  public accessbranch2: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataSvc: DataService
  ) {
    const checkToken =  localStorage.getItem("token")
    if(!checkToken){
     this.router.navigateByUrl('/'); 
    }
    if (this.router.routerState.snapshot.url === '/header') {
      localStorage.setItem('headerName', 'Dashboard');
      this.headervalue = localStorage.getItem('headerName');
    } else {
      this.headervalue = localStorage.getItem('headerName');
    }
  }

  ngOnInit(): void {
    this.Loadtaledata();
  }

  private Loadtaledata() {
    let parent: [];
    let child;

    let LoadChild: any[] = [];
    this.dataSvc.getfromAssest(`assets/model/Dummymenu.json`).subscribe((data) => {
      this.menus = [...data];  
    });
  }

  child(ch: any) {}


  menuclick(children: any) {}


  sidenavToggle() {
    this.sidenavSmall = !this.sidenavSmall;
  }

  header(e: string) {
    (this.name as any) = localStorage.getItem('headerName');
    if (this.name != e) {
      localStorage.setItem('headerName', e);
    }
    this.headervalue = localStorage.getItem('headerName');
  }

  showusermenu() {
    if (this.usermenu == false) {
      this.usermenu = true;
    } else {
      this.usermenu = false;
    }
  }

  logout() {
    this.router.navigateByUrl('/');
    localStorage.clear();
  }
}
