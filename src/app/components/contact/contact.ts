import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  readonly submitted = signal(false);
  readonly sending = signal(false);
  readonly error = signal<string | null>(null);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    service: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sending.set(true);
    this.error.set(null);

    this.http.post('/api/contact', this.form.value).subscribe({
      next: () => {
        this.sending.set(false);
        this.submitted.set(true);
        this.form.reset();
      },
      error: () => {
        this.sending.set(false);
        this.error.set('Hubo un error al enviar el mensaje. Intentá de nuevo o escribinos a mordewave@gmail.com');
      },
    });
  }

  hasError(field: string, error: string): boolean {
    const control = this.form.get(field);
    return !!(control?.hasError(error) && control.touched);
  }
}
