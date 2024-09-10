import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NavbarComponent } from './shared/components/navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgxExtendedPdfViewerModule, NavbarComponent],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  title = 'pdf';

  pdfList = ['/assets/pdfs/ag.pdf','/assets/pdfs/al.pdf','/assets/pdfs/br.pdf','/assets/pdfs/ch.pdf','/assets/pdfs/de.PDF','/assets/pdfs/me.pdf']
  pdfUrl: any = '';
  id = 0;

  selectPdf(option: number){
    this.pdfUrl = this.pdfList[option];
    this.id = option;
  }

  ngOnInit(): void {
    this.pdfUrl = this.pdfList[this.id];
  }

}
