import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Form, Link } from 'react-router'
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
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import InputPassword from '@/components/ui/password-input'

const SingUp = () => {
  const schema = z.object({
    email: z.email({ error: 'Formato de email inválido' }).trim(),
    password: z
      .string()
      .trim()
      .nonempty({ error: 'A senha não pode ser vazia' }),
  })

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmitData = (data) => {
    console.log(data)
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col gap-3">
        <Form onSubmit={methods.handleSubmit(handleSubmitData)}>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Entre na sua conta</CardTitle>
              <CardDescription>
                Insira seu email abaixo para entrar na sua conta
              </CardDescription>
            </CardHeader>
            <FormProvider {...methods}>
              <CardContent className="grid gap-4">
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
                      <div className="flex items-center justify-between">
                        <FieldLabel htmlFor="password">Senha</FieldLabel>
                        <Button variant="link" className="relative p-0" asChild>
                          <Link
                            to="#"
                            className="absolute right-0 top-3 text-xs"
                          >
                            Esqueceu a senha?
                          </Link>
                        </Button>
                      </div>
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
              </CardContent>
            </FormProvider>
            <CardFooter className="flex-col gap-2">
              <Button variant="submitButton" className="w-full bg-submitButton">
                Entrar
              </Button>
              <Button variant="outline" className="w-full">
                Entre com o Google
              </Button>
            </CardFooter>
          </Card>
        </Form>
        <div className="text-center">
          <p className="text-xs">
            Possui conta?
            <Button variant="link" asChild>
              <Link to="/Create" className="text-xs">
                Registre-se aqui
              </Link>
            </Button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SingUp
