import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function SalesTable() {
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
          <CardTitle className="font-headind text-primary px-2">Lista de vendas</CardTitle>
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
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-12 text-center text-muted-foreground"
                  >
                    As vendas aparecerão aqui quando conectarmos a API.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default SalesTable;
