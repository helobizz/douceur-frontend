import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SaleFormDialog from "@/components/sales/SaleFormDialog";
import { excluirVenda } from "@/services/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Venda } from "@/types/venda";
import { toast } from "sonner";

interface SalesTableProps {
  vendas: Venda[];
  carregando: boolean;
  erro: string;
  onRefresh: () => Promise<void>;
}

function SalesTable({ vendas, carregando, erro, onRefresh }: SalesTableProps) {
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [dialogAberto, setDialogAberto] = useState(false);
  const [vendaSelecionada, setVendaSelecionada] = useState<Venda | null>(null);
  const [vendaParaExcluir, setVendaParaExcluir] = useState<Venda | null>(null);

  function abrirEdicao(venda: Venda) {
    setVendaSelecionada(venda);
    setDialogAberto(true);
  }

  async function confirmarExclusao() {
    if (!vendaParaExcluir) return;

    try {
      await excluirVenda(vendaParaExcluir.id);

      toast.success("Venda excluída com sucesso!");

      setVendaParaExcluir(null);
      await onRefresh();
    } catch (error) {
      console.error("Erro ao excluir venda:", error);
      toast.error("Não foi possível excluir a venda.");
    }
  }

  const vendasFiltradas = vendas.filter((venda) => {
    const termo = termoPesquisa.trim().toLocaleLowerCase();

    return (
      venda.cliente.toLocaleLowerCase().includes(termo) ||
      venda.produto.toLocaleLowerCase().includes(termo)
    );
  });

  return (
    <section className="space-y-4">
      <div>
        <h3 className="font-heading text-2xl font-semibold text-primary">
          Vendas recentes
        </h3>

        <p className="text-sm text-muted-foreground">
          Consulte e gerencie as vendas cadastradas.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="font-sans text-primary">
            Lista de vendas
          </CardTitle>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <div className="relative w-full sm:max-w-xs">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                type="text"
                placeholder="Pesquisar vendas..."
                className="h-10 pl-10"
                value={termoPesquisa}
                onChange={(event) => setTermoPesquisa(event.target.value)}
              />
            </div>

            <Button
              className="h-10 gap-2"
              onClick={() => {
                setVendaSelecionada(null);
                setDialogAberto(true);
              }}
            >
              <Plus size={18} />
              Nova venda
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Cliente</th>
                  <th className="px-4 py-3 font-medium">Produto</th>
                  <th className="px-4 py-3 font-medium">Quantidade</th>
                  <th className="px-4 py-3 font-medium">Valor total</th>
                  <th className="px-4 py-3 font-medium">Pagamento</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Ações</th>
                </tr>
              </thead>

              <tbody>
                {carregando ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-muted-foreground"
                    >
                      Carregando vendas...
                    </td>
                  </tr>
                ) : erro ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-destructive"
                    >
                      {erro}
                    </td>
                  </tr>
                ) : vendasFiltradas.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-muted-foreground"
                    >
                      {termoPesquisa.trim()
                        ? "Nenhuma venda encontrada para essa pesquisa."
                        : "Nenhuma venda cadastrada."}
                    </td>
                  </tr>
                ) : (
                  vendasFiltradas.map((venda) => (
                    <tr key={venda.id} className="border-b border-border">
                      <td className="px-4 py-3">{venda.cliente}</td>
                      <td className="px-4 py-3">{venda.produto}</td>
                      <td className="px-4 py-3">{venda.quantidade}</td>
                      <td className="px-4 py-3">
                        {venda.valorTotal.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td className="px-4 py-3">{venda.formaPagamento}</td>
                      <td className="px-4 py-3">
                        {venda.statusVenda} · {venda.statusPagamento}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => abrirEdicao(venda)}
                          >
                            <Pencil size={18} />
                          </Button>

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setVendaParaExcluir(venda)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      <SaleFormDialog
        open={dialogAberto}
        onOpenChange={setDialogAberto}
        onSuccess={onRefresh}
        venda={vendaSelecionada}
      />

      <AlertDialog
        open={!!vendaParaExcluir}
        onOpenChange={(open) => {
          if (!open) setVendaParaExcluir(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-semibold">
              Excluir venda?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza de que deseja excluir a venda de{" "}
              <strong>{vendaParaExcluir?.cliente}</strong>? Esta ação não poderá
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmarExclusao}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

export default SalesTable;
