import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Tailwind is Working 🎉
      </h1>
    </div>
  );
}
