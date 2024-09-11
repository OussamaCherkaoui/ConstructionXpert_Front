import {Component, OnInit} from '@angular/core';
import {Task} from "../model/task";
import {TaskService} from "../service/task.service";

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [],
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent implements OnInit {
  id_project!:number;

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
