import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3/movie';
  queryParams = {
    api_key: '2151e89da0f419c7586e15ef8c67b87d',
  };

  constructor(private http: HttpClient) {}

  getMovie(): Observable<any> {
    return this.http.get(`${this.apiUrl}/popular`, {
      params: this.queryParams,
    });
  }
}
