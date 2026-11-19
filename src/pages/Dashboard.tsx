import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SalesTable from "@/components/sales/SalesTable";
import { useEffect, useState } from "react";
import { listarVendas } from "@/services/api";
import type { Venda } from "@/types/venda";

function Dashboard() {
  const [vendas, setVendas] = useState<Venda[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarVendas() {
    try {
      const dados = await listarVendas();

      setErro("");
      setVendas(dados);
    } catch (error) {
      console.error("Erro ao carregar vendas:", error);
      setErro("Não foi possível carregar as vendas.");
    } finally {
      setCarregando(false);
    }
  }
  useEffect(() => {
    listarVendas()
      .then((dados) => {
        setErro("");
        setVendas(dados);
      })
      .catch((error) => {
        console.error("Erro ao carregar vendas:", error);
        setErro("Não foi possível carregar as vendas.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  const totalVendas = vendas.length;
  const faturamento = vendas
    .filter((venda) => venda.statusPagamento === "PAGO")
    .reduce((total, venda) => total + venda.valorTotal, 0);
  const pagamentosPendentes = vendas.filter(
    (venda) => venda.statusPagamento === "PENDENTE",
  ).length;
  const encomendas = vendas.filter(
    (venda) =>
      venda.statusVenda === "ENCOMENDADA" || venda.statusVenda === "RESERVADA",
  ).length;

  const indicadores = [
    {
      titulo: "Total de vendas",
      valor: totalVendas.toString(),
      descricao: "Vendas cadastradas",
    },
    {
      titulo: "Faturamento",
      valor: faturamento.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
      descricao: "Total de vendas pagas",
    },
    {
      titulo: "Pagamentos pendentes",
      valor: pagamentosPendentes.toString(),
      descricao: "Vendas aguardando pagamento",
    },
    {
      titulo: "Encomendas",
      valor: encomendas.toString(),
      descricao: "Vendas reservadas ou encomendadas",
    },
  ];

  return (
    <section className="space-y-8">
      <div>
        <h2 className="font-heading text-4xl font-semibold text-primary">
          Gestão de Vendas
        </h2>

        <p className="mt-2 text-muted-foreground">
          Acompanhe e gerencie as vendas da Douceur.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {indicadores.map((indicador) => (
          <Card key={indicador.titulo}>
            <CardHeader>
              <CardTitle className="font-sans">{indicador.titulo}</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-semibold text-primary">
                {indicador.valor}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {indicador.descricao}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <SalesTable
        vendas={vendas}
        carregando={carregando}
        erro={erro}
        onRefresh={carregarVendas}
      />
    </section>
  );
}

export default Dashboard;
