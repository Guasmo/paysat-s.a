import { Component } from '@angular/core';
import { Contact } from '../contact/contact';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-content',
  imports: [Contact, NgOptimizedImage, RouterLink],
  templateUrl: './main-content.html',
  styleUrl: './main-content.css',
})
export class MainContent {}
