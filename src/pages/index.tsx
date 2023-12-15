import Image from 'next/image'
import { Inter } from 'next/font/google'
import MultiStepForm from '../components/MultiStepForm';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col p-24 ${inter.className}`}
    >
      <h1 className="text-2xl font-bold mb-4">Evoke Adventure Generator</h1>
      <div className="container mx-auto p-4">
            <MultiStepForm />
        </div>
    </main>
  )
}
