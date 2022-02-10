import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RootObject } from '../Models/NurtirationGET';
import { RootObjectIngr } from '../Models/IngredientStructure';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class NutritionServiceService {

 baseUrl = environment.baseUrl;

  _id: string = 'f92b596e';
  _key: string = 'a14a32c62dd0bd8f780c9c63ded0fbe3';

  apiUrlGET: string = `nutrition-data?app_id=${this._id}&app_key=${this._key}`;
  apiUrlPOST: string = `nutrition-details?app_id=${this._id}&app_key=${this._key}`;

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  getAllData(nutritionType:any, inger:any) : Observable<RootObject[]> {

    return this.httpClient.get<RootObject[]>(this.baseUrl+ this.apiUrlGET + '&' + 'nutrition-type=' + nutritionType + '&' + 'ingr=' + inger )
    .pipe(
      map((response: RootObject[]) => {
        return response as RootObject[];
      }),
      catchError((err, caught) => {
        console.error(err);
        throw err;
      }
      )
    )
}


  getAllDataIngr(inger:any) : Observable<RootObject[]> {

    return this.httpClient.get<RootObject[]>(this.baseUrl+ this.apiUrlGET + '&' +  'ingr=' + inger )
    .pipe(
      map((response: RootObject[]) => {
        return response as RootObject[];
      }),
      catchError((err, caught) => {
        console.error(err);
        throw err;
      }
      )
    )
}

CreateData(data: any): Observable<any> {
  return this.httpClient.post(this.baseUrl + this.apiUrlPOST , JSON.stringify(data), httpOptions ).pipe(
    catchError(this.handleError)
  );
}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'please try again later.');
  };
}
