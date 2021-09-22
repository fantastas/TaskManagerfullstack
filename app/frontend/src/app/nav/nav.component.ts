import { HttpClient } from '@angular/common/http';
import { Emitters } from './../../emitters/emitters';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  authenticated = false;
  constructor(
    private http : HttpClient, 
    ) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
        
      });
  }

  logout(): void {
    this.http.post('http://localhost:3000/users/logout', {}, {withCredentials: true})
    .subscribe(() => this.authenticated = false);
  }

}
