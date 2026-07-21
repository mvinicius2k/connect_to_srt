import styles from '@/components/ui/loading/BouncingLoading.module.css'
import { BoundingLoadingProps } from '@/components/ui/loading/shared'
import clsx from 'clsx'



export default function BouncingLoading({...props} : BoundingLoadingProps) {
  return (<div {...props} className={clsx(styles.loader, 'h-12', props.className)}></div>)
}
