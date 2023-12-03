import {Component, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ChambreService} from "../chambre.service";
import {MatTableDataSource} from "@angular/material/table";
import {Chambre} from "../model/chambre";
import {Reservation} from "../model/reservation";
import {Bloc} from "../model/Bloc";
import {HttpErrorResponse} from "@angular/common/http";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
 // @ts-ignore
import QRCode from 'qrcode-generator';

import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-chambre-list',
  templateUrl: './chambre-list.component.html',
  styleUrls: ['./chambre-list.component.scss']
})
export class ChambreListComponent {


  data: any;/*= [
    {
      idChambre: 3,
      numeroChambre: 'A8',
      typeChambre: 'SIMPLE',
      bloc: 'AAA',
      reservation: 'kkk',
      image: 'assets/images/profile/user-1.jpg',
    },
    {
      idChambre: 3,
      numeroChambre: 'A8',
      typeChambre: 'SIMPLE',
      bloc: 'AAA',
      reservation: '',
      image: 'assets/images/profile/user-1.jpg',
    },
    {
      idChambre: 3,
      numeroChambre: '9',
      typeChambre: 'SIMPLE',
      bloc: 'AAA',
      reservation: 'null',
      image: 'assets/images/profile/user-1.jpg',
    },

  ];*/

  constructor(private s: ChambreService,private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.refreshChambreList();

  }

  refreshChambreList() {
    this.s.getChambres().subscribe(
      (result) => {
        this.data = result

      }
    )
  }

  ReservChambre: any;

  traitement(data: any) {
    this.ReservChambre = data;
    console.log("Chambree :", data);
    const reservation: Reservation = {
      idReservation: null,
      anneeUniv: null,
      estValide: false,
      chambre: {
        idChambre: this.ReservChambre.idChambre,
        numeroChambre: null,
        typeChambre: null,
        bloc: null,
        reservation: null,
      },
      user: {
        idUser: 1
      },


    }
    console.log("reservation  :", reservation)

    this.s.addReservation(reservation).subscribe(
      () => {
        alert("Added Successfully");
        console.log("apres ajout reservation : ", reservation)
      }
    )

    this.myAngularxQrCode = this.generateQRCode("Voici Votre Reservation pour la chambre numero :"+ data.idChambre + " de Type  : "+data.typeChambre);
    this.openNewWindowWithQRCode();
  }
  generateQRCode(data: string): string {
    const qr = QRCode(0, 'H'); // Create QRCode instance with level H (high)
    qr.addData(data);
    qr.make();
    return qr.createSvgTag();
  }

  public myAngularxQrCode: string = "";
  public qrCodeDownloadLink: SafeUrl = "";
  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  openNewWindowWithQRCode() {
    const qrCodeWindow = window.open('', '_blank');
    if (qrCodeWindow) {
      qrCodeWindow.document.write(`
        <html>
          <head>
            <title>Reservation QR Code </title>
          </head>
          <body>
            <h1>Reservation QR Code </h1>
            <div>
              ${this.myAngularxQrCode}
            </div>
            <button id="saveAsImageBtn">Save QrCode</button>
            <script>
              document.getElementById('saveAsImageBtn').addEventListener('click', function() {
                const svg = document.querySelector('svg');
                const svgData = new XMLSerializer().serializeToString(svg);
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.onload = function() {
                  ctx.drawImage(img, 0, 0);
                  const link = document.createElement('a');
                  link.download = 'qrcode.png';
                  link.href = canvas.toDataURL('image/png');
                  link.click();
                };
                img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
              });
            </script>
          </body>
        </html>
      `);
      qrCodeWindow.document.close();
      qrCodeWindow.resizeTo(400, 500); // Adjust the size as needed
    } else {
      console.log("qrCodeWindow is null");
    }
  }



}
