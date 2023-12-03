import {Component, Input} from '@angular/core';
import {QRCodeModule} from 'angularx-qrcode';
import {SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent {
  @Input() Data!: string;

  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";

  traitement(data: any) {
    this.Data = data;
    this.myAngularxQrCode = this.Data;
    this.openNewWindowWithQRCode();
  }

  constructor() {
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  openNewWindowWithQRCode() {
    const qrCodeWindow = window.open('', '_blank');
    if (qrCodeWindow) {
      qrCodeWindow.document.write(`
      <html>
        <head>
          <title>QR Code Details</title>
        </head>
        <body>
          <h1>QR Code Details</h1>
          <div>
           <qrcode (qrCodeURL)="onChangeURL($event)" [qrdata]="myAngularxQrCode" [width]="256" [errorCorrectionLevel]="'M'"></qrcode>
            <a [href]="qrCodeDownloadLink" download="qrcode">Download</a>

          </div>
        </body>
      </html>
    `);
      qrCodeWindow.document.close();
      qrCodeWindow.resizeTo(400, 400); // Set window dimensions
    } else {
      console.log("qrcodewindow null");
    }
  }
}
