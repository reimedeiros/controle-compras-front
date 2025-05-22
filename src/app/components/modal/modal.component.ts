import {
  ChangeDetectorRef,
  Component,
  inject,
  signal,
  TemplateRef,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, NgbDatepickerModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @ViewChild('content', { static: true }) content!: TemplateRef<any>;

  selectedItem: any = null;
  modalAction: 'edit' | 'delete' = 'edit';

  private modalService = inject(NgbModal);
  closeResult: WritableSignal<string> = signal('');
  modal: any;

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  open(item: any, action: 'edit' | 'delete') {
    this.selectedItem = item;
    this.modalAction = action;

    this.modalService
      .open(this.content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult.set(`Closed with: ${result}`);
        },
        (reason) => {
          this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
        }
      );
  }

  async removeItem(id: number) {
    this.apiService.deleteApi(id).subscribe({
      next: (response) => {
        console.log('Deletado com sucesso:', response);
        if (this.modal) {
          this.modal.close('Item deletado');
        }
        window.location.reload();
      },
      error: (err) => {
        console.error('Erro ao deletar:', err);
      },
      complete: () => {
        console.log('Requisição finalizada');
      },
    });
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
