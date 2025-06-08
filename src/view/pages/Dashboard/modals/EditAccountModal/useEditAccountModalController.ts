import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import toast from "react-hot-toast";
import { UpdateBankAccountParams } from "../../../../../app/services/bankAccountsService/update";
import { useState } from "react";

const schema = z.object({
  initialBalance: z.union([
    z.string().min(1, { message: "Saldo inicial é obrigatório" }),
    z.number().min(0, { message: "Saldo inicial não pode ser negativo" })
  ]),
  name: z.string().min(1, { message: "Nome da conta é obrigatório" }),
  type: z.enum(['CHECKING', 'INVESTMENT', 'CASH']),
  color: z.string().min(1, { message: "Cor é obrigatória" })
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    accountBeingEdited,
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialBalance: accountBeingEdited?.initialBalance,
      name: accountBeingEdited?.name || '',
      type: accountBeingEdited?.type || 'CHECKING',
      color: accountBeingEdited?.color || '',
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();
  const { isPending: isLoading, mutateAsync: updateAccount } = useMutation({
    mutationFn: async (data: UpdateBankAccountParams) => {
      return bankAccountsService.update(data)
    },
  });

  const { isPending: isLoadingDelete, mutateAsync: removeAccount } = useMutation({
    mutationFn: async (bankAccountId: string) => {
      return bankAccountsService.remove(bankAccountId)
    },
  });

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await updateAccount({
        ...data,
        initialBalance: currencyStringToNumber(data.initialBalance),
        //Non-null assertion
        id: accountBeingEdited!.id,
      });

      queryClient.invalidateQueries({ queryKey: ['banckAccounts'] });
      toast.success('A conta foi atualizada com sucesso!');
      closeEditAccountModal();
    } catch {
      toast.error('Erro ao salvar as alterações :(');
    }
  });

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: ['banckAccounts'] });
      toast.success('A conta foi deletada com sucesso!');
      closeEditAccountModal();
    } catch {
      toast.error('Erro ao deletar a conta :(');
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingDelete
  };
}
