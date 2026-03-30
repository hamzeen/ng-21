import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-icon-doc',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './icon-doc.component.html',
})
export class IconDocComponent {
  icons = ['house', 'user', 'speedometer'];
}
