import Image from "next/image";
import Link from "next/link";
import { Scissors, Palette, Heart, Sparkles, Calendar } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      id: "haircuts",
      title: "Haircuts & Styling",
      description:
        "Our expert stylists provide precision cuts tailored to your face shape, lifestyle, and personal style. From classic to avant-garde, we craft the perfect look for you.",
      items: [
        { name: "Women's Haircut & Style", price: "$65+" },
        { name: "Men's Haircut & Style", price: "$45+" },
        { name: "Children's Haircut", price: "$35+" },
        { name: "Bang Trim", price: "$20+" },
        { name: "Blowout Styling", price: "$55+" },
        { name: "Special Occasion Styling", price: "$85+" },
      ],
      icon: <Scissors className="h-10 w-10 text-salon-700" />,
      image:
        "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "coloring",
      title: "Hair Coloring",
      description:
        "Transform your look with our premium color services. We use high-quality, ammonia-free products to minimize damage while achieving vibrant, long-lasting results.",
      items: [
        { name: "Single Process Color", price: "$85+" },
        { name: "Partial Highlights", price: "$120+" },
        { name: "Full Highlights", price: "$160+" },
        { name: "Balayage", price: "$175+" },
        { name: "Ombré", price: "$185+" },
        { name: "Color Correction", price: "Consultation required" },
      ],
      icon: <Palette className="h-10 w-10 text-salon-700" />,
      image:
        "https://images.pexels.com/photos/3993333/pexels-photo-3993333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "treatments",
      title: "Treatments & Masks",
      description:
        "Revitalize and nourish your hair with our specialized treatments. Ideal for addressing damage, enhancing shine, or managing specific hair concerns.",
      items: [
        { name: "Deep Conditioning Treatment", price: "$45+" },
        { name: "Keratin Smoothing Treatment", price: "$250+" },
        { name: "Scalp Treatment", price: "$55+" },
        { name: "Protein Mask", price: "$60+" },
        { name: "Olaplex Treatment", price: "$75+" },
        { name: "Hair Glossing", price: "$65+" },
      ],
      icon: <Heart className="h-10 w-10 text-salon-700" />,
      image:
        "https://images.pexels.com/photos/3997381/pexels-photo-3997381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "extensions",
      title: "Hair Extensions",
      description:
        "Add length, volume, or both with our premium hair extensions. We offer various methods to suit your lifestyle and hair type, using only the finest quality hair.",
      items: [
        { name: "Consultation & Matching", price: "Complimentary" },
        { name: "Tape-In Extensions", price: "$350+" },
        { name: "Hand-Tied Extensions", price: "$550+" },
        { name: "Fusion Extensions", price: "$650+" },
        { name: "Extension Maintenance", price: "$120+" },
        { name: "Extension Removal", price: "$85+" },
      ],
      icon: <Sparkles className="h-10 w-10 text-salon-700" />,
      image:
        "https://images.pexels.com/photos/3993467/pexels-photo-3993467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      id: "bridal",
      title: "Bridal Services",
      description:
        "Make your special day even more memorable with our comprehensive bridal services. We offer trials, day-of styling, and packages for the entire wedding party.",
      items: [
        { name: "Bridal Hair Trial", price: "$95+" },
        { name: "Bridal Day-of Styling", price: "$150+" },
        { name: "Bridesmaid Styling", price: "$85+" },
        { name: "Mother of Bride/Groom", price: "$85+" },
        { name: "Flower Girl Styling", price: "$45+" },
        { name: "Full Wedding Party Package", price: "Custom quote" },
      ],
      icon: <Calendar className="h-10 w-10 text-salon-700" />,
      image:
        "https://images.pexels.com/photos/4614230/pexels-photo-4614230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-salon-100 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">Our Services</h1>
            <p className="body-lg text-salon-700 mb-0">
              Experience the Elegance difference with our comprehensive range of
              premium hair services, each delivered with exceptional skill and
              personalized attention.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div key={service.id} id={service.id} className="scroll-mt-24">
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`${
                      index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="flex items-center mb-6">
                      {service.icon}
                      <h2 className="heading-lg ml-3">{service.title}</h2>
                    </div>
                    <p className="body-base text-salon-600 mb-8">
                      {service.description}
                    </p>

                    <div className="space-y-4 mb-8">
                      {service.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center pb-2 border-b border-salon-200"
                        >
                          <span className="font-medium">{item.name}</span>
                          <span className="text-salon-700">{item.price}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/booking"
                      className="inline-block px-6 py-3 bg-salon-700 text-white rounded-md hover:bg-salon-800 transition-colors"
                    >
                      Book This Service
                    </Link>
                  </div>

                  <div
                    className={`relative h-[400px] ${
                      index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-salon-700 text-white">
        <div className="container text-center">
          <h2 className="heading-lg mb-6">Ready for Your Transformation?</h2>
          <p className="body-lg mb-8 max-w-2xl mx-auto text-salon-100">
            Our team of expert stylists is ready to create the look you&apos;ve
            always wanted. Book your appointment today.
          </p>
          <Link
            href="/booking"
            className="inline-block px-8 py-4 bg-white text-salon-800 rounded-md hover:bg-salon-100 transition-colors font-medium"
          >
            Book Your Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
