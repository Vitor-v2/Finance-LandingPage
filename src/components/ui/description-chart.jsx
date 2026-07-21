import { cva } from 'class-variance-authority'

const variants = cva('rounded-xs flex h-3 w-3 shrink-0', {
  variants: {
    variant: {
      green: 'bg-green-500',
      red: 'bg-red-500',
      blue: 'bg-blue-500',
    },
  },
  defaultVariants: 'green',
})

const DescriptionChart = ({ description, variant }) => {
  return (
    <div className="flex items-center gap-2">
      <span className={variants({ variant })} />
      {description}
    </div>
  )
}

export default DescriptionChart
