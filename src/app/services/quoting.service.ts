import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Quote } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuotingService {

  constructor(private http: HttpClient) { }

  public getQuote(): Observable<HttpResponse<Quote>> {
    return this.http.get<Quote>('', { observe: 'response', params: null });
  }

}
