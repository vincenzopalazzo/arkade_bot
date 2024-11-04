import { prettyLongText, prettyNumber } from '../lib/format'

export const Item = ({ title, body }: { title: string; body: string }) => {
  return (
    <div className='mb-8'>
      <p className='font-bold'>{title}</p>
      <p className=''>{body}</p>
    </div>
  )
}

export interface DetailsProps {
  address?: string
  comment?: string
  invoice?: string
  arknote?: string
  satoshis: number
}

export default function Details({ details }: { details?: DetailsProps }) {
  if (!details) return <></>
  const { address, comment, invoice, arknote, satoshis } = details
  return (
    <div>
      <Item title='Amount' body={`${prettyNumber(satoshis)} sats`} />
      {comment ? <Item title='Comment' body={comment} /> : null}
      {arknote ? <Item title='Arknote' body={prettyLongText(arknote)} /> : null}
      {invoice ? <Item title='Invoice' body={prettyLongText(invoice)} /> : null}
      {address ? <Item title='Address' body={prettyLongText(address)} /> : null}
    </div>
  )
}
