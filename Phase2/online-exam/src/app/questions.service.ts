import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(public http:HttpClient) { }

  loadQuestions():Observable<Question[]>{
    return this.http.get<Question[]>("/assets/questions.json");
  }
}
