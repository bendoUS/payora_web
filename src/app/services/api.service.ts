import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.URL_SERVER;

  constructor(private http: HttpClient) { }

  // GET
  getData(endpoint: string, params: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}`, { params });
  }

  // POST
  postData(endpoint: string, body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}`, body);
  }

  // Avec headers (ex: Auth)
  getWithAuth(endpoint: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/${endpoint}`, { headers });
  }
}