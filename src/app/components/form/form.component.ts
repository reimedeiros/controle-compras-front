import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { firstValueFrom, of } from 'rxjs';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NgbToastModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  formData = {
    name: '',
    quantity: '',
    unity: '',
    category: '',
  };

  UNITS: any[] = [
    {
      name: 'Quilo',
      abrev: 'KG',
    },
    {
      name: 'Litro',
      abrev: 'L',
    },
    {
      name: 'Unidade',
      abrev: 'Uni',
    },
  ];
  categories: any[] = [];
  show = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    const data = await this.getApiResponse(
      'http://localhost:3000/inventory/categories'
    );

    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      this.categories.push(element);
    }
  }

  onSubmit() {
    const body = {
      name: this.formData.name,
      quantity: this.formData.quantity,
      category: this.formData.category,
      unity: this.formData.unity,
    };

    this.sendApiResponse('http://localhost:3000/inventory', body)
  }

  async getApiResponse(url: string): Promise<any> {
    const response = this.apiService.getApi(url);
    const data = await firstValueFrom(response);

    return data;
  }

  async sendApiResponse(url: string, body: any): Promise<any> {
    try {
      const response = this.apiService.postApi(url, body);
      const data = await firstValueFrom(response);

      if(data) {this.show = true};
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }
}
