import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-specialites',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './specialites.component.html',
  styleUrl: './specialites.component.scss'
})
export class SpecialitesComponent {
  nouvelleSpecialite: any = { specialityName: '' };
  specialites: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.chargerSpecialites();
  }

  chargerSpecialites() {
    // Remplacez l'URL par votre endpoint réel
    this.http.get<any[]>('http://localhost:8088/api/speciality/list').subscribe(data => {
      this.specialites = data;
    });
  }

  ajouterSpecialite() {
    // Remplacez l'URL par votre endpoint réel
    const apiUrl = 'http://localhost:8088/api/speciality';

    this.http.post(apiUrl, this.nouvelleSpecialite).subscribe(() => {
      // Ajoutez ici la logique supplémentaire si nécessaire
      console.log('Spécialité ajoutée avec succès');

      // Réinitialisez le formulaire ou effectuez d'autres actions nécessaires
      this.nouvelleSpecialite = { specialityName: '' };
    });
  }

  

  modifierSpecialite(specialite: any) {
    // Préremplir le formulaire avec les détails de la spécialité pour modification
    this.nouvelleSpecialite = {
      id: specialite.id,
      specialityName: specialite.specialityName
    };
    window.scrollTo(0, 0);
    this.chargerSpecialites();
  }

  supprimerSpecialite(id:any) {
    // Remplacez l'URL par votre endpoint réel
    const apiUrl = `http://localhost:8088/api/speciality/delete/${id}`;

    this.http.delete(apiUrl).subscribe(() => {
      // Ajoutez ici la logique supplémentaire si nécessaire
      console.log('Spécialité supprimée avec succès');

      // Mettez à jour la liste des spécialités après la suppression
      this.chargerSpecialites();
    });
  }
}

