import Link from 'next/link'
import { Scissors, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-salon-800 text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="h-5 w-5 text-gold-400" />
              <span className="text-xl font-serif font-medium">Neel David</span>
            </div>
            <p className="text-salon-200 mb-6">
              Premium hair salon offering cutting-edge styles, expert coloring, and luxurious treatments in an elegant atmosphere.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" className="text-salon-200 hover:text-gold-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://facebook.com" className="text-salon-200 hover:text-gold-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-salon-200 hover:text-gold-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-lg font-medium mb-4 font-serif">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#haircuts" className="text-salon-200 hover:text-white transition-colors">
                  Haircuts & Styling
                </Link>
              </li>
              <li>
                <Link href="/services#coloring" className="text-salon-200 hover:text-white transition-colors">
                  Hair Coloring
                </Link>
              </li>
              <li>
                <Link href="/services#treatments" className="text-salon-200 hover:text-white transition-colors">
                  Treatments & Masks
                </Link>
              </li>
              <li>
                <Link href="/services#extensions" className="text-salon-200 hover:text-white transition-colors">
                  Hair Extensions
                </Link>
              </li>
              <li>
                <Link href="/services#bridal" className="text-salon-200 hover:text-white transition-colors">
                  Bridal Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4 font-serif">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/booking" className="text-salon-200 hover:text-white transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-salon-200 hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/stylists" className="text-salon-200 hover:text-white transition-colors">
                  Our Stylists
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-salon-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-salon-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4 font-serif">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-gold-400 flex-shrink-0" />
                <span className="text-salon-200">123 Fashion Street, Kishanganj, Bihar 855107</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-gold-400 flex-shrink-0" />
                <span className="text-salon-200">+91 98765 43210</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-gold-400 flex-shrink-0" />
                <span className="text-salon-200">info@neeldavid.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-salon-700/50 text-salon-300 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div>© {currentYear} Neel David Hair Salon. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer