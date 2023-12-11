import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent {
  constructor( public route:Router) { }

  publications = [
    {
      titre: 'Première publication',
      contenu: 'Contenu de la première publication.',
      commentaires: [
        { auteur: 'Utilisateur1', contenu: 'Commentaire 1' },
        { auteur: 'Utilisateur2', contenu: 'Commentaire 2' }
      ]
    },
    // Ajoutez d'autres publications ici
  ];

  nouveauCommentaire = '';

  ajouterCommentaire(publication: any): void {
    if (this.nouveauCommentaire.trim() !== '') {
      publication.commentaires.push({ auteur: 'Utilisateur Connecté', contenu: this.nouveauCommentaire });
      this.nouveauCommentaire = '';
    }
  }



  deconnecter(){
    this.route.navigateByUrl('/authentification');
  }
  accueil(){
    this.route.navigateByUrl('/accueil');
  }
  patients(){
    this.route.navigateByUrl('/patients');
  }
}
