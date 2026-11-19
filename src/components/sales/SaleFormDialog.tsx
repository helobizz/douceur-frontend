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
import { useState } from "react";
import type { FormEvent } from "react";
import type { VendaDTO } from "@/types/venda.dto";
import type { Venda } from "@/types/venda";
import { atualizarVenda, cadastrarVenda } from "@/services/api";
import { toast } from "sonner";

interface SaleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  venda?: Venda | null;
}

interface VendaFormState {
  cliente: string;
  produto: string;
  quantidade: string;
  valorTotal: string;
  formaPagamento: VendaDTO["formaPagamento"] | "";
  statusVenda: VendaDTO["statusVenda"] | "";
  statusPagamento: VendaDTO["statusPagamento"] | "";
  dataVenda: string;
  observacao: string;
}

function obterValoresIniciais(venda?: Venda | null): VendaFormState {
  return {
    cliente: venda?.cliente ?? "",
    produto: venda?.produto ?? "",
    quantidade: venda?.quantidade.toString() ?? "",
    valorTotal: venda?.valorTotal.toString() ?? "",
    formaPagamento: venda?.formaPagamento ?? "",
    statusVenda: venda?.statusVenda ?? "",
    statusPagamento: venda?.statusPagamento ?? "",
    dataVenda: venda?.dataVenda.slice(0, 10) ?? "",
    observacao: venda?.observacao ?? "",
  };
}

function SaleFormDialog({
  open,
  onOpenChange,
  onSuccess,
  venda,
}: SaleFormDialogProps) {
  const [formulario, setFormulario] = useState<VendaFormState>(() =>
    obterValoresIniciais(venda),
  );
  const [salvando, setSalvando] = useState(false);

  function atualizarCampo<K extends keyof VendaFormState>(
    campo: K,
    valor: VendaFormState[K],
  ) {
    setFormulario((estadoAtual) => ({
      ...estadoAtual,
      [campo]: valor,
    }));
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (salvando) return;

    setSalvando(true);

    const dados: VendaDTO = {
      cliente: formulario.cliente,
      produto: formulario.produto,
      quantidade: Number(formulario.quantidade),
      valorTotal: Number(formulario.valorTotal),
      formaPagamento: formulario.formaPagamento as VendaDTO["formaPagamento"],
      statusVenda: formulario.statusVenda as VendaDTO["statusVenda"],
      statusPagamento:
        formulario.statusPagamento as VendaDTO["statusPagamento"],
      dataVenda: formulario.dataVenda,
      observacao: formulario.observacao.trim() || undefined,
    };

    try {
      if (venda) {
        await atualizarVenda(venda.id, dados);
        toast.success("Venda atualizada com sucesso!");
      } else {
        await cadastrarVenda(dados);
        toast.success("Venda cadastrada com sucesso!");
      }

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao salvar venda:", error);

      toast.error(
        venda
          ? "Não foi possível atualizar a venda."
          : "Não foi possível cadastrar a venda.",
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-semibold text-xl">
            {venda ? "Editar venda" : "Nova venda"}
          </DialogTitle>

          <DialogDescription>
            {venda
              ? "Altere os dados da venda selecionada."
              : "Preencha os dados abaixo para cadastrar uma nova venda."}
          </DialogDescription>
        </DialogHeader>

        <form
          key={venda?.id ?? "nova"}
          id="sale-form"
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cliente">Nome do cliente</Label>
              <Input
                id="cliente"
                name="cliente"
                placeholder="Digite o nome do cliente"
                value={formulario.cliente}
                onChange={(event) =>
                  atualizarCampo("cliente", event.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="produto">Produto</Label>
              <Input
                id="produto"
                name="produto"
                placeholder="Digite o nome do produto"
                value={formulario.produto}
                onChange={(event) =>
                  atualizarCampo("produto", event.target.value)
                }
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
                value={formulario.quantidade}
                onChange={(event) =>
                  atualizarCampo("quantidade", event.target.value)
                }
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
                value={formulario.valorTotal}
                onChange={(event) =>
                  atualizarCampo("valorTotal", event.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="formaPagamento">Forma de pagamento</Label>
              <select
                id="formaPagamento"
                name="formaPagamento"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={formulario.formaPagamento}
                onChange={(event) =>
                  atualizarCampo(
                    "formaPagamento",
                    event.target.value as VendaFormState["formaPagamento"],
                  )
                }
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
                value={formulario.statusVenda}
                onChange={(event) =>
                  atualizarCampo(
                    "statusVenda",
                    event.target.value as VendaFormState["statusVenda"],
                  )
                }
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
                value={formulario.statusPagamento}
                onChange={(event) =>
                  atualizarCampo(
                    "statusPagamento",
                    event.target.value as VendaFormState["statusPagamento"],
                  )
                }
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
              <Input
                id="dataVenda"
                name="dataVenda"
                type="date"
                value={formulario.dataVenda}
                onChange={(event) =>
                  atualizarCampo("dataVenda", event.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="observacao">Observações</Label>
              <Textarea
                id="observacao"
                name="observacao"
                placeholder="Adicione alguma observação sobre a venda (opcional)"
                value={formulario.observacao}
                onChange={(event) =>
                  atualizarCampo("observacao", event.target.value)
                }
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

          <Button type="submit" form="sale-form" disabled={salvando}>
            {salvando
              ? "Salvando..."
              : venda
                ? "Salvar alterações"
                : "Cadastrar venda"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SaleFormDialog;
