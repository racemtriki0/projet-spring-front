import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.scss'
})
export class PatientsComponent {
  nouveauPatient: any = { nom: '', prenom: '', address: '', email: '' };
  patients: any[] = [];

  constructor(public route: Router, private http: HttpClient) { }

  ngOnInit() {
    this.chargerPatients();
  }

  deconnecter() {
    this.route.navigateByUrl('/authentification');
  }

  accueil() {
    this.route.navigateByUrl('/accueil');
  }

  patientss() {
    this.route.navigateByUrl('/patients');
  }

  chargerPatients() {
    // Remplacez l'URL par votre endpoint réel
    this.http.get<any[]>('http://localhost:8088/api/patient/list', {
      headers: this.CORSheaders()
    }).subscribe(data => {
      this.patients = data;
    });
  }

  ajouterPatient() {
    // Remplacez l'URL par votre endpoint réel
    const apiUrl = 'http://localhost:8088/api/patient';

    this.http.post(apiUrl, this.nouveauPatient).subscribe(() => {
      // Ajoutez ici la logique supplémentaire si nécessaire
      console.log('Patient ajouté avec succès');

      // Réinitialisez le formulaire ou effectuez d'autres actions nécessaires
      this.nouveauPatient = { nom: '', prenom: '', address: '', email: '' };
      this.chargerPatients();
    });
  }

  supprimerPatient(patientId: number) {
    // Logique pour la suppression
    if (confirm('Voulez-vous vraiment supprimer ce patient?')) {
      // Remplacez l'URL par votre endpoint réel
      const apiUrl = `http://localhost:8088/api/patient/delete/${patientId}`;

      this.http.delete(apiUrl, {
        headers: this.CORSheaders()
      }).subscribe(() => {
        console.log('Patient supprimé avec succès');
        // Rafraîchissez la liste des patients après la suppression
        this.chargerPatients();
      });
    }
  }

  modifierPatient(patient: any) {
    // Préremplir le formulaire avec les détails du patient pour modification
    this.nouveauPatient = {
      id: patient.id,
      nom: patient.nom,
      prenom: patient.prenom,
      address: patient.address,
      email: patient.email || ''
    };
    window.scrollTo(0, 0);
  }

  CORSheaders(): HttpHeaders {
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
