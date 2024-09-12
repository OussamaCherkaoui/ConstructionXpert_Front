import { Component, OnInit } from '@angular/core';
import { Task } from "../model/task";
import { TaskService } from "../service/task.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.css'] // Correction ici
})
export class ListTaskComponent implements OnInit {
  id!: number;

  listTasks: Task[] = [];

  constructor(private taskService: TaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer l'ID du projet à partir de l'URL
    this.route.params.subscribe(params => {
      this.id = +params['id']; // Convertir en nombre
      this.getAllTasks();
    });
  }

  // Méthode pour récupérer toutes les tâches du projet via le service
  getAllTasks() {
    this.taskService.getAllTaskByIdProject(this.id).subscribe((data: Task[]) => {
      this.listTasks = data;
    });
  }
}
