import { Component, inject, Input } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterOutlet } from '@angular/router';
import { SkeletonComponent } from '../../shared/components/skeleton/skeleton.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GeminiService } from '../../shared/services/gemini.service';
import { faKeyboard, faUser } from '@fortawesome/free-solid-svg-icons';
import * as pdfjsLib from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist';




@Component({
  selector: 'app-gemini',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, SkeletonComponent, FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './gemini.component.html',
  styleUrl: './gemini.component.scss'
})
export class GeminiComponent {

  // PARA UTILIZAR EM MODALS
  @Input() modal: boolean = false;
  @Input() pdfUrl: any[] = [];
  pdfText: string[] = [];


  // ICONS
  faUser = faUser;
  faKeyboard = faKeyboard;


  // CHAT
  prompt: string = '';
  geminiService: GeminiService = inject(GeminiService);
  loading: boolean = false;
  chatHistory: any[] = [];



  constructor() {
    GlobalWorkerOptions.workerSrc = '../assets/pdf.worker.mjs';
    this.geminiService.getMessageHistory().subscribe((res) => {
      if(res) {
        this.chatHistory.push(res);
      }
    })
  }

  async extractTextFromPDF(pdfUrl: string, pdfName: string) {
    // Carregar o PDF
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    let text = '\n\nTítulo: ' + pdfName;

    // Iterar por todas as páginas e extrair texto
    for (let i = 1; i <= pdf.numPages; i++) {
      text += '\n\nPágina ' + i + '\n';
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(' ');
    }

    this.pdfText.push(text);
  }


  async sendData(option: boolean) {
    if (this.prompt && !this.loading) {
      this.loading = true;
      const data = this.prompt;
      this.prompt = '';
      
      if (!option) {
        await this.geminiService.generateText(data);
      } else if (option) {        
        const extractionPromises = this.pdfUrl.map(url => this.extractTextFromPDF(url.ref,url.name));
        
        await Promise.all(extractionPromises);
        
        let text = '';
        for (let pdf of this.pdfText) {
          text += pdf;
        }
        
        await this.geminiService.generateTextWithPDF(data, text);
      }
      
      this.loading = false;
    }
  }

  formatText(text: string): string {
    return text
      .replace(/\\(.?)\\*/g, '<strong>$1</strong>')
      .replace(/\*/g, '')
      .replace(/\n\n/g, '<br><br>') 
      .replace(/\n/g, '<br>'); 
  }



}