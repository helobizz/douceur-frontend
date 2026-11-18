import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import SaleFormDialog from "@/components/sales/SaleFormDialog";
import { listarVendas } from "@/services/api";
import type { Venda } from "@/types/venda";

function SalesTable() {
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [dialogAberto, setDialogAberto] = useState(false);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    listarVendas()
      .then((dados) => {
        setVendas(dados);
      })
      .catch((error) => {
        setErro("Não foi possível carregar as vendas.");
        console.error("Erro ao buscar vendas:", error);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  async function listarVendasAtualizadas() {
    try {
      const dados = await listarVendas();
      setVendas(dados);
    } catch (error) {
      setErro("Não foi possível atualizar a lista de vendas.");
      console.error("Erro ao atualizar vendas:", error);
    }
  }

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
        <CardHeader>
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
                onClick={() => setDialogAberto(true)}
              >
                <Plus size={18} />
                Nova venda
              </Button>
            </div>
          </CardHeader>
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
                ) : vendas.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-muted-foreground"
                    >
                      Nenhuma venda cadastrada.
                    </td>
                  </tr>
                ) : (
                  vendas.map((venda) => (
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
                      <td className="px-4 py-3">—</td>
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
        onSuccess={listarVendasAtualizadas}
      />
    </section>
  );
}

export default SalesTable;
