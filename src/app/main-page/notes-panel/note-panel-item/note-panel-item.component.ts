import {Component, input, output} from '@angular/core';
import {Note} from '../../note/note.component';
import {TruncatePipe} from './truncate.pipe';

@Component({
  selector: 'app-note-panel-item',
  imports: [
    TruncatePipe
  ],
  templateUrl: './note-panel-item.component.html',
  styleUrl: './note-panel-item.component.scss'
})
export class NotePanelItemComponent {

  readonly note = input.required<Note>();

  selected = output<Note>();

  onSelect() {

  }
}
