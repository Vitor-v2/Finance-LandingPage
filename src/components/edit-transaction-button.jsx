import { Loader2Icon } from 'lucide-react'
import {
  BanknoteArrowDown,
  BanknoteArrowUpIcon,
  ChartNoAxesColumn,
} from 'lucide-react'
import { PenLine } from 'lucide-react'
import { Controller, FormProvider } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import { Form } from 'react-router'
import { toast } from 'sonner'

import { useValidateUpdate } from '@/forms/hooks/transaction'

import { Button } from './ui/button'
import { DatePickerSimple } from './ui/calendar-pick'
import { Field, FieldError, FieldGroup, FieldLabel } from './ui/field'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'

const EditTransactionButton = ({ transaction }) => {
  const { form, onSubmit: updateData } = useValidateUpdate({
    transaction,
    onSucess: () => {
      toast.success('Valor alterado com sucesso')
    },
    onError: () => {
      toast.error('Algo deu errado')
    },
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-transparent">
          <PenLine className="text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetTitle>Editar Transação</SheetTitle>

        <FormProvider {...form}>
          <Form onSubmit={form.handleSubmit(updateData)} id="editTransaction">
            <FieldGroup>
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
                      //├® necess├írio passar onChange para n├úo utilizar o valor do field (toda vez que alterar o input)
                      onChange={() => {}}
                      onValueChange={(values) => {
                        field.onChange(values.floatValue)
                      }}
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
                      defaultValue={transaction?.type}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Forma de transação" />
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
              <div className="flex gap-3">
                <SheetClose asChild>
                  <Button
                    variant="submitButton"
                    type="submit"
                    form="editTransaction"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <Loader2Icon className="animate-spin" />
                    ) : null}
                    Enviar
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button variant="destructive" form="editTransaction">
                    Cancelar
                  </Button>
                </SheetClose>
              </div>
            </FieldGroup>
          </Form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  )
}

export default EditTransactionButton
