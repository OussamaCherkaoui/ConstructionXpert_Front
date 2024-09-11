import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { MatInputModule} from "@angular/material/input";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {Project} from "../model/project";
import {MatNativeDateModule} from "@angular/material/core";
import {ProjectService} from "../service/project.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Task} from "../model/task";
import {TaskService} from "../service/task.service";
import {Ressource} from "../model/ressource";
import {RessourceService} from "../service/ressource.service";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatNativeDateModule,
    MatLabel,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepickerModule,
    MatButtonModule,
    NgIf,
    DatePipe,
    NgForOf
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  projectData: Project | null = null;
  projectForm!: FormGroup;
  isEditMode = false;
  message: string='';
  taskForm!: FormGroup;
  isEditTaskMode = false; // Pour la modification des tâches
  taskData: Task | null = null;
  resourceForm!: FormGroup;
  isEditResourceMode = false; // Pour la modification des ressources
  resourceData: Ressource | null = null;
  projects: Project[] = [];
  tasks: Task[] | null = null;
  ressources: Ressource[] | null = null;
  selectedTaskResources: boolean=false;
  selectedProjectTasks: boolean=false;
  constructor(private fb: FormBuilder,private projectService:ProjectService,private taskService: TaskService,private ressourceService: RessourceService) {}

  ngOnInit(): void {
    this.isEditMode = !!this.projectData;

    this.projectForm = this.fb.group({
      name: [this.projectData?.name || '', [Validators.required]],
      description: [this.projectData?.description || '', [Validators.required]],
      startDate: [this.projectData?.startDate || '', [Validators.required]],
      endDate: [this.projectData?.endDate || '', [Validators.required]],
      budget: [this.projectData?.budget || null]
    });
    this.taskForm = this.fb.group({
      title: [this.taskData?.title || '', [Validators.required]],
      description: [this.taskData?.description || '', [Validators.required]],
      status: [this.taskData?.status || '', [Validators.required]],
      projectId: [this.taskData?.projectId || null, [Validators.required]]
    });
    this.resourceForm = this.fb.group({
      name: [this.resourceData?.name || '', [Validators.required]],
      type: [this.resourceData?.type || '', [Validators.required]],
      quantity: [this.resourceData?.quantity || '', [Validators.required]],
      taskId: [this.resourceData?.taskId || null, [Validators.required]]
    });
      this.getAllProject();
  }

  getAllProject() {
    this.projectService.getAllProject().subscribe((projects: Project[]) => {
      this.projects = projects;
    });
  }
  onSubmit() {
    if (this.projectForm.valid) {
      const project: Project = this.projectForm.value;
      if (this.isEditMode) {
        console.log('Projet mis à jour : ', project);
      } else {
        this.projectService.saveProject(project).subscribe(data => {
          if (data)
          {
            this.message='Project ajoutée avec succes';
          }
          else{
            this.message="Erreur lors d ajout !! Ressayer "
          }
        });
      }
    }
  }

  onSubmitTask() {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;

      if (this.isEditTaskMode && this.taskData) {
        // Mode modification
        this.taskService.updateTask(task).subscribe(data => {
          this.message = data ? 'Tâche mise à jour avec succès' : 'Erreur lors de la mise à jour de la tâche !';
          this.isEditTaskMode = false; // Revenir en mode ajout après modification
        });
      } else {
        console.log(task);
        this.taskService.saveTask(task).subscribe(data => {
          this.message = data ? 'Tâche ajoutée avec succès' : 'Erreur lors de l\'ajout de la tâche !';
        });
      }
    }
  }
  onSubmitResource() {
    if (this.resourceForm.valid) {
      const resource: Ressource = this.resourceForm.value;
      if (this.isEditResourceMode && this.resourceData) {
        this.ressourceService.updateRessource(resource).subscribe(data => {
          this.message = data ? 'Ressource mise à jour avec succès' : 'Erreur lors de la mise à jour de la ressource !';
          this.isEditResourceMode = false;
        });
      } else {
        this.ressourceService.saveRessource(resource).subscribe(data => {
          this.message = data ? 'Ressource ajoutée avec succès' : 'Erreur lors de l\'ajout de la ressource !';
        });
      }
    }
  }

  showAddProjectForm() {

  }

  editProject(project:Project) {

  }

  deleteProject(id: number | undefined) {
        this.projectService.deleteProject(id).subscribe(data => {
          if (data)
          {
            console.log('Project supprimé avec succes');
            this.getAllProject();
          }
          else{
            console.log('Erreur lors d suppression !! Ressayer ');
          }
        });
  }

  viewTasks(id: number | undefined) {
    this.taskService.getAllTaskByIdProject(id).subscribe((tasks: Task[]) => {
      this.selectedProjectTasks=true;
      console.log(tasks);
      this.tasks = tasks;
    });
  }
  editTask(task: Task) {
    // Logic pour modifier la tâche
  }

  deleteTask(taskId: number | undefined) {
    this.taskService.deleteTask(taskId).subscribe(() => {
      this.viewTasks(taskId); // Recharger les tâches après suppression
    });
  }

  viewResources(taskId: number | undefined) {
    this.ressourceService.getAllRessourceByIdTask(taskId).subscribe((resources: Ressource[]) => {
      this.selectedProjectTasks=false;
      this.selectedTaskResources=true;
      this.ressources = resources;
    });
  }

  editResource(resource: any) {

  }

  deleteResource(id: number | undefined) {

  }
}
