import { Component, OnInit } from '@angular/core';
import { Order } from '../interfaces/order.interface';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent implements OnInit {
  isModalOpen: boolean = false;
  showSuccessMessage: boolean = false;
  loadNotes: boolean = false;
  order: Order | undefined;
  code: string = '';
  notes: { description: string; date: string }[] = [];
  newNoteDate: string = '';
  newNoteDescription: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.code = params['code'];
      this.loadOrderData(this.code);
    });
  }

  loadOrderData(code: string): void {
    this.http.get<Order[]>('../../assets/json/orders.json').subscribe(
      (data) => {
        this.order = data.find((order) => order.code === code);
      },
      (error) => {
        console.log('Error loading order:', error);
      }
    );
  }

  openModal() {
    this.isModalOpen = true;
  }

  openNewNote() {
    this.newNoteDescription = '';
    this.newNoteDate = '';
    this.loadNotes = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  closeSuccessMessage() {
    this.showSuccessMessage = false;
  }

  onConfirmation() {
    this.closeModal();
    this.showSuccessMessage = true;
  }

  onNoteSave(description: string, date: string) {
    if (description.trim() !== '') {
      this.notes.push({ description, date });
      this.loadNotes = false;
    }
  }
}
