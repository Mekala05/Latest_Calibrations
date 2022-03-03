import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { LoaderServiceService } from './shared/service/loader-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LCC';
  public stopLoader = false;

  constructor(private bnIdle: BnNgIdleService, private router: Router,
    private loader: LoaderServiceService,
  ) {
    this.bnIdle.startWatching(900).subscribe((res) => {
      if (res) {
        localStorage.clear()
        this.router.navigate(['/'])
      }
    });
    this.stopLoader = true;
  }
  ngAfterViewInit() {
    this.loader.isLoading.subscribe((load) => {
      this.stopLoader = !load;
    });
  }
}
