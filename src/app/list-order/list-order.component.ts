import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../interfaces/order.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css'],
})
export class ListOrderComponent implements OnInit {
  orders: Order[] = [];
  activeFilter: boolean = false;
  inProcessFilter: boolean = false;
  finishedFilter: boolean = false;
  searchText: string = '';
  filteredOrders: Order[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  performSearch() {
    if (this.searchText.trim() === '') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter((order) => {
        const searchTextLower = this.searchText.toLowerCase();
        return (
          order.code.toLowerCase().includes(searchTextLower) ||
          order.name.toLowerCase().includes(searchTextLower)
        );
      });
    }
  }

  editOrder(code: string) {
    this.router.navigate(['/editOrder', code]);
  }

  loadOrders(): void {
    this.http.get<Order[]>('../../assets/json/orders.json').subscribe(
      (data) => {
        this.orders = data;
        this.filteredOrders = this.orders;
      },
      (error) => {
        console.log('Error loading orders:', error);
      }
    );
  }

  filterChanged(): void {
    if (!this.activeFilter && !this.inProcessFilter && !this.finishedFilter) {
      this.performSearch();
    } else {
      this.filteredOrders = this.orders.filter(order => {
        if (this.activeFilter && order.status === 'active') {
          return true;
        }
        if (this.inProcessFilter && order.status === 'inProcess') {
          return true;
        }
        if (this.finishedFilter && order.status === 'finished') {
          return true;
        }
        return false;
      });
    }
  }  

  clearFilters(): void {
    this.activeFilter = false;
    this.inProcessFilter = false;
    this.finishedFilter = false;
    this.filteredOrders = this.orders;
  }
}
