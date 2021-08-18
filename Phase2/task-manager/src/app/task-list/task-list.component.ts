import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../task';
import { ShareTaskService } from '../share-task.service';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  allTasks:Array<Task> = [];

  constructor(public ser:ShareTaskService) { }

  ngOnInit(): void {
    this.allTasks = this.ser.getTaskArray();
  }



}
