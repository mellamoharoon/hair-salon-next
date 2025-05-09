import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

interface StylistProps {
  stylist: {
    id: string
    name: string
    role: string
    bio: string
    image: string
  }
}

const StylistCard = ({ stylist }: StylistProps) => {
  return (
    <Card className="overflow-hidden border-0 subtle-shadow transition-all duration-300 hover:translate-y-[-5px]">
      <div className="relative h-72">
        <Image
          src={stylist.image}
          alt={stylist.name}
          fill
          // className="object-conatain"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-serif font-medium">{stylist.name}</h3>
        <p className="text-salon-500 mb-3">{stylist.role}</p>
        <p className="text-salon-600 mb-4">{stylist.bio}</p>
        <Link 
          href={`/stylists/${stylist.id}`}
          className="inline-flex items-center text-sm font-medium text-salon-700 hover:text-salon-900 transition-colors"
        >
          View Profile <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  )
}

export default StylistCard