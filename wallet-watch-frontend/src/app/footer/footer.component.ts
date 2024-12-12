import { Component } from '@angular/core';
import { Router } from '@angular/router';
 // Import CommonModule

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [], // Add CommonModule here
})
export class FooterComponent {
  constructor(public router: Router) {}

  shouldShowFooter(): boolean {
    return this.router.url !== '/login';
  }
}
