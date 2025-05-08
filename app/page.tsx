import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, Clock, Star, Users } from "lucide-react";
import ServiceCard from "@/components/service-card";
import StylistCard from "@/components/stylist-card";
import TestimonialCard from "@/components/testimonial-card";
import GalleryGrid from "@/components/gallery-grid";

export default function Home() {
  const featuredServices = [
    {
      id: "haircut",
      title: "Haircuts & Styling",
      description:
        "Expert cuts and styling for all hair types and preferences.",
      price: "From $55",
      icon: <Scissors className="h-6 w-6 text-salon-700" />,
      image:
        "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "coloring",
      title: "Hair Coloring",
      description: "Premium colors and techniques to transform your look.",
      price: "From $85",
      icon: <Scissors className="h-6 w-6 text-salon-700" />,
      image:
        "https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "treatments",
      title: "Treatments & Masks",
      description: "Rejuvenating treatments to restore and nourish your hair.",
      price: "From $45",
      icon: <Scissors className="h-6 w-6 text-salon-700" />,
      image:
        "https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const featuredStylists = [
    {
      id: "emma",
      name: "Emma Wilson",
      role: "Senior Stylist",
      bio: "Specializes in precision cuts and contemporary styling.",
      image:
        "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "james",
      name: "James Rodriguez",
      role: "Color Specialist",
      bio: "Expert in balayage, highlights, and creative color techniques.",
      image:
        "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "sophia",
      name: "Sophia Chen",
      role: "Artistic Director",
      bio: "Award-winning stylist specializing in avant-garde and editorial styles.",
      image:
        "https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const testimonials = [
    {
      id: "1",
      name: "Jennifer K.",
      content:
        "The attention to detail at Elegance is unmatched. My stylist took the time to understand exactly what I wanted and delivered beyond my expectations.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "2",
      name: "Michael T.",
      content:
        "I have been coming to Elegance for over a year now and would not trust anyone else with my hair. The stylists are true artists and the atmosphere is so relaxing.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "3",
      name: "Aisha L.",
      content:
        "From the moment you walk in, you're treated like royalty. The head massage during the wash is heavenly, and my cut is always perfect.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  const galleryImages = [
    "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3992874/pexels-photo-3992874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3993467/pexels-photo-3993467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3738340/pexels-photo-3738340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Hair salon"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "50% 40%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>

        <div className="container relative z-10 pt-16">
          <div className="max-w-2xl text-white">
            <h1 className="heading-xl mb-6 animated-fade-in">
              Elevate Your Style at Neel David
            </h1>
            <p className="body-lg mb-8 text-white/90 animated-fade-in-delay-1">
              Experience the art of premium hairstyling in a luxurious setting
              with our expert stylists dedicated to bringing your vision to
              life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animated-fade-in-delay-2">
              <Button
                asChild
                size="lg"
                className="bg-salon-700 hover:bg-salon-800"
              >
                <Link href="/booking">Book an Appointment</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-white border-white/70 hover:bg-white/10"
              >
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-salon-100">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-0 subtle-shadow animated-slide-up">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-salon-100 p-4 mb-4">
                  <Scissors className="h-6 w-6 text-salon-700" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-2">
                  Expert Stylists
                </h3>
                <p className="text-salon-600">
                  Our team of award-winning stylists brings years of expertise
                  and creativity to every service.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 subtle-shadow animated-slide-up-delay-1">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-salon-100 p-4 mb-4">
                  <Star className="h-6 w-6 text-salon-700" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-2">
                  Premium Products
                </h3>
                <p className="text-salon-600">
                  We use only the highest quality, sustainable hair products for
                  healthy, beautiful results.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 subtle-shadow animated-slide-up-delay-2">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="rounded-full bg-salon-100 p-4 mb-4">
                  <Clock className="h-6 w-6 text-salon-700" />
                </div>
                <h3 className="text-xl font-serif font-medium mb-2">
                  Luxury Experience
                </h3>
                <p className="text-salon-600">
                  Indulge in our peaceful, elegant atmosphere designed for
                  complete relaxation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Our Premium Services</h2>
            <p className="body-base text-salon-600 max-w-2xl mx-auto">
              Discover our range of expert services tailored to enhance your
              unique style and hair type.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              className="border-salon-300 text-salon-700 hover:bg-salon-100"
            >
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section with Image */}
      <section className="py-20 bg-salon-800 text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="heading-lg mb-6">The Elegance Experience</h2>
              <p className="body-base mb-6 text-salon-200">
                Founded on the principle that everyone deserves exceptional hair
                care, Elegance has been a leader in luxury hair styling for over
                a decade. Our approach blends time-honored techniques with
                innovative trends to create looks that are both timeless and
                contemporary.
              </p>
              <p className="body-base mb-8 text-salon-200">
                Every visit to Elegance is a carefully crafted experience. From
                our welcoming reception to our indulgent scalp massages and
                precision styling, we ensure your time with us is nothing short
                of exceptional.
              </p>
              <Button
                asChild
                variant="outline"
                className="text-white border-white/70 hover:bg-white/10"
              >
                <Link href="/about">Our Story</Link>
              </Button>
            </div>

            <div className="order-1 lg:order-2 relative h-[400px] lg:h-[500px]">
              <Image
                src="https://images.pexels.com/photos/3738340/pexels-photo-3738340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Salon interior"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stylists Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Meet Our Stylists</h2>
            <p className="body-base text-salon-600 max-w-2xl mx-auto">
              Our team of passionate professionals is dedicated to creating the
              perfect look for every client.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredStylists.map((stylist) => (
              <StylistCard key={stylist.id} stylist={stylist} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              className="border-salon-300 text-salon-700 hover:bg-salon-100"
            >
              <Link href="/stylists">All Stylists</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-salon-100">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Our Work</h2>
            <p className="body-base text-salon-600 max-w-2xl mx-auto">
              Browse our gallery of transformations and get inspired for your
              next visit.
            </p>
          </div>

          <GalleryGrid images={galleryImages} />

          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              className="border-salon-300 text-salon-700 hover:bg-salon-100"
            >
              <Link href="/gallery">Full Gallery</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Client Testimonials</h2>
            <p className="body-base text-salon-600 max-w-2xl mx-auto">
              Hear what our satisfied clients have to say about their Elegance
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-salon-700 text-white">
        <div className="container text-center">
          <h2 className="heading-lg mb-6">Ready to Transform Your Look?</h2>
          <p className="body-lg mb-8 max-w-2xl mx-auto text-salon-100">
            Book your appointment today and experience the Elegance difference.
            Our team is ready to help you achieve the look you've always wanted.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-salon-800 hover:bg-salon-100"
          >
            <Link href="/booking">Book Your Appointment</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
