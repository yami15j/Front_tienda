import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  private API = environment.apiUrl;
  
  productos: any[] = [];
  carrito: any[] = [];
  total: number = 0;

  constructor(private http: HttpClient) {
    console.log(' Componente iniciado');
  }

  ngOnInit() {
    console.log(' ngOnInit ejecutado');
    this.cargarCarrito();      
    this.cargarProductos();
  }

  // PRODUCTOS

  cargarProductos() {
    console.log(' Intentando conectar con:', `${this.API}/productos`);
    
    this.http.get<any[]>(`${this.API}/productos`).subscribe({
      next: (data) => {
        this.productos = data;
        console.log(' Productos cargados:', data);
      },
      error: (error) => {
        console.error(' Error completo:', error);
        console.error(' Status:', error.status);
        console.error(' URL:', error.url);
      }
    });
  }

  
  // CARRITO
  
  agregarAlCarrito(producto: any) {
    console.log(' Agregando:', producto);
    this.carrito.push(producto);
    this.calcularTotal();
    this.guardarCarrito();     
  }

  eliminar(index: number) {
    this.carrito.splice(index, 1);
    this.calcularTotal();
    this.guardarCarrito();     
  }

  vaciar() {
    this.carrito = [];
    this.total = 0;
    localStorage.removeItem('carrito'); 
  }

  calcularTotal() {
    this.total = 0;
    this.carrito.forEach(p => {
      this.total += p.precio;
    });
    console.log(' Total:', this.total);
  }


  
  guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  cargarCarrito() {
    const data = localStorage.getItem('carrito');
    if (data) {
      this.carrito = JSON.parse(data);
      this.calcularTotal();
      console.log(' Carrito cargado desde localStorage');
    }
  }
}
