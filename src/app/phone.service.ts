import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map } from "rxjs/operators";
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  constructor(private http: HttpClient) { }

  //function to get all the users from Api
  GetAllUsers(): Observable<User[]> {
  return this.http.get<User[]>('https://cila-test-api.herokuapp.com/v1/users').pipe(map((response: any) => response));
  }

  //function to Post the user objet to Api
  PostUser(UpdatedData){
    return this.http.post('https://cila-test-api.herokuapp.com/v1/users', UpdatedData).toPromise().then((data:any) => {
      console.log(data);
    });;
  } 

  //function to Update the user objet to Api
  UpdateUser(email, UpdatedData){
    const endPointRL ='https://cila-test-api.herokuapp.com/v1/users?email=' + email;
    return this.http.put(endPointRL, UpdatedData);
  }
  
}
