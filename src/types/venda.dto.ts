import type { FormaPagamento, StatusPagamento, StatusVenda } from "./venda";

export interface VendaDTO {
  cliente: string;
  produto: string;
  quantidade: number;
  valorTotal: number;
  formaPagamento: FormaPagamento;
  statusVenda: StatusVenda;
  statusPagamento: StatusPagamento;
  dataVenda: string;
  observacao?: string;
}
