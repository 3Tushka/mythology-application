import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  id: string | null | undefined;

  notLogged = true;

  constructor() {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenParts = token.split('.');
      const payload = tokenParts[1];
      const decodedPayload = JSON.parse(window.atob(payload));
      this.id = decodedPayload.id;

      this.notLogged = false;
      // this.isAdmin = decodedPayload.roles[0].value;
    }
  }
}
