interface FooterProps {
  className: string
}

export const Footer: React.FunctionComponent<FooterProps> = ({ className }) => {
  return (
    <footer className="flex flex-col gap-6 items-center justify-center px-4 pt-14 pb-4">
      <div className={`w-[140px] block h-px bg-neutral-500`}></div>
      <p className={`flex items-center justify-center text-base ${className}`}>
        All rights reserves @Checkit.co
      </p>
    </footer>
  )
}
