import {Component, OnInit} from '@angular/core';
import {Task} from "../model/task";
import {TaskService} from "../service/task.service";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent implements OnInit {
  id_project:number =1;

  ngOnInit(): void {
    this.getAllTasks();
  }

  listTasks: Task[] = [];

  constructor(private taskService: TaskService) {

  }


  getAllTasks() {
    this.taskService.getAllTaskByIdProject(this.id_project).subscribe((data: Task[]) => {
      this.listTasks = data;
    })


  }

}
