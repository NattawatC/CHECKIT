import Link from 'next/link'

interface UpcomingTaskProps {
  taskNum: number
  href: string
}

export const UpcomingTask: React.FunctionComponent<UpcomingTaskProps> = ({
  taskNum,
  href,
}) => {
  return (
    <button className="w-full h-full bg-custom-white p-2 rounded-lg flex-col justify-center items-center gap-1 inline-flex">
      <Link href={`${href}`}>
        <div className="text-custom-black text-base font-medium break-words lg:text-2xl">
          Upcoming
        </div>
        <div className="text-custom-black text-base font-medium break-words lg:text-2xl">
          {taskNum} Tasks
        </div>
      </Link>
    </button>
  )
}
