export type FormaPagamento = "PIX" | "DINHEIRO";

export type StatusVenda =
  | "RESERVADA"
  | "ENCOMENDADA"
  | "ENTREGUE"
  | "CANCELADA";

export type StatusPagamento = "PAGO" | "PENDENTE";

export interface Venda {
  id: number;
  cliente: string;
  produto: string;
  quantidade: number;
  valorTotal: number;
  formaPagamento: FormaPagamento;
  statusVenda: StatusVenda;
  statusPagamento: StatusPagamento;
  dataVenda: string;
  observacao: string | null;
  createdAt: string;
  updatedAt: string;
}
