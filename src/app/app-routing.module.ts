// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { ContactComponent } from './components/contact/contact.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { MedecinsComponent } from './components/medecins/medecins.component';
import { PatientsComponent } from './components/patients/patients.component';
import { ConsultationsComponent } from './components/consultations/consultations.component';
import { RendezVousComponent } from './components/rendez-vous/rendez-vous.component';
import { SpecialitesComponent } from './components/specialites/specialites.component';
import { RoleComponent } from './components/role/role.component';
import { CategorieComponent } from './components/categorie/categorie.component';
import { ServicecategorieComponent } from './components/servicecategorie/servicecategorie.component';

const routes: Routes = [
  { path: '', redirectTo: '/authentification', pathMatch: 'full' },
  { path: 'authentification', component: AuthentificationComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'medecins', component: MedecinsComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'consultations', component: ConsultationsComponent },
  { path: 'rendez-vous', component: RendezVousComponent },
  { path: 'specialites', component: SpecialitesComponent },
  { path: 'role', component: RoleComponent },
  { path: 'categorie', component: CategorieComponent },
  { path: 'servicecategorie', component: ServicecategorieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export { routes }; // Ajoutez cette ligne pour exporter le tableau routes
