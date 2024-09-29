import {Component, OnInit} from '@angular/core';
import {Project} from "../model/project";
import {ProjectService} from "../service/project.service";
import {CommonModule} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Task} from "../model/task";
import {Ressource} from "../model/ressource";
import {TaskService} from "../service/task.service";
import {RessourceService} from "../service/ressource.service";

@Component({
  selector: 'app-list-project',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButton, MatDatepicker, MatDatepickerInput, MatDatepickerToggle, MatFormField, MatInput, MatLabel, MatSuffix, ReactiveFormsModule],
  templateUrl: './list-project.component.html',
  styleUrl: './list-project.component.css'
})
export class ListProjectComponent  implements OnInit {

  ListProject: Project[] = [];
  pageIndex = 0;
  ascending = true;
  totalItems = 0;

  ngOnInit(): void {
    this.getAllProject();
  }


  constructor(private projetService: ProjectService ,  private router: Router) {

  }

  getAllProject() {
    this.projetService.getAllProject(this.pageIndex,this.ascending).subscribe(data => {
      this.ListProject = data.content;
    })

  }

}





  //
  //

  // projectData: Project | null = null;
  // projectForm!: FormGroup;
  // isEditMode = false;
  // message: string = '';
  // taskForm!: FormGroup;
  // isEditTaskMode = false; // Pour la modification des tâches
  // taskData: Task | null = null;
  // resourceForm!: FormGroup;
  // isEditResourceMode = false; // Pour la modification des ressources
  // resourceData: Ressource | null = null;
  // projects: Project[] = [];
  // tasks: Task[] | null = null;
  // ressources: Ressource[] | null = null;
  // selectedProject: boolean = true;
  // selectedTaskResources: boolean = false;
  // selectedProjectTasks: boolean = false;
  // isFormProject: boolean = false;
  // isFormTask: boolean = false;
  // isFormRessource: boolean = false;
  // idProjectSelected: number | undefined = 0;
  // idTaskSelected: number | undefined = 0;
  // idRessourceSelected: number | undefined = 0;
  //
  // constructor(private fb: FormBuilder, private projectService: ProjectService, private taskService: TaskService, private ressourceService: RessourceService) {
  // }
  //
  // ngOnInit(): void {
  //   this.getAllProject();
  // }
  //
  // getAllProject() {
  //   this.projectService.getAllProject().subscribe((projects: Project[]) => {
  //     this.projects = projects;
  //   });
  // }
  //
  // refreshTask(id: number | undefined) {
  //   this.taskService.getAllTaskByIdProject(id).subscribe((tasks: Task[]) => {
  //
  //     this.tasks = tasks;
  //   });
  // }
  //
  // refreshRessource(id: number | undefined) {
  //   this.ressourceService.getAllRessourceByIdTask(id).subscribe((resources: Ressource[]) => {
  //     this.ressources = resources;
  //   });
  // }
  //
  // viewTasks(id: number | undefined) {
  //   this.taskService.getAllTaskByIdProject(id).subscribe((tasks: Task[]) => {
  //     this.selectedProject = false;
  //     this.selectedProjectTasks = true;
  //     this.idProjectSelected = id;
  //     console.log(tasks);
  //     this.tasks = tasks;
  //   });
  // }
  //
  // viewResources(taskId: number | undefined) {
  //   this.ressourceService.getAllRessourceByIdTask(taskId).subscribe((resources: Ressource[]) => {
  //     this.selectedProjectTasks = false;
  //     this.selectedTaskResources = true;
  //     this.idTaskSelected = taskId;
  //     this.ressources = resources;
  //   });
  // }
  //
  //
  // goBackToProjects() {
  //   this.selectedProject = true;
  //   this.selectedProjectTasks = false;
  //   this.tasks = [];
  // }
  //
  // goBackToTasks() {
  //   this.selectedTaskResources = false;
  //   this.selectedProjectTasks = true;
  //   this.ressources = [];
  // }

