import { Emitters } from './../../emitters/emitters';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message = '';
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/users/login/user', {withCredentials: true}).subscribe(res =>{
      console.log(res);
      Emitters.authEmitter.emit(true);
    }, err => {
      this.message = 'You are not logged in';
      console.log(this.message);
      Emitters.authEmitter.emit(false);

    });
  }

}
