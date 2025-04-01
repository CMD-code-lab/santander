import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { CandidatesService } from './services/candidates.service';
import { of } from 'rxjs';

jest.mock('./services/candidates.service');

describe('AppComponent', () => {
  let component: AppComponent;
  let candidatesService: jest.Mocked<CandidatesService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppComponent],
      providers: [CandidatesService],
    }).compileComponents();

    candidatesService = TestBed.inject(CandidatesService) as jest.Mocked<CandidatesService>;
    component = TestBed.createComponent(AppComponent).componentInstance;
  });

  test('should create the component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  test('Debe actualizar el formulario cuando se llama a onFileChange', () => {
    const mockFile = new File(['dummy content'], 'test.xlsx', { type: 'application/vnd.ms-excel' });
    const event = { target: { files: [mockFile] } };

    component.onFileChange(event);

    expect(component.candidateForm.get('file')?.value).toBe(mockFile);
  });

  test('Debe llamar a uploadCandidate y actualizar la tabla cuando se llama a submitForm', () => {
    component.candidateForm.setValue({ name: 'Juan', surname: 'Romero', file: new File([], 'test.xlsx') });

    const mockResponse = { name: 'Juan', surname: 'Romero', seniority: 'senior', years: 5, availability: 'true' };
    candidatesService.uploadCandidate = jest.fn().mockReturnValue(of(mockResponse));

    component.submitForm();

    expect(candidatesService.uploadCandidate).toHaveBeenCalled();
    expect(component.dataSource.data).toContain(mockResponse);
  });
});
