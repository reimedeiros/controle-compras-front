import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from '../../components/table/table.component';
import { FormComponent } from '../../components/form/form.component';
import { ApiService } from '../../services/api.service';
import { firstValueFrom } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { ModalComponent } from '../../components/modal/modal.component';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, NgbNavModule, TableComponent, FormComponent],
})
export class HomeComponent {
  active = 1;
  dataTable: { title: string; columns: string[]; data: any[] } = {
    title: '',
    columns: [],
    data: [],
  };

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    const data = await this.apiService.getApiResponse();
    const COLUMNS = [
      'ID',
      'NOME',
      'QUANTIDADE',
      'UNIDADE DE MEDIDA',
      'CATEGORIA',
      'AÇÕES',
    ];
    this.dataTable = {
      title: 'Lista atualizada (O que temos)',
      columns: COLUMNS,
      data: await data,
    };

    this.cdr.detectChanges();
  }
}
