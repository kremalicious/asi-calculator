import { SelectHTMLAttributes } from 'react'
import styles from './Select.module.css'
import { CaretDownIcon } from '@radix-ui/react-icons'

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  options: { value: string; label: string }[]
}

export function Select({ options, ...rest }: Props) {
  return (
    <span className={styles.selectWrapper}>
      <select className={styles.select} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {options.length > 1 ? <CaretDownIcon className={styles.icon} /> : null}
    </span>
  )
}
