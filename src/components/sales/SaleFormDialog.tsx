import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { FormEvent } from "react";
import type { VendaDTO } from "@/types/venda.dto";
import { cadastrarVenda } from "@/services/api";
import { toast } from "sonner";

interface SaleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

function SaleFormDialog({
  open,
  onOpenChange,
  onSuccess,
}: SaleFormDialogProps) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const dados: VendaDTO = {
      cliente: String(formData.get("cliente")),
      produto: String(formData.get("produto")),
      quantidade: Number(formData.get("quantidade")),
      valorTotal: Number(formData.get("valorTotal")),
      formaPagamento: formData.get(
        "formaPagamento",
      ) as VendaDTO["formaPagamento"],
      statusVenda: formData.get("statusVenda") as VendaDTO["statusVenda"],
      statusPagamento: formData.get(
        "statusPagamento",
      ) as VendaDTO["statusPagamento"],
      dataVenda: String(formData.get("dataVenda")),
      observacao: String(formData.get("observacao") ?? "").trim() || undefined,
    };

    try {
      await cadastrarVenda(dados);

      toast.success("Venda cadastrada com sucesso!");

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao cadastrar venda:", error);
      toast.error("Não foi possível cadastrar a venda.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-semibold text-xl">
            Nova venda
          </DialogTitle>

          <DialogDescription>
            Preencha os dados abaixo para cadastrar uma nova venda.
          </DialogDescription>
        </DialogHeader>

        <form id="sale-form" className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cliente">Nome do cliente</Label>
              <Input
                id="cliente"
                name="cliente"
                placeholder="Digite o nome do cliente"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="produto">Produto</Label>
              <Input
                id="produto"
                name="produto"
                placeholder="Digite o nome do produto"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantidade">Quantidade</Label>
              <Input
                id="quantidade"
                name="quantidade"
                type="number"
                min="1"
                placeholder="Digite a quantidade"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorTotal">Valor total (R$)</Label>
              <Input
                id="valorTotal"
                name="valorTotal"
                type="number"
                min="0.01"
                step="0.01"
                placeholder="0,00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="formaPagamento">Forma de pagamento</Label>
              <select
                id="formaPagamento"
                name="formaPagamento"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Selecione a forma de pagamento
                </option>
                <option value="PIX">PIX</option>
                <option value="DINHEIRO">Dinheiro</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="statusVenda">Status da venda</Label>
              <select
                id="statusVenda"
                name="statusVenda"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Selecione o status da venda
                </option>
                <option value="RESERVADA">Reservada</option>
                <option value="ENCOMENDADA">Encomendada</option>
                <option value="ENTREGUE">Entregue</option>
                <option value="CANCELADA">Cancelada</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="statusPagamento">Status do pagamento</Label>
              <select
                id="statusPagamento"
                name="statusPagamento"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Selecione o status do pagamento
                </option>
                <option value="PAGO">Pago</option>
                <option value="PENDENTE">Pendente</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataVenda">Data da venda</Label>
              <Input id="dataVenda" name="dataVenda" type="date" required />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="observacao">Observações</Label>
              <Textarea
                id="observacao"
                name="observacao"
                placeholder="Adicione alguma observação sobre a venda (opcional)"
                rows={3}
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>

          <Button type="submit" form="sale-form">
            Cadastrar venda
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SaleFormDialog;
