interface FooterProps {
  className: string
  isHidden?: boolean
}

export const Footer: React.FunctionComponent<FooterProps> = ({ className, isHidden }) => {
  return (
      <footer className={`flex flex-col gap-6 items-center justify-center mt-auto py-4 ${isHidden ? 'lg:hidden' : ''}`}>
        <div className={`w-[140px] block h-px bg-neutral-500 ${className}`}></div>
        <p
          className={`flex items-center justify-center text-base ${className}`}
        >
          All rights reserves @Checkit.co
        </p>
      </footer>
  )
}
