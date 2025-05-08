import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Facebook, Twitter } from 'lucide-react'

export default function StylistsPage() {
  const stylists = [
    {
      id: 'emma',
      name: 'Emma Wilson',
      role: 'Senior Stylist',
      bio: 'With over 10 years of experience in the industry, Emma specializes in precision cuts and contemporary styling. Her attention to detail and ability to understand each client's unique needs have made her one of our most requested stylists.',
      specialties: ['Precision Cuts', 'Textured Styles', 'Short Hair Designs'],
      image: 'https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      social: {
        instagram: '#',
        facebook: '#',
        twitter: '#'
      }
    },
    {
      id: 'james',
      name: 'James Rodriguez',
      role: 'Color Specialist',
      bio: 'James is our resident color wizard, transforming hair with his expert techniques and artistic eye. From subtle highlights to bold fashion colors, his work has been featured in several fashion magazines and runway shows.',
      specialties: ['Balayage', 'Creative Color', 'Color Correction'],
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      social: {
        instagram: '#',
        facebook: '#',
        twitter: '#'
      }
    },
    {
      id: 'sophia',
      name: 'Sophia Chen',
      role: 'Artistic Director',
      bio: 'As our Artistic Director, Sophia brings a wealth of international experience to Elegance. Her innovative approach and mastery of both classic and avant-garde techniques have earned her numerous industry awards.',
      specialties: ['Editorial Styling', 'Avant-Garde Designs', 'Bridal Hair'],
      image: 'https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      social: {
        instagram: '#',
        facebook: '#',
        twitter: '#'
      }
    },
    {
      id: 'marcus',
      name: 'Marcus Johnson',
      role: 'Master Stylist',
      bio: 'Marcus combines traditional barbering skills with modern hair styling techniques to create perfect looks for all genders. His dedicated following appreciates his precision, creativity, and personable approach.',
      specialties: ['Men\'s Grooming', 'Fades', 'Texturizing'],
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      social: {
        instagram: '#',
        facebook: '#',
        twitter: '#'
      }
    },
    {
      id: 'olivia',
      name: 'Olivia Martinez',
      role: 'Extension Specialist',
      bio: 'Olivia is our extension expert, certified in multiple techniques to add length, volume, and dimension to any hair type. Her meticulous application ensures natural-looking, comfortable results that blend seamlessly.',
      specialties: ['Tape-Ins', 'Hand-Tied Wefts', 'Micro-Links'],
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      social: {
        instagram: '#',
        facebook: '#',
        twitter: '#'
      }
    },
    {
      id: 'david',
      name: 'David Kim',
      role: 'Texture Specialist',
      bio: 'David specializes in working with all hair textures, with particular expertise in curly and coily hair. His custom cutting and styling techniques enhance natural texture while providing manageable, beautiful results.',
      specialties: ['Curly Hair Cutting', 'Natural Hair Care', 'Texture Management'],
      image: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      social: {
        instagram: '#',
        facebook: '#',
        twitter: '#'
      }
    }
  ]

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-salon-100 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">Meet Our Stylists</h1>
            <p className="body-lg text-salon-700 mb-0">
              Our team of talented professionals combines artistry with technical expertise to create looks that enhance your natural beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Stylists Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {stylists.map((stylist) => (
              <div key={stylist.id} className="group">
                <div className="relative h-[350px] mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={stylist.image}
                    alt={stylist.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <h2 className="text-2xl font-serif font-medium mb-1">{stylist.name}</h2>
                <p className="text-salon-500 mb-3">{stylist.role}</p>
                
                <p className="text-salon-600 mb-4 line-clamp-3">{stylist.bio}</p>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium uppercase text-salon-700 mb-2">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {stylist.specialties.map((specialty, index) => (
                      <span 
                        key={index} 
                        className="inline-block px-3 py-1 bg-salon-100 text-salon-700 text-sm rounded"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Link 
                    href={`/booking?stylist=${stylist.id}`}
                    className="text-sm font-medium text-salon-700 hover:text-salon-900 transition-colors"
                  >
                    Book with {stylist.name.split(' ')[0]}
                  </Link>
                  
                  <div className="flex gap-3">
                    <a href={stylist.social.instagram} className="text-salon-400 hover:text-salon-700 transition-colors">
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a href={stylist.social.facebook} className="text-salon-400 hover:text-salon-700 transition-colors">
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a href={stylist.social.twitter} className="text-salon-400 hover:text-salon-700 transition-colors">
                      <Twitter className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-16 bg-salon-800 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Join Our Team</h2>
            <p className="body-base mb-8 text-salon-200">
              We're always looking for talented stylists to join our team. If you're passionate about hair, committed to excellence, and want to be part of a collaborative salon culture, we'd love to hear from you.
            </p>
            <Link 
              href="/careers" 
              className="inline-block px-6 py-3 bg-white text-salon-800 rounded-md hover:bg-salon-100 transition-colors font-medium"
            >
              View Opportunities
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}