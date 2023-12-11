import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {
  nouveauRole: any = { libelle: '' };
  roles: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.chargerRoles();
  }

  chargerRoles() {
    this.http.get<any[]>('http://localhost:8088/api/role/list').subscribe(data => {
      this.roles = data;
    });
  }

  ajouterRole() {
    const apiUrl = 'http://localhost:8088/api/role';

    this.http.post(apiUrl, this.nouveauRole).subscribe(() => {
      console.log('Rôle ajouté avec succès');
      this.nouveauRole = { libelle: '' };
      this.chargerRoles();
    });
  }

  modifierRole(role: any) {
    this.nouveauRole = {
      id: role.id,
      libelle: role.libelle
    };
    window.scrollTo(0, 0);
    this.chargerRoles();
  }

  supprimerRole(id: any) {
    const apiUrl = `http://localhost:8088/api/role/delete/${id}`;

    this.http.delete(apiUrl).subscribe(() => {
      console.log('Rôle supprimé avec succès');
      this.chargerRoles();
    });
  }
}
