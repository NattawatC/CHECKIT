import howitworkPic from '@/assets/howitworkPic.jpg'
import { Hamburger } from '@/components/common'
import { Footer } from '@/components/common/Footer'
import Card from '@/components/home/Card'
import { MainLayout } from '@/components/layouts'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { BsArrowRightShort, BsFileEarmarkPersonFill } from 'react-icons/bs'
import { FaGithubSquare } from 'react-icons/fa'
import { FaHandHoldingHeart, FaSquareEnvelope } from 'react-icons/fa6'
import { GoShare } from 'react-icons/go'
import { LuBadgePercent } from 'react-icons/lu'
import logoMobile from 'src/assets/logoMobile.png'

const features = [
  {
    icon: BsFileEarmarkPersonFill,
    title: 'User Friendly',
    description: 'Easy to use for people who are either new or professional',
  },
  {
    icon: FaHandHoldingHeart,
    title: 'Trusted App',
    description: 'Official application that is trusted for security',
  },
  {
    icon: GoShare,
    title: 'Sharing',
    description: 'Share your task between your besties',
  },
  {
    icon: LuBadgePercent,
    title: '100% Free',
    description: 'This application is completely free, without any charges',
  },
]

export default function Home() {
  return (
    <>
      {/* Mobile */}
      <div className="px-4 py-2 float-right lg:hidden">
        <Hamburger className="text-custom-white" />
      </div>
      <div className="flex p-5 float-right">
        <Link href="/login">
          <button className="hidden lg:block rounded-md py-1 px-5 bg-custom-white text-custom-black hover:bg-custom-orange hover:text-custom-white ">
            Login
          </button>
        </Link>
      </div>
      {/* Desktop */}
      <div className="bg-custom-black">
        <MainLayout>
          <div className=" flex flex-col lg:justify-center gap-9 lg:gap-14">
            <Image
              src={logoMobile}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto"
              alt="logo mobile"
            />
            <p className="text-custom-white text-center text-base lg:text-xl">
              Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra,
            </p>
            <Link href="/register">
              <Button className="py-3 px-4 w-full inline-flex bg-custom-orange text-custom-white text-base rounded-md lg:text-2xl hover:bg-custom-orangeHover">
                Get Started <BsArrowRightShort size={30} />
              </Button>
            </Link>
          </div>
        </MainLayout>
      </div>

      <section className="flex flex-col px-6 py-9 gap-9 lg:py-32">
        <div className="flex flex-col items-center gap-3">
          <p className="text-center text-base lg:text-2xl">- Features -</p>
          <p className="text-center text-2xl lg:text-3xl">
            Our Special Features
          </p>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:justify-center lg:gap-16">
          {features.map((feature) => (
            <Card
              key={feature.title}
              title={feature.title}
              description={feature.description}
              Icon={feature.icon}
            />
          ))}
        </div>
      </section>

      <div className="flex flex-row bg-black items-center justify-between">
        <div className="relative hidden lg:block">
          <Image
            src={howitworkPic}
            width={500}
            objectFit="contain"
            alt="logo mobile"
          />
        </div>
        {/* Mobile*/}
        <MainLayout className="flex lg:hidden">
          <div className="flex flex-col gap-9 items-center lg:justify-center">
            <p className="flex text-custom-white text-xl lg:text-4xl">
              How does it work?
            </p>
            <p className="text-custom-white text-center text-base lg:text-justify lg:text-xl">
              Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra.
            </p>
          </div>
        </MainLayout>
        {/* Desktop */}
        <div className="hidden lg:block px-20 py-14 mx-0 w-full">
          <div className="flex flex-col gap-9 justify-center">
            <p className="flex text-custom-white lg:text-4xl">
              How does it work?
            </p>
            <p className="text-custom-white lg:text-justify lg:text-xl">
              Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra.
            </p>
          </div>
        </div>
      </div>

      <MainLayout>
        <div className="flex flex-col items-center gap-6">
          <p className="text-xl text-bold lg:text-2xl">CHECKIT</p>
          <p className="text-base text-center flex flex-row lg:text-xl">
            Use the shortest possible time to create tasks, use all the free
            features to make the most of them.
          </p>
          <div className="flex flex-row gap-4">
            <Link href="https://github.com/NattawatC/checkit">
              <FaGithubSquare className="w-12 h-12" />
            </Link>
            <FaSquareEnvelope className="w-12 h-12" />
            <FaGithubSquare className="w-12 h-12" />
          </div>
        </div>
      </MainLayout>
      <Footer className="text-custom-black" />
    </>
  )
}
