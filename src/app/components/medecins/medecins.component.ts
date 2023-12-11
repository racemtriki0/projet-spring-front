import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medecins',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './medecins.component.html',
  styleUrl: './medecins.component.scss'
})
export class MedecinsComponent {
  nouveauMedecin: any = { nom: '', prenom: '', address: '', email: '', speciality: null };
  medecins: any[] = [];
  specialites: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.chargerMedecins();
    this.chargerSpecialites();
  }

  chargerMedecins() {
    this.http.get<any[]>('http://localhost:8088/api/medecin/list', {
      headers: this.CORSheaders()
    }).subscribe(data => {
      this.medecins = data.map(medecin => ({
        ...medecin,
        speciality: medecin.specialities, // Assurez-vous que la propriété speciality est correctement définie
      }));
    });
  }

  chargerSpecialites() {
    this.http.get<any[]>('http://localhost:8088/api/speciality/list', {
      headers: this.CORSheaders()
    }).subscribe(data => {
      this.specialites = data;
      console.log('Spécialités:', this.specialites);
    });
  }

  ajouterMedecin() {
    const apiUrl = 'http://localhost:8088/api/medecin';
    this.http.post(apiUrl, this.preparerDonneesMedecin()).subscribe(() => {
      console.log('Médecin ajouté avec succès');
      this.nouveauMedecin = { nom: '', prenom: '', address: '', email: '', speciality: null };
      this.chargerMedecins();
    });
  }

  preparerDonneesMedecin() {
    return {
      id: this.nouveauMedecin.id,
      nom: this.nouveauMedecin.nom,
      prenom: this.nouveauMedecin.prenom,
      address: this.nouveauMedecin.address,
      email: this.nouveauMedecin.email,
      specialities: {
        id: this.nouveauMedecin.speciality.id,
        specialityName: this.nouveauMedecin.speciality.specialityName
      },
    };
  }

  /* modifierMedecin(medecin: any) {
    const apiUrl = `http://localhost:8088/api/medecin/${medecin.id}`;
    this.http.put(apiUrl, this.preparerDonneesMedecin()).subscribe(() => {
      console.log('Médecin modifié avec succès');
      this.chargerMedecins();
    });
  } */

  modifierMedecin(medecin: any) {
    // Préremplir le formulaire avec les détails du médecin pour modification
    this.nouveauMedecin = {
      id: medecin.id,
      nom: medecin.nom,
      prenom: medecin.prenom,
      address: medecin.address,
      email: medecin.email || '',
      speciality: medecin.speciality ? medecin.speciality.specialityName : null
    };
    window.scrollTo(0, 0);
  }

  supprimerMedecin(id: any) {
    const apiUrl = `http://localhost:8088/api/medecin/delete/${id}`;
    this.http.delete(apiUrl).subscribe(() => {
      console.log('Médecin supprimé avec succès');
      this.chargerMedecins();
    });
  }

  CORSheaders() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Access-Control-Allow-Origin", "*");
    headers = headers.append(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, X-Auth-Token"
    );
    headers = headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    headers = headers.append("Accept", "application/json");
    headers = headers.append("content-type", "application/json");
    headers = headers.append("withCredentials", "true");
    return headers;
  }
}
