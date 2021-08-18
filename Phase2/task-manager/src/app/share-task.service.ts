import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class ShareTaskService {

  allTasks:Array<Task> = [];
  constructor() { }

  setTaskArray(tasks: Array<Task>){
    this.allTasks = tasks;
  }
  addTask(task:Task){
    this.allTasks.push(task);
  }

  getTaskArray(){
    return this.allTasks;
  }
}
