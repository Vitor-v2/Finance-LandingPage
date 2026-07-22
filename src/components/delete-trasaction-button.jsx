import { Trash2Icon } from 'lucide-react'
import { toast } from 'sonner'

import { useDeleteOperation } from '@/forms/hooks/transaction'

import { Button } from './ui/button'

const DeleteTrasactionButton = ({ transaction }) => {
  const { onSubmit } = useDeleteOperation({
    transaction,
    onSucess: (task) => {
      toast.success(`Tarefa "${task.name}" excluido com sucesso`)
    },
    onError: (error) => {
      toast.error(`Não foi possível excluir a tarefa: ${error}`)
    },
  })

  return (
    <Button
      variant="destructive"
      onClick={() => {
        onSubmit()
      }}
    >
      <Trash2Icon /> Deletar
    </Button>
  )
}
export default DeleteTrasactionButton
