import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {
  nouvelUtilisateur: any = { nom: '', prenom: '', email: '', address: '', password: '' };

  constructor(private router: Router, private http: HttpClient) { }

  authentification() {
    this.router.navigateByUrl('/authentification');
  }

  inscrireUtilisateur() {
    const apiUrl = 'http://localhost:8088/api/user';

    this.http.post(apiUrl, this.nouvelUtilisateur).subscribe(() => {
      console.log('Utilisateur inscrit avec succès');
      // Réinitialisez le formulaire ou effectuez d'autres actions nécessaires
      this.nouvelUtilisateur = { nom: '', prenom: '', email: '', address: '', password: '' };
      this.router.navigateByUrl('/contact');
    });
  }
}
