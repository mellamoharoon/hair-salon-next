"use client"

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface GalleryGridProps {
  images: string[]
}

const GalleryGrid = ({ images }: GalleryGridProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={cn(
              "relative cursor-pointer overflow-hidden h-80 rounded-md transition-transform duration-300 hover:scale-[1.02]",
              index % 3 === 0 && "md:col-span-2 md:row-span-2 h-[500px]"
            )}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 border-0 overflow-hidden bg-transparent">
          {selectedImage && (
            <div className="relative h-[80vh]">
              <Image
                src={selectedImage}
                alt="Featured work"
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

export default GalleryGrid