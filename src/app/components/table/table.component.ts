import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  SimpleChanges,
  OnChanges,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';

interface Category {
  id: number;
  name: string;
}

interface Inventory {
  id: number;
  name: string;
  quantity: number;
  unity: string;
  category: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ModalComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnChanges {
  @Input() dataTable: any;
  @ViewChild(ModalComponent) modalComp!: ModalComponent;
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;

  COLUMNS: string[] = [];
  datas: any[] = [];
  title: string = '';

  showModal: boolean = false;
  selectedItem: any = null;
  modalType: 'edit' | 'delete' | null = null;

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataTable'] && this.dataTable) {
      this.COLUMNS = this.dataTable.columns || [];
      this.datas = this.dataTable.data || [];
	  this.title = this.dataTable.title || '';
    }
  }

  openModal(item: any, action: 'edit' | 'delete') {
	this.modalComp.open(item, action);
  }

  closeModal() {
    this.showModal = false;
    this.selectedItem = null;
    this.modalType = null;
  }
}
