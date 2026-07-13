import { Component } from '@angular/core';
import { Contact } from '../../components/contact/contact';

@Component({
  selector: 'app-services',
  imports: [Contact],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class Services {}
