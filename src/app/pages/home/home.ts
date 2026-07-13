import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { MainContent } from '../../components/main-content/main-content';

@Component({
  selector: 'app-home',
  imports: [Hero, MainContent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
