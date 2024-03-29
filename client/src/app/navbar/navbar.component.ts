import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  id: string | null | undefined;

  notLogged = true;
  isAdmin = false;

  constructor() {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      const tokenParts = token.split('.');
      const payload = tokenParts[1];
      const decodedPayload = JSON.parse(window.atob(payload));
      this.id = decodedPayload.id;

      this.notLogged = false;
      this.isAdmin = decodedPayload.roles[0].value === 'admin';

      const expirationDate = new Date(decodedPayload.exp * 1000);
      const currentDate = new Date();

      if (currentDate > expirationDate) {
        localStorage.removeItem('token');
      }
    }
  }
}
