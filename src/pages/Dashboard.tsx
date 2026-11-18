import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SalesTable from "@/components/sales/SalesTable"

const indicadores = [
  {
    titulo: "Total de vendas",
    valor: "—",
    descricao: "Vendas cadastradas",
  },
  {
    titulo: "Faturamento",
    valor: "—",
    descricao: "Valor total das vendas",
  },
  {
    titulo: "Pagamentos pendentes",
    valor: "—",
    descricao: "Vendas aguardando pagamento",
  },
  {
    titulo: "Encomendas",
    valor: "—",
    descricao: "Vendas em andamento",
  },
];

function Dashboard() {
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
              <CardTitle className="font-headind">{indicador.titulo}</CardTitle>
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
      <SalesTable />
    </section>
  );
}

export default Dashboard;
