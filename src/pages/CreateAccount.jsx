import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Controller, Form, FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router'
import { toast } from 'sonner'
import z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import InputPassword from '@/components/ui/password-input'
import { api } from '@/lib/axios'

const CreateAccount = () => {
  const singUpMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await api.post('/users', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      })
      return response.data
    },
  })

  const schema = z
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

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
    },
    mode: 'onBlur',
  })

  const handleSubmitData = (data) => {
    singUpMutation.mutate(data, {
      onSuccess: (createdUser) => {
        const accessToken = createdUser.tokens.accessToken
        const refreshToken = createdUser.tokens.refreshToken
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('refreshToken', refreshToken)
        toast.success('usuário criado com sucesso')
      },
      onError: () => toast.error('Houve um erro, usuário não criado'),
    })
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col gap-3">
        <FormProvider {...methods}>
          <Form onSubmit={methods.handleSubmit(handleSubmitData)}>
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle>Criar conta</CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo para criar a sua conta
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Controller
                    name="firstName"
                    control={methods.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="firstName">Nome</FieldLabel>
                        <Input
                          id="firstName"
                          placeholder="Digite seu nome"
                          autoComplete="off"
                          {...field}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={methods.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="lastName">Sobrenome</FieldLabel>
                        <Input
                          id="lastName"
                          placeholder="Digite seu sobrenome"
                          autoComplete="off"
                          {...field}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="email"
                    control={methods.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                          {...field}
                          id="email"
                          placeholder="Digite seu email"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="password"
                    control={methods.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                        <InputPassword
                          {...field}
                          id="password"
                          placeholder="Digite sua senha"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="confirmPassword"
                    control={methods.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="confirmPassword">
                          Confirmar senha
                        </FieldLabel>
                        <InputPassword
                          {...field}
                          id="confirmPassword"
                          placeholder="Confirme sua senha"
                          autoComplete="off"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <div className="mt-2 flex content-center items-center gap-4">
                  <Controller
                    name="terms"
                    control={methods.control}
                    render={({ field }) => {
                      return (
                        <FieldGroup>
                          <Field>
                            <div className={`flex items-center gap-5`}>
                              <Checkbox
                                id="terms"
                                name="terms"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                              <FieldDescription
                                htmlFor="terms"
                                className="text-inherit"
                              >
                                Ao clicar em “Criar conta”, você aceita nosso{' '}
                                <a href="#" className="text-green-300">
                                  termo de uso e política de privacidade
                                </a>
                              </FieldDescription>
                            </div>
                            {methods.formState.errors.terms?.message ? (
                              <FieldError>
                                {methods.formState.errors.terms.message}
                              </FieldError>
                            ) : null}
                          </Field>
                        </FieldGroup>
                      )
                    }}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button type="submit" variant="submitButton" className="w-full">
                  Criar conta
                </Button>
              </CardFooter>
            </Card>
          </Form>
        </FormProvider>
        <div className="text-center">
          <p className="text-xs">
            Já possui conta?
            <Button variant="link" asChild>
              <Link to="/Login" className="text-xs">
                Faça login
              </Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount
