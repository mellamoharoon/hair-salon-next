"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')

  const galleryImages = [
    {
      src: 'https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'cuts',
      title: 'Precision Cut'
    },
    {
      src: 'https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'color',
      title: 'Balayage Highlights'
    },
    {
      src: 'https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'treatments',
      title: 'Hair Mask Treatment'
    },
    {
      src: 'https://images.pexels.com/photos/3993467/pexels-photo-3993467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'styling',
      title: 'Sleek Blowout'
    },
    {
      src: 'https://images.pexels.com/photos/3738340/pexels-photo-3738340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'salon',
      title: 'Salon Experience'
    },
    {
      src: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'styling',
      title: 'Modern Waves'
    },
    {
      src: 'https://images.pexels.com/photos/3993333/pexels-photo-3993333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'color',
      title: 'Vibrant Color'
    },
    {
      src: 'https://images.pexels.com/photos/2799605/pexels-photo-2799605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'cuts',
      title: 'Classic Bob'
    },
    {
      src: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'styling',
      title: 'Updo Style'
    },
    {
      src: 'https://images.pexels.com/photos/3356170/pexels-photo-3356170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'cuts',
      title: 'Modern Men\'s Cut'
    },
    {
      src: 'https://images.pexels.com/photos/3065207/pexels-photo-3065207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'bridal',
      title: 'Bridal Styling'
    },
    {
      src: 'https://images.pexels.com/photos/2896853/pexels-photo-2896853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      category: 'color',
      title: 'Subtle Highlights'
    }
  ]

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter)

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'cuts', label: 'Haircuts' },
    { id: 'color', label: 'Color' },
    { id: 'styling', label: 'Styling' },
    { id: 'treatments', label: 'Treatments' },
    { id: 'bridal', label: 'Bridal' },
    { id: 'salon', label: 'Salon' }
  ]

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-salon-100 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">Our Gallery</h1>
            <p className="body-lg text-salon-700 mb-0">
              Browse our portfolio of transformations and get inspired for your next visit.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="pt-12 pb-6">
        <div className="container">
          <div className="flex justify-center flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  filter === category.id
                    ? "bg-salon-700 text-white"
                    : "bg-salon-100 text-salon-700 hover:bg-salon-200"
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container">
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-salon-600">No images found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <div 
                  key={index} 
                  className="group relative h-80 cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <Image
                    src={image.src}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-lg font-medium">{image.title}</h3>
                    <p className="text-sm capitalize">{image.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 border-0 overflow-hidden bg-transparent">
          {selectedImage && (
            <div className="relative h-[80vh]">
              <Image
                src={selectedImage}
                alt="Gallery image"
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}