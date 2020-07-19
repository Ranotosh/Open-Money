import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable()

export class PostService {

    data:any;

    private _jsonURL = 'assets/db.json';

    constructor(private _httpclient: HttpClient) { }

    getPostComment() {
        return this._httpclient.get<any>(this._jsonURL);
    }
    setData(name,data){
       this.data= localStorage.setItem(name,JSON.stringify(data))
      }
    getData(data) {
       return JSON.parse(localStorage.getItem(data));
     }

}