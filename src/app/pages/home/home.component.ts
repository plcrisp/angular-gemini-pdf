import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgxExtendedPdfViewerModule, NavbarComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) {}

  redirectToAssunto(title: string){
    this.router.navigate(['/assunto']);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  cards = [
    {
      title: 'Segurança Alimentar',
      content: 'Garantia de conformidade com as regulamentações de segurança alimentar e implementação de práticas de higiene e controle de qualidade.',
      image: '../../../assets/images/safety.jpg'
    },
    {
      title: 'Otimização de Processos',
      content: 'Análise e melhoria de processos produtivos para aumentar a eficiência e reduzir custos operacionais.',
      image: '../../../assets/images/optimization.jpg'
    },
    {
      title: 'Deterioração de alimentos',
      content: 'Estudo dos fatores que contribuem para a deterioração dos alimentos e desenvolvimento de estratégias para prolongar a vida útil e manter a qualidade.',
      image: '../../../assets/images/deterioration.jpg'
    },
    {
      title: 'Sustentabilidade',
      content: 'Implementação de práticas sustentáveis na produção industrial para reduzir o impacto ambiental e promover a responsabilidade social.',
      image: '../../../assets/images/sustainability.jpeg'
    }
  ];
}
