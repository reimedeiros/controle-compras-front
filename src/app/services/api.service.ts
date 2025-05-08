import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3000/inventory';

  async getApiResponse(): Promise<any> {
    const response = this.getApi(this.url);
    const data = await firstValueFrom(response);

    return data;
  }

  getApi(url: string): Observable<any> {
    return this.http.get(url);
  }

  postApi(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }
  
  deleteApi(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
