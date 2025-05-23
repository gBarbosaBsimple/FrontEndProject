import { Component,Output, Input,EventEmitter,signal, Signal } from '@angular/core';
import { Collaborator } from '../Interfaces/collaboratorInterface';
import { CollaboratorService } from '../Services/collaboratorService';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-collaborator-component',
  imports: [CommonModule],
  templateUrl:'./collaborator-list.component.html',
  styleUrls: ['./collaborator-list.component.css']
})
export class CollaboratorComponentComponent {
  collaboratorList: Signal<Collaborator[]>;

  constructor(private collaboratorService: CollaboratorService) {
    this.collaboratorList = this.collaboratorService.getCollaboratorSignal();
  }

  Details(collaborator:Collaborator){
    this.collaboratorService.selectCollaborator(collaborator); // Atualiza o Signal
  }
}
