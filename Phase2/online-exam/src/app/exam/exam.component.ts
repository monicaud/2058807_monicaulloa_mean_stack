import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Question } from '../question.model';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  allQuestions:Question[] = [];
  score:number = 0;
  totalPoints:number = -1;
  scoreMsg= "";

  constructor(public ser:QuestionsService) { }

  ngOnInit(): void {
    this.ser.loadQuestions().subscribe(q=>this.allQuestions=q,
      error=>console.log("Error: could not load data" + error),
       ()=>console.log("Completed"));
      this.scoreMsg = "";
      this.score = 0;
  }

  checkAnswers(questionsForm: NgForm){
    let index = 0;
    this.totalPoints = this.allQuestions.length;
    console.log("Length  updated: " + this.totalPoints);
    let form = questionsForm.value;
    document.createElement('style');
    
    Object.keys(form).forEach(key=> {
      console.log(key + " name ");
      console.log(form[key] );
      //form[key] contains the selected answer
      let thisQ = this.allQuestions[index].question;
      let thisA = this.allQuestions[index].answer;
      if(thisA == form[key]){
        this.score++;
        console.log("Correct!");
        let correctElem = document.getElementById(thisQ+"="+form[key]);
        if(correctElem){
          correctElem.style.backgroundColor = "#aced80"; //green
          correctElem.style.fontWeight = "bold";
        }
        console.log("HERE****");
      }
      else{
        console.log("HERE");
        let correctElem = document.getElementById(thisQ+"="+thisA);
        if(correctElem){
          correctElem.style.backgroundColor = "#aced80"; //green
          correctElem.style.fontWeight = "bold";
        }
        let myAns =  document.getElementById(thisQ+"="+form[key]);
        if(myAns){
          myAns.style.backgroundColor = "#913630"; //red
          myAns.style.fontWeight = "bold";
          myAns.style.color = "white";
          console.log("incorrect detected");
        }

      }

      
      index++;
    })
    if((this.score/this.totalPoints)>0.7){
      this.scoreMsg = ((this.score/this.totalPoints)* 100).toString() + "% PASS";
    }else
    this.scoreMsg = ((this.score/this.totalPoints)* 100).toString() + "% FAIL";

  }


}
