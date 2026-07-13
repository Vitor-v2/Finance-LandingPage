import z from 'zod'

export const newTransactionSchema = z.object({
  nameTransaction: z
    .string({ error: 'Preencha o campo corretamente' })
    .trim()
    .min(1, { error: 'Preencha o campo corretamente' }),
  valueTransaction: z.number({ error: 'Digite um valor válido' }),
  typeTransaction: z.enum(['INVESTMENT', 'EARNING', 'EXPENSE'], {
    error: 'O campo não pode ser vazio',
  }),
  dateTransaction: z.date({ error: 'Digite uma data válida' }),
})

export const schemaUpdate = newTransactionSchema.extend({
  id: z.string({ error: 'id fornecido não válido' }),
})
