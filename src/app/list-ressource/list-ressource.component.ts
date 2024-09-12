import {Component, OnInit} from '@angular/core';
import {RessourceService} from "../service/ressource.service";
import {Ressource} from "../model/ressource";


@Component({
  selector: 'app-list-ressource',
  standalone: true,
  imports: [],
  templateUrl: './list-ressource.component.html',
  styleUrl: './list-ressource.component.css'
})
export class ListRessourceComponent implements  OnInit{

  ListRessource :Ressource[]=[];
  ressourceId!: number

  ngOnInit(): void {
    this.getAlltasks();
  }

  constructor(private resourceService:RessourceService) {
  }


  getAlltasks(){
    this.resourceService.getAllRessourceByIdTask(this.ressourceId).subscribe((data:Ressource[]) =>{
      this.ListRessource=data;
    })
  }


}
