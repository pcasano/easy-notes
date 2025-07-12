import {Component, input} from '@angular/core';

export type Note = {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-note',
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {

  readonly selectedNote = input<Note | undefined>();

}
