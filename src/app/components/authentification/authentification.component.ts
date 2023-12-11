import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.scss'
})
export class AuthentificationComponent {
  utilisateur: any = { email: '', password: '' };

  constructor(private router: Router, private http: HttpClient) { }

  authentifierUtilisateur() {
    const apiUrl = 'http://localhost:8088/api/user/list';
  
    this.http.get<any[]>(apiUrl).subscribe((utilisateurs) => {
      const utilisateurTrouve = utilisateurs.find(u => u.email === this.utilisateur.email);
  
      if (utilisateurTrouve) {
        // L'utilisateur existe, vérifiez le mot de passe
        if (utilisateurTrouve.password === this.utilisateur.password) {
          console.log('Authentification réussie');
          this.router.navigateByUrl('/accueil');
          // Redirigez vers la page appropriée après l'authentification réussie
        } else {
          console.log('Mot de passe incorrect');
        }
      } else {
        console.log('Nom d\'utilisateur n\'existe pas. Veuillez vous inscrire.');
        // Redirigez vers la page d'inscription ou affichez un message approprié
      }
    });
  }

  redirigerVersInscription() {
    this.router.navigateByUrl('/inscription');
  }
}
