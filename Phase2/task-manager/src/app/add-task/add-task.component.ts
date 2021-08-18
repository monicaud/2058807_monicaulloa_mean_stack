import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShareTaskService } from '../share-task.service';
import { Task } from '../task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  allTasks:Array<Task> = [];
  constructor(public ser:ShareTaskService) { }

  ngOnInit(): void {
  }
  
  addTask(ngForm: NgForm){
    let form = ngForm.value;
    if(form.id.length >0 && form.name.length >0 && form.task.length >0 && form.date.length >0){
      let task = new Task(form.id, form.name, form.task, form.date);
      this.ser.addTask(task);
      console.log("Task added: " + form.name);
    }
    
  }
}
