import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  private apiUrl = 'http://localhost:3000/candidates/upload';

  constructor(private http: HttpClient) {}

  /** Carga el formulario con los datos de los canditos. */
  uploadCandidate(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}
