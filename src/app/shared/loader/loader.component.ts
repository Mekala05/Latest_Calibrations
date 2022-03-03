import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-loader",
  template: `
    <div class="progress-spinner">
      <p-progressSpinner
        [style]="{ width: '100px', height: '100px' }"
        strokeWidth="5"
        fill="transparent"
        animationDuration=".5s"
      ></p-progressSpinner>
    </div>
  `,
  styles: [
    `
      .progress-spinner {
        position: fixed;
        z-index: 999;
        height: 2em;
        width: 2em;
        overflow: show;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }

      /* Transparent Overlay */
      .progress-spinner:before {
        content: "";
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.25);
      }
    `
  ]
})
export class LoaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {
  }
}
