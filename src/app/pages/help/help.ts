import { Component } from '@angular/core';
import { Contact } from '../../components/contact/contact';

@Component({
  selector: 'app-help',
  imports: [Contact],
  templateUrl: './help.html',
  styleUrl: './help.css',
})
export class Help {}

