import Footer from '@/components/common/Footer'
import Card from '@/components/home/Card'
import { MainLayout } from '@/components/layouts'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { FaGithubSquare } from 'react-icons/fa'
import logoMobile from 'src/assets/logoMobile.png'
import { FaSquareEnvelope } from 'react-icons/fa6'
import Link from 'next/link'

const features = [
  {
    title: 'User Friendly',
    description: 'Easy to use for people who are either new or professional',
  },
  {
    title: 'Trusted App',
    description: 'Official application that is trusted for security',
  },
  {
    title: 'Sharing',
    description: 'Share your task between your besties',
  },
  {
    title: '100% Free',
    description: 'This application is completely free, without any charges',
  },
]

export default function Home() {
  return (
    <>
      <MainLayout className="bg-custom-black">
        <div className=" flex flex-col items-center gap-9">
          <Image src={logoMobile} alt="logo mobile" />
          <p className="text-custom-white text-center">
            Gorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra,
          </p>
          <Link href="/login">
            <Button className="bg-custom-orange text-custom-white">
              Get Started
            </Button>
          </Link>
        </div>
      </MainLayout>

      <section className="py-9 flex flex-col gap-9 px-6">
        <div className="flex flex-col items-center gap-3">
          <p className="text-center text-base">- Features -</p>
          <p className="text-center text-2xl">Our Special Features</p>
        </div>
        <div className="flex flex-col gap-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      <MainLayout className=" bg-custom-black">
        <div className=" flex flex-col items-center gap-9">
          <p className="text-custom-white text-center text-xl">How it works?</p>
          <p className="text-custom-white text-center text-base">
            Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra.
          </p>
        </div>
      </MainLayout>

      <MainLayout>
        <div className="flex flex-col items-center gap-6">
          <p className="text-xl text-center">CHECKIT</p>
          <p className="text-base text-center flex flex-row">
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
      <Footer />
    </>
  )
}
