"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, CheckCircle2, Scissors } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Time slots available for booking
const TIME_SLOTS = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM",
  "5:00 PM", "5:30 PM", "6:00 PM"
]

// Services offered by the salon
const SERVICES = [
  {
    id: "haircuts",
    category: "Haircuts & Styling",
    options: [
      { id: "womens-cut", name: "Women's Haircut & Style", price: "$65+" },
      { id: "mens-cut", name: "Men's Haircut & Style", price: "$45+" },
      { id: "kids-cut", name: "Children's Haircut", price: "$35+" },
      { id: "bang-trim", name: "Bang Trim", price: "$20+" },
      { id: "blowout", name: "Blowout Styling", price: "$55+" },
      { id: "special-style", name: "Special Occasion Styling", price: "$85+" }
    ]
  },
  {
    id: "coloring",
    category: "Hair Coloring",
    options: [
      { id: "single-process", name: "Single Process Color", price: "$85+" },
      { id: "partial-highlights", name: "Partial Highlights", price: "$120+" },
      { id: "full-highlights", name: "Full Highlights", price: "$160+" },
      { id: "balayage", name: "Balayage", price: "$175+" },
      { id: "ombre", name: "Ombré", price: "$185+" },
      { id: "color-correction", name: "Color Correction", price: "Consultation" }
    ]
  },
  {
    id: "treatments",
    category: "Treatments & Masks",
    options: [
      { id: "deep-conditioning", name: "Deep Conditioning Treatment", price: "$45+" },
      { id: "keratin", name: "Keratin Smoothing Treatment", price: "$250+" },
      { id: "scalp-treatment", name: "Scalp Treatment", price: "$55+" },
      { id: "protein-mask", name: "Protein Mask", price: "$60+" },
      { id: "olaplex", name: "Olaplex Treatment", price: "$75+" },
      { id: "glossing", name: "Hair Glossing", price: "$65+" }
    ]
  }
]

