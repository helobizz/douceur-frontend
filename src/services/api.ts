import type { Venda } from "@/types/venda";
import type { VendaDTO } from "@/types/venda.dto";

const API_URL = import.meta.env.VITE_API_URL;

export async function listarVendas(): Promise<Venda[]> {
  const response = await fetch(`${API_URL}/vendas`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar as vendas.");
  }

  return response.json() as Promise<Venda[]>;
}

export async function cadastrarVenda(dados: VendaDTO): Promise<Venda> {
  const response = await fetch(`${API_URL}/vendas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    throw new Error("Não foi possível cadastrar a venda.");
  }

  return response.json() as Promise<Venda>;
}

export async function atualizarVenda(
  id: number,
  dados: VendaDTO,
): Promise<Venda> {
  const response = await fetch(`${API_URL}/vendas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    throw new Error("Não foi possível atualizar a venda.");
  }

  return response.json() as Promise<Venda>;
}

export async function excluirVenda(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/vendas/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Não foi possível excluir a venda.");
  }
}
