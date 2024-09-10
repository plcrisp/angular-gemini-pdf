import { Routes } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component'
import { GeminiComponent } from './pages/gemini/gemini.component';
import { AssuntoComponent } from './pages/assunto/assunto.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'chat',component:GeminiComponent},
    {path:'assunto',component:AssuntoComponent},
];
