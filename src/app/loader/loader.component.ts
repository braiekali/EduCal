import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'app/services/loading.service';

@Component({
  selector: 'app-loader',
  template: `
    <div *ngIf="isLoading$ | async" class="loader-overlay">
      <div class="loader"></div>
    </div>
  `,
  styles: [
    `
      .loader-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }

      .loader {
        border: 8px solid #f3f3f3;
        border-top: 8px solid #5280ff;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoaderComponent implements OnInit {
  isLoading$ = this.loadingService.isLoading$;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {}
}
