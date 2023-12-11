import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.scss'
})
export class CategorieComponent {
  nouvelleCategorie: any = { libelle: '' };
  categories: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.chargerCategories();
  }

  chargerCategories() {
    this.http.get<any[]>('http://localhost:8088/api/categories/list').subscribe(data => {
      this.categories = data;
    });
  }

  ajouterCategorie() {
    const apiUrl = 'http://localhost:8088/api/categories';

    this.http.post(apiUrl, this.nouvelleCategorie).subscribe(() => {
      console.log('Catégorie ajoutée avec succès');
      this.nouvelleCategorie = { libelle: '' };
      this.chargerCategories();
    });
  }

  modifierCategorie(category: any) {
    this.nouvelleCategorie = {
      id: category.id,
      libelle: category.libelle
    };
    window.scrollTo(0, 0);
    this.chargerCategories();
  }

  supprimerCategorie(id: any) {
    const apiUrl = `http://localhost:8088/api/categories/delete/${id}`;

    this.http.delete(apiUrl).subscribe(() => {
      console.log('Catégorie supprimée avec succès');
      this.chargerCategories();
    });
  }
}
