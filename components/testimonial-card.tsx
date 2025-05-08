import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

interface TestimonialProps {
  testimonial: {
    id: string
    name: string
    content: string
    rating: number
    image: string
  }
}

const TestimonialCard = ({ testimonial }: TestimonialProps) => {
  return (
    <Card className="border-0 subtle-shadow h-full flex flex-col">
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < testimonial.rating ? 'text-gold-500 fill-gold-500' : 'text-salon-300'}`} 
            />
          ))}
        </div>
        <p className="text-salon-600 mb-6 flex-grow">{testimonial.content}</p>
        <div className="flex items-center">
          <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium">{testimonial.name}</div>
            <div className="text-sm text-salon-500">Client</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TestimonialCard