import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { CandidatesService } from './services/candidates.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  candidateForm: FormGroup;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['name', 'surname', 'seniority', 'years', 'availability'];

  constructor(private fb: FormBuilder, private http: HttpClient, private candidatesService: CandidatesService) {
    this.candidateForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  /** Añade al formulario los datos del excel. */
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.candidateForm.patchValue({ file });
    }
  }

  submitForm() {
    if (this.candidateForm.valid) {
      const formData = new FormData();
      formData.append('name', this.candidateForm.get('name')?.value);
      formData.append('surname', this.candidateForm.get('surname')?.value);
      formData.append('file', this.candidateForm.get('file')?.value);

      this.candidatesService.uploadCandidate(formData).subscribe((response: any) => {
        this.dataSource.data = [...this.dataSource.data, response];
      });
    }
  }
}
