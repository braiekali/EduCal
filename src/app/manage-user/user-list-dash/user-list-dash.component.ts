import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogDashComponent } from '../add-user-dialog-dash/add-user-dialog-dash.component';

@Component({
  selector: 'app-user-list-dash',
  templateUrl: './user-list-dash.component.html',
  styleUrls: ['./user-list-dash.component.scss'],
})
export class UserListDashComponent implements AfterViewInit {
  ELEMENT_DATA: any = [
    {
      id: 1,
      imagePath: 'assets/images/profile/user-1.jpg',
      uname: 'Sunil Joshi',
      email: 'nabil@gmail.com',
      tel: '41156289',
      role: 'admin',
      state: 'active',
    },
    {
      id: 2,
      imagePath: 'assets/images/profile/user-2.jpg',
      uname: 'Andrew McDownland',
      email: 'salah@gmail.com',
      tel: '56432861',
      role: 'user',
      state: 'unactive',
    },
    {
      id: 3,
      imagePath: 'assets/images/profile/user-3.jpg',
      uname: 'Christopher Jamil',
      email: 'foulen@gmail.com',
      tel: '98432158',
      role: 'user',
      state: 'active',
    },
    {
      id: 4,
      imagePath: 'assets/images/profile/user-4.jpg',
      uname: 'Nirav Joshi',
      email: 'Nirav@gmail.com',
      tel: '91887328',
      role: 'user',
      state: 'active',
    },
    {
      id: 4,
      imagePath: 'assets/images/profile/user-4.jpg',
      uname: 'Nirav Joshi',
      email: 'Nirav@gmail.com',
      tel: '91887328',
      role: 'user',
      state: 'active',
    },
    {
      id: 4,
      imagePath: 'assets/images/profile/user-4.jpg',
      uname: 'Nirav Joshi',
      email: 'Nirav@gmail.com',
      tel: '91887328',
      role: 'user',
      state: 'active',
    },
    {
      id: 4,
      imagePath: 'assets/images/profile/user-4.jpg',
      uname: 'Nirav Joshi',
      email: 'Nirav@gmail.com',
      tel: '91887328',
      role: 'user',
      state: 'active',
    },
    {
      id: 4,
      imagePath: 'assets/images/profile/user-4.jpg',
      uname: 'Nirav Joshi',
      email: 'Nirav@gmail.com',
      tel: '91887328',
      role: 'user',
      state: 'active',
    },
    {
      id: 4,
      imagePath: 'assets/images/profile/user-4.jpg',
      uname: 'Nirav Joshi',
      email: 'Nirav@gmail.com',
      tel: '91887328',
      role: 'user',
      state: 'active',
    },
    {
      id: 4,
      imagePath: 'assets/images/profile/user-4.jpg',
      uname: 'Nirav Joshi',
      email: 'Nirav@gmail.com',
      tel: '91887328',
      role: 'user',
      state: 'active',
    },
  ];

  constructor(private addUserDialog: MatDialog) {}

  dataSource: any;
  displayedColumns: string[] = ['name', 'email', 'tel', 'state', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openAddUserDialog(): void {
    const dialogRef = this.addUserDialog.open(AddUserDialogDashComponent, {
      width: '550px', // Set the width as per your design
      // Add any other dialog configuration options here
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result after the dialog is closed (if needed)
      if (result) {
        console.log('The dialog save pressed', result);
      } else {
        console.log('The dialog was closed', result);
      }
    });
  }
}
