import {Component, OnInit} from '@angular/core';
import {RessourceService} from "../service/ressource.service";
import {Ressource} from "../model/ressource";
import {MatList, MatListItem} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import {NgForOf} from "@angular/common";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-list-ressource',
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    MatLine,
    NgForOf
  ],
  templateUrl: './list-ressource.component.html',
  styleUrl: './list-ressource.component.css'
})
export class ListRessourceComponent implements  OnInit{

  ListRessource :Ressource[]=[];
  ressourceId!: number

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ressourceId = +params['id'];
      this.getAlltasks();
    });
  }


  constructor(private resourceService:RessourceService , private route: ActivatedRoute) {

  }


  getAlltasks(){
    this.resourceService.getAllRessourceByIdTask(this.ressourceId).subscribe((data:Ressource[]) =>{
      this.ListRessource=data;
    })
  }


}
