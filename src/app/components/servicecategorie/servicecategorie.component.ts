import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { window } from 'rxjs';

@Component({
  selector: 'app-servicecategorie',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './servicecategorie.component.html',
  styleUrl: './servicecategorie.component.scss'
})
export class ServicecategorieComponent {
  nouveauService: any = { libelle: '', service_description: '', price: 0.0, service_duration: '', serviceCategory: { id: 1, libelle: 'Dentiste' } };
  services: any[] = [];
  categories: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.chargerServices();
    this.chargerCategories();
  }

  chargerServices() {
    // Remplacez l'URL par votre endpoint réel
    this.http.get<any[]>('http://localhost:8088/api/services/list').subscribe(data => {
      this.services = data;
    });
  }

  chargerCategories() {
    // Remplacez l'URL par votre endpoint réel
    this.http.get<any[]>('http://localhost:8088/api/categories/list').subscribe(data => {
      this.categories = data;
    });
  }



  ajouterService() {
    const apiUrl = 'http://localhost:8088/api/services';

    this.http.post(apiUrl, this.nouveauService).subscribe(() => {
      console.log('Service ajouté avec succès');
      this.nouveauService = { libelle: '', service_description: '', price: 0.0, service_duration: '', serviceCategory: { id: 1, libelle: 'Dentiste' } };

      // Update the services array after adding a new service
      this.chargerServices();
    });
  }

  modifierService(service: any) {
    this.nouveauService = {
      id: service.id,
      libelle: service.libelle,
      service_description: service.service_description,
      price: service.price,
      service_duration: service.service_duration,
      serviceCategory: { id: service.serviceCategory.id, libelle: service.serviceCategory.libelle }
    };
  }

  supprimerService(id: any) {
    const apiUrl = `http://localhost:8088/api/services/delete/${id}`;

    this.http.delete(apiUrl).subscribe(() => {
      console.log('Service supprimé avec succès');
      this.chargerServices();
    });
  }
}