// Stylists at the salon
const STYLISTS = [
  {
    id: "emma",
    name: "Emma Wilson",
    role: "Senior Stylist",
    specialties: ["Precision Cuts", "Textured Styles", "Short Hair Designs"],
    image: "https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "james",
    name: "James Rodriguez",
    role: "Color Specialist",
    specialties: ["Balayage", "Creative Color", "Color Correction"],
    image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "sophia",
    name: "Sophia Chen",
    role: "Artistic Director",
    specialties: ["Editorial Styling", "Avant-Garde Designs", "Bridal Hair"],
    image: "https://images.pexels.com/photos/3785424/pexels-photo-3785424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: "marcus",
    name: "Marcus Johnson",
    role: "Master Stylist",
    specialties: ["Men's Grooming", "Fades", "Texturizing"],
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
]

// Form validation schema
const formSchema = z.object({
  service: z.string({
    required_error: "Please select a service",
  }),
  stylist: z.string({
    required_error: "Please select a stylist",
  }),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string({
    required_error: "Please select a time",
  }),
  firstName: z.string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name must be less than 50 characters" }),
  lastName: z.string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name must be less than 50 characters" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" }),
  phone: z.string()
    .min(10, { message: "Please enter a valid phone number" })
    .max(15, { message: "Please enter a valid phone number" }),
  notes: z.string().optional(),
})

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [bookingComplete, setBookingComplete] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Initialize form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notes: "",
    },
  })

  // Helper to get selected service details
  const getSelectedService = () => {
    const serviceId = form.watch("service")
    if (!serviceId) return null
    
    for (const category of SERVICES) {
      const service = category.options.find(option => option.id === serviceId)
      if (service) return { ...service, category: category.category }
    }
    return null
  }

  // Helper to get selected stylist details
  const getSelectedStylist = () => {
    const stylistId = form.watch("stylist")
    if (!stylistId) return null
    return STYLISTS.find(stylist => stylist.id === stylistId) || null
  }

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, you would send this data to your backend
    console.log(values)
    
    // Show success message
    setBookingComplete(true)
    
    // Show toast notification
    toast({
      title: "Booking Confirmed!",
      description: "Your appointment has been scheduled successfully.",
    })
    
    // In a real application, you might redirect to a confirmation page
    // After a delay, redirect to home
    setTimeout(() => {
      router.push('/')
    }, 5000)
  }

  // Advance to the next step if validation passes
  const handleNextStep = async () => {
    let fieldsToValidate: any[] = []
    
    switch (step) {
      case 1:
        fieldsToValidate = ["service", "stylist"]
        break
      case 2:
        fieldsToValidate = ["date", "time"]
        break
      case 3:
        fieldsToValidate = ["firstName", "lastName", "email", "phone"]
        break
    }
    
    const isValid = await form.trigger(fieldsToValidate)
    if (isValid) {
      if (step < 4) {
        setStep(step + 1)
      } else {
        form.handleSubmit(onSubmit)()
      }
    }
  }

  // Go back to the previous step
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  if (bookingComplete) {
    return (
      <div className="pt-24 pb-16">
        <div className="container max-w-3xl mx-auto">
          <Card className="border-0 subtle-shadow">
            <CardContent className="p-10 text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle2 className="h-20 w-20 text-green-500" />
              </div>
              <h1 className="heading-lg mb-4">Booking Confirmed!</h1>
              <p className="body-lg text-salon-600 mb-6">
                Thank you for booking with Elegance Hair Salon. We've sent a confirmation email with your appointment details.
              </p>
              <div className="bg-salon-100 p-6 rounded-lg max-w-md mx-auto mb-8">
                <div className="text-left">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Service:</span>
                    <span>{getSelectedService()?.name}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Stylist:</span>
                    <span>{getSelectedStylist()?.name}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Date & Time:</span>
                    <span>
                      {form.getValues("date") && format(form.getValues("date"), "EEEE, MMMM d, yyyy")} at {form.getValues("time")}
                    </span>
                  </div>
                </div>
              </div>
              <p className="body-base text-salon-500 mb-6">
                You will be redirected to the home page in a few seconds...
              </p>
              <Button onClick={() => router.push('/')} className="bg-salon-700 hover:bg-salon-800">
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      {/* Hero Section */}
      <section className="bg-salon-100 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">Book Your Appointment</h1>
            <p className="body-lg text-salon-700 mb-0">
              Complete the form below to schedule your visit with our expert stylists.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="container max-w-3xl mx-auto">
          <Card className="border-0 subtle-shadow">
            <CardContent className="p-8">
              {/* Steps Indicator */}
              <div className="flex justify-between mb-10 relative">
                {[1, 2, 3, 4].map((stepNumber) => (
                  <div key={stepNumber} className="flex flex-col items-center relative z-10">
                    <div 
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors",
                        step >= stepNumber 
                          ? "bg-salon-700 text-white" 
                          : "bg-salon-100 text-salon-600"
                      )}
                    >
                      {stepNumber}
                    </div>
                    <span 
                      className={cn(
                        "mt-2 text-sm transition-colors hidden sm:block",
                        step >= stepNumber 
                          ? "text-salon-700 font-medium" 
                          : "text-salon-500"
                      )}
                    >
                      {stepNumber === 1 && "Services"}
                      {stepNumber === 2 && "Date & Time"}
                      {stepNumber === 3 && "Your Details"}
                      {stepNumber === 4 && "Confirm"}
                    </span>
                  </div>
                ))}
                {/* Progress Bar */}
                <div className="absolute top-5 left-0 right-0 h-[2px] bg-salon-100">
                  <div 
                    className="h-full bg-salon-700 transition-all duration-300"
                    style={{ width: `${(step - 1) * 33.33}%` }}
                  ></div>
                </div>
              </div>

              <Form {...form}>
                <form className="space-y-8">
                  {/* Step 1: Service and Stylist Selection */}
                  {step === 1 && (
                    <div className="space-y-8 animated-fade-in">
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem className="space-y-6">
                            <FormLabel className="text-xl font-serif">Select Service</FormLabel>
                            <FormControl>
                              <Tabs defaultValue={SERVICES[0].id} className="w-full">
                                <TabsList className="mb-6 w-full grid grid-cols-3">
                                  {SERVICES.map((category) => (
                                    <TabsTrigger 
                                      key={category.id} 
                                      value={category.id}
                                      className="text-sm"
                                    >
                                      {category.category}
                                    </TabsTrigger>
                                  ))}
                                </TabsList>
                                
                                {SERVICES.map((category) => (
                                  <TabsContent key={category.id} value={category.id} className="space-y-4">
                                    <RadioGroup
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                      className="grid grid-cols-1 gap-4"
                                    >
                                      {category.options.map((service) => (
                                        <div key={service.id}>
                                          <RadioGroupItem
                                            value={service.id}
                                            id={service.id}
                                            className="peer sr-only"
                                          />
                                          <label
                                            htmlFor={service.id}
                                            className="flex items-center justify-between p-4 rounded-md border border-salon-200 cursor-pointer hover:border-salon-400 peer-checked:border-salon-700 peer-checked:bg-salon-50 transition-all"
                                          >
                                            <div>
                                              <div className="font-medium">{service.name}</div>
                                              <div className="text-sm text-salon-500">{service.price}</div>
                                            </div>
                                            <Scissors className={cn(
                                              "h-5 w-5 transition-colors",
                                              field.value === service.id ? "text-salon-700" : "text-salon-300"
                                            )} />
                                          </label>
                                        </div>
                                      ))}
                                    </RadioGroup>
                                  </TabsContent>
                                ))}
                              </Tabs>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="stylist"
                        render={({ field }) => (
                          <FormItem className="space-y-6">
                            <FormLabel className="text-xl font-serif">Select Stylist</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                              >
                                {STYLISTS.map((stylist) => (
                                  <div key={stylist.id}>
                                    <RadioGroupItem
                                      value={stylist.id}
                                      id={stylist.id}
                                      className="peer sr-only"
                                    />
                                    <label
                                      htmlFor={stylist.id}
                                      className="flex p-4 rounded-md border border-salon-200 cursor-pointer hover:border-salon-400 peer-checked:border-salon-700 peer-checked:bg-salon-50 transition-all"
                                    >
                                      <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                                        <img 
                                          src={stylist.image} 
                                          alt={stylist.name} 
                                          className="object-cover h-full w-full"
                                        />
                                      </div>
                                      <div>
                                        <div className="font-medium">{stylist.name}</div>
                                        <div className="text-sm text-salon-500 mb-1">{stylist.role}</div>
                                        <div className="flex flex-wrap gap-1">
                                          {stylist.specialties.map((specialty, index) => (
                                            <span 
                                              key={index}
                                              className="inline-block text-xs px-2 py-1 bg-salon-100 text-salon-700 rounded"
                                            >
                                              {specialty}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    </label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 2: Date and Time Selection */}
                  {step === 2 && (
                    <div className="space-y-8 animated-fade-in">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="text-xl font-serif mb-4">Select Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "EEEE, MMMM d, yyyy")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => 
                                    date < new Date() || 
                                    date.getDay() === 0 || // Sunday
                                    date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              Our salon is open Monday to Saturday.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xl font-serif mb-4">Select Time</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3"
                              >
                                {TIME_SLOTS.map((time) => (
                                  <div key={time}>
                                    <RadioGroupItem
                                      value={time}
                                      id={`time-${time}`}
                                      className="peer sr-only"
                                    />
                                    <label
                                      htmlFor={`time-${time}`}
                                      className="flex items-center justify-center p-2 rounded-md border border-salon-200 cursor-pointer hover:border-salon-400 peer-checked:border-salon-700 peer-checked:bg-salon-50 transition-all text-sm"
                                    >
                                      {time}
                                    </label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 3: Personal Details */}
                  {step === 3 && (
                    <div className="space-y-6 animated-fade-in">
                      <div className="text-xl font-serif mb-4">Your Information</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your first name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your last name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your email" type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Requests or Notes</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any additional information you would like us to know?" 
                                className="resize-none"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 4: Review and Confirm */}
                  {step === 4 && (
                    <div className="space-y-8 animated-fade-in">
                      <div>
                        <h3 className="text-xl font-serif mb-6">Review Your Booking</h3>
                        <div className="bg-salon-50 p-6 rounded-lg space-y-6">
                          {/* Service & Stylist Summary */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium mb-3 text-salon-800">Service</h4>
                              {getSelectedService() && (
                                <div className="space-y-1">
                                  <div className="text-lg">{getSelectedService()?.name}</div>
                                  <div className="text-sm text-salon-600">{getSelectedService()?.category}</div>
                                  <div className="text-sm font-medium">{getSelectedService()?.price}</div>
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium mb-3 text-salon-800">Stylist</h4>
                              {getSelectedStylist() && (
                                <div className="flex items-center">
                                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                                    <img 
                                      src={getSelectedStylist()?.image} 
                                      alt={getSelectedStylist()?.name} 
                                      className="object-cover h-full w-full"
                                    />
                                  </div>
                                  <div>
                                    <div className="font-medium">{getSelectedStylist()?.name}</div>
                                    <div className="text-sm text-salon-600">{getSelectedStylist()?.role}</div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Date & Time Summary */}
                          <div>
                            <h4 className="font-medium mb-3 text-salon-800">Date & Time</h4>
                            <div className="space-y-1">
                              {form.getValues("date") && (
                                <div className="text-lg">
                                  {format(form.getValues("date"), "EEEE, MMMM d, yyyy")}
                                </div>
                              )}
                              <div className="text-lg">{form.getValues("time")}</div>
                            </div>
                          </div>

                          {/* Contact Information Summary */}
                          <div>
                            <h4 className="font-medium mb-3 text-salon-800">Your Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm text-salon-600">Name</div>
                                <div>{form.getValues("firstName")} {form.getValues("lastName")}</div>
                              </div>
                              <div>
                                <div className="text-sm text-salon-600">Contact</div>
                                <div>{form.getValues("email")}</div>
                                <div>{form.getValues("phone")}</div>
                              </div>
                            </div>
                          </div>

                          {/* Notes Summary (if any) */}
                          {form.getValues("notes") && (
                            <div>
                              <h4 className="font-medium mb-2 text-salon-800">Special Requests</h4>
                              <div className="text-salon-600">{form.getValues("notes")}</div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="bg-salon-100 p-4 rounded-md">
                        <p className="text-sm text-salon-700">
                          By confirming your booking, you agree to our cancellation policy. Please give at least 24 hours notice if you need to reschedule or cancel your appointment.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-4 mt-8 border-t border-salon-100">
                    {step > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevStep}
                      >
                        Previous
                      </Button>
                    ) : (
                      <div></div>
                    )}
                    <Button
                      type={step === 4 ? "submit" : "button"}
                      onClick={step === 4 ? () => form.handleSubmit(onSubmit)() : handleNextStep}
                      className="bg-salon-700 hover:bg-salon-800"
                    >
                      {step === 4 ? "Confirm Booking" : "Continue"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}