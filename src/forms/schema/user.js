import z from 'zod'

export const loginSchema = z.object({
  email: z.email({ error: 'Formato de email inválido' }).trim(),
  password: z.string().trim().nonempty({ error: 'A senha não pode ser vazia' }),
})

export const singUpSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(3, { error: 'Coloque um nome válido' })
      .max(30),
    lastName: z
      .string()
      .trim()
      .min(3, { error: 'Coloque um sobrenome válido' })
      .max(30),
    email: z.email({ error: 'Digite um email válido' }).trim(),
    password: z
      .string()
      .trim()
      .min(6, { error: 'senha deve conter no mínimo 6 caracteres' }),
    confirmPassword: z
      .string()
      .trim()
      .min(6, { error: 'verifique novamente a senha digitada.' }),
    terms: z.boolean().refine((value) => value === true, {
      error: 'É necessário que aceite os termos',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: 'Senhas estão diferentes',
    path: ['confirmPassword'],
  })
