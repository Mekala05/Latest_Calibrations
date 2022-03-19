import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login } from 'src/app/shared/datamodel/login.model';
import { DataService } from 'src/app/shared/service/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public hide = true;
  public logindetail: login = {};
  public collection: any[] = [];
  constructor(
    private router: Router,
    private dataservice: DataService,
    private toastr: ToastrService
  ) {
    const checkToken = localStorage.getItem('token');
    if (checkToken) {
      this.router.navigateByUrl('/header');
    }
    if (!checkToken) {
      // clears browser history so they can't navigate with back button
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {}
  login() {
    // localStorage.setItem('dataSource', this.dataSource.length);

    this.dataservice.loginPost(this.logindetail).subscribe(
      (data) => {
        // this.loading = false;
        console.log(data);
        if (data.token === undefined) {
          this.router.navigate(['/']);

          if (
            Object.keys(data.message).length === 0 &&
            data.success === false
          ) {
            this.toastr.error('Error!!!', 'Username or password incorrect!!', {
              timeOut: 3000,
            });
            // alert("Username or password incorrect!!");
          } else if (data.success === false) {
            this.toastr.error('Error!!!', 'Please enter credentials!!', {
              timeOut: 3000,
            });
            // alert("Please enter credentials!!");
          }
        } else {
          // debugger;
          localStorage.setItem('token', data.token);
          // console.log(data.user.name);
          localStorage.setItem('LoginId', data.user.id);
          localStorage.setItem('Login_name', data.user.name);

          // sessionStorage.setItem('loggedUser', data.name);
          this.toastr.success('Successfully logined', 'Success', {
            timeOut: 3000,
          });
          this.router.navigate(['/header']);
        }
      },
      (err) => {
        // console.log("It's Error" + err);
        // this.loading = false;
        this.toastr.error('Error!!!', "It's Error" + err, {
          timeOut: 3000,
        });
      }
    );
  }
}
