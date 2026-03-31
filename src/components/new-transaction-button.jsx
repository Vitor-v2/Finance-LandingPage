import { zodResolver } from '@hookform/resolvers/zod'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Loader2Icon, Plus } from 'lucide-react'
import {
  BanknoteArrowDown,
  BanknoteArrowUpIcon,
  ChartNoAxesColumn,
} from 'lucide-react'
import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { Form } from 'react-router'
import { toast } from 'sonner'
import z from 'zod'

import useCreateTransaction from '@/data/api/useCreateTransaction'

import { Button } from './ui/button'
import { DatePickerSimple } from './ui/calendar-pick'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

const ButtonTransaction = () => {
  const [open, setOpen] = useState(false)

  const { mutateAsync: createTransaction } = useCreateTransaction()

  const schema = z.object({
    nameTransaction: z
      .string()
      .min(3, { error: 'A Descrição deve conter no mínimo 3 caracteres' }),
    valueTransaction: z.number({ error: 'Digite um valor válido' }),
    typeTransaction: z.enum(['EARNING', 'INVESTMENT', 'EXPENSE'], {
      error: 'Tipo de transação incorreta',
    }),
    dateTransaction: z.date({ error: 'Não é uma data válida' }),
  })

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nameTransaction: '',
      valueTransaction: '',
      typeTransaction: 'EARNING',
      dateTransaction: '',
    },
  })

  const HandleSubmit = async (data) => {
    try {
      createTransaction(data)
      setOpen(false)
      toast.success('Valor lançado com sucesso')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="submitButton" className="rounded-5">
          Nova transação <Plus />{' '}
        </Button>
      </DialogTrigger>
      <FormProvider {...form}>
        <Form onSubmit={form.handleSubmit(HandleSubmit)} id="newTransaction">
          <DialogContent className="flex flex-col gap-10">
            <DialogHeader>
              <DialogTitle className="text-3xl">Nova transferência</DialogTitle>
              <DialogDescription className="sr-only"></DialogDescription>
            </DialogHeader>
            <FieldGroup className="grid grid-cols-2">
              <Controller
                name="nameTransaction"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="nameTransaction">
                      Descrição da transação
                    </FieldLabel>
                    <Input
                      {...field}
                      id="nameTransaction"
                      placeholder="Descrição da transação"
                      autoComplete="off"
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="valueTransaction"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="valueTransaction">
                      Valor da transação
                    </FieldLabel>
                    <NumericFormat
                      {...field}
                      placeholder="Insira o valor"
                      decimalSeparator=","
                      thousandSeparator="."
                      prefix="R$"
                      allowNegative={false}
                      allowLeadingZeros={true}
                      customInput={Input}
                      //é necessário passar onChange para não utilizar o valor do field (toda vez que alterar o input)
                      onChange={() => {}}
                      onValueChange={(values) =>
                        field.onChange(values.floatValue)
                      }
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="typeTransaction"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="typeTransaction">
                      Tipo da transação
                    </FieldLabel>
                    <Select
                      id="typeTransaction"
                      onValueChange={(value) => {
                        field.onChange(value)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Forma de transação"></SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INVESTMENT">
                          <div className="flex items-center gap-3">
                            {<ChartNoAxesColumn />} <p>Investimentos</p>
                          </div>
                        </SelectItem>
                        <SelectItem value="EARNING">
                          <div className="flex items-center gap-3">
                            {<BanknoteArrowUpIcon />} <p>Ganhos</p>
                          </div>
                        </SelectItem>
                        <SelectItem value="EXPENSE">
                          <div className="flex items-center gap-3">
                            {<BanknoteArrowDown />} <p>Gastos</p>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="dateTransaction"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <DatePickerSimple
                      {...field}
                      id="dateTransaction"
                      name="dateTransaction"
                      label="Data do lançamento"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            <DialogFooter className="grid grid-cols-2 gap-5">
              <DialogClose asChild>
                <Button variant="destructive">Cancelar</Button>
              </DialogClose>
              <Button
                variant="submitButton"
                type="submit"
                form="newTransaction"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2Icon className="animate-spin" />
                ) : null}
                Enviar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Form>
      </FormProvider>
    </Dialog>
  )
}

export default ButtonTransaction
