import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDownload, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { GeminiComponent } from '../gemini/gemini.component';


@Component({
  selector: 'app-assunto',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, NgxExtendedPdfViewerModule, FontAwesomeModule, FormsModule, GeminiComponent],
  templateUrl: './assunto.component.html',
  styleUrl: './assunto.component.scss'
})
export class AssuntoComponent {

  faDownload = faDownload;
  faSearch = faSearch;

  viewPdf: boolean = false;

  pdfUrls: any[] = [];

  pdfList = [
    {
      ref: '/assets/pdfs/ag.pdf',
      name: 'Estudo de processos de água energética',
      selected: false,
    },
    {
      ref: '/assets/pdfs/al.pdf',
      name: 'Estudo de processos - Alfajor Don Bispo',
      selected: false,
    },
    {
      ref: '/assets/pdfs/br.pdf',
      name: 'Estudo de deteriorações - Brown Cake',
      selected: false,
    },
    {
      ref: '/assets/pdfs/ch.pdf',
      name: 'Estudo de formulação - Charlie Whiskey',
      selected: false,
    },
    {
      ref: '/assets/pdfs/de.PDF',
      name: 'Estudo de deterioração - Sorella',
      selected: false,
    },
    {
      ref: '/assets/pdfs/me.pdf',
      name: 'Estudo de deterioração - Meraki',
      selected: false,
    }
  ]
  pdfUrl: any = '/assets/pdfs/ag.pdf';
  id = 0;

  selectPdf(option: number){
    this.pdfUrl = this.pdfList[option].ref;
    this.id = option;
  }

  onCheckboxChange(pdf: any): void {
    if (pdf.selected) {
      this.pdfUrls.push({ref: pdf.ref, name: pdf.name});
    } else {
      const index = this.pdfUrls.indexOf({ref: pdf.ref, name: pdf.name});
      if (index > -1) {
        this.pdfUrls.splice(index, 1);
      }
    }
  }

  toggleViewPdf(): void {
    this.viewPdf = !this.viewPdf;
    console.log(this.viewPdf)
  }

  downloadPdf(name: string): void {
    const link = document.createElement('a');
    link.href = this.pdfUrl;
    link.download = name;
    link.click();
  }

}
