interface TitleProps {
  subtext?: string
  text: string
}

export default function Title({ subtext, text }: TitleProps) {
  return (
    <>
      <h1>{text}</h1>
      {subtext ? <h2>{subtext}</h2> : null}
    </>
  )
}
