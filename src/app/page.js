'use client'

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BarChart2, Shield, Zap } from "lucide-react"
import Button from "@/components/ui/Button"

// Separate the features data outside the component
const features = [
  {
    icon: BarChart2,
    title: "Real-time Analytics",
    description: "Get instant insights with our powerful analytics dashboard.",
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    description: "Top-notch security measures to protect your sensitive audit data.",
  },
  {
    icon: Zap,
    title: "Streamlined Workflow",
    description: "Automate and optimize your audit processes for maximum efficiency.",
  },
]

// Separate the navigation into its own component
function Navigation() {
  return (
    <nav className="container mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 flex items-center">
          <BarChart2 className="mr-2 h-6 w-6 text-indigo-600" />
          AuditTrack Pro
        </Link>
        <div className="space-x-4">
          <Link href="/login" legacyBehavior>
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/register" legacyBehavior>
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default function Home() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

        <main className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Audit Tracking & Risk Management <span className="text-indigo-600">Made Simple</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Streamline your audit processes, manage risks effectively, and make data-driven decisions with our
                comprehensive dashboard.
              </p>
              <div className="space-x-4">
                <Link href="/register" legacyBehavior>
                  <Button size="lg">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features" legacyBehavior>
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 transform skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
              </div>
              <div className="relative bg-white p-8 rounded-lg shadow-xl">
                <Image
                  src="/dashboard-example.png"
                  alt="Dashboard preview"
                  width={800}
                  height={600}
                  className="rounded-lg w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>

          <section id="features" className="mt-24">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                >
                  <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
                  <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}