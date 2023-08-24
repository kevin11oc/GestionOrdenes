import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
})
export class CreateOrderComponent {
  isModalOpen: boolean = false;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean =false;
  generatedCode: string = '';
  orderForm: FormGroup;
  statusOrder: boolean = false;

  constructor(private cdRef: ChangeDetectorRef, private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/)]],
      description: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s]*$/)]],
    });
  }

  ngAfterViewInit() {
    this.generatedCode = this.generateUniqueCode();
    this.cdRef.detectChanges();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  closeSuccessMessage() {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
  }

  onConfirmation() {
    if (this.orderForm.invalid) {
      this.showErrorMessage = true;
      this.closeModal();
      return;
    }
    this.statusOrder= true;
    this.closeModal();
    this.showSuccessMessage = true;
  }

  generateUniqueCode(): string {
    const initialCode = 'RHK';
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const codeLength = 8;
    let generatedCode = initialCode;
    for (let i = 0; i < codeLength - initialCode.length; i++) {
      const randomIndex = Math.floor(Math.random() * randomChars.length);
      generatedCode += randomChars[randomIndex];
    }
    return generatedCode;
  }
}
