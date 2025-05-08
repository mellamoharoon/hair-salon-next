import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'

interface ServiceProps {
  service: {
    id: string
    title: string
    description: string
    price: string
    icon: React.ReactNode
    image: string
  }
}

const ServiceCard = ({ service }: ServiceProps) => {
  return (
    <Card className="overflow-hidden border-0 subtle-shadow group transition-all duration-300 hover:translate-y-[-5px]">
      <div className="relative h-64">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <div className="font-medium">{service.price}</div>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-serif font-medium mb-2">{service.title}</h3>
          </div>
          <div>{service.icon}</div>
        </div>
        <p className="text-salon-600 mb-4">{service.description}</p>
        <Link 
          href={`/services#${service.id}`}
          className="inline-flex items-center text-sm font-medium text-salon-700 hover:text-salon-900 transition-colors"
        >
          Learn More <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  )
}

export default ServiceCard