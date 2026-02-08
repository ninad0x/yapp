"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare, Globe, FileText, Zap, Users, Clock } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export default function LandingPage() {
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "80+ Languages Supported",
      description: "English, Hindi, Russian, and Spanish translation in real-time"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "PDF Translation",
      description: "Upload report cards and documents - automatically translated and sent"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "WhatsApp Integration",
      description: "Parents communicate in their native language via WhatsApp"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Delivery",
      description: "Messages translated and delivered in seconds"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Bulk Messaging",
      description: "Send announcements to all parents at once in their language"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Hinglish Support",
      description: "Understands Hindi written in English (Roman script)"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              <span className="text-primary text-6xl md:text-8xl">Yapp</span>
              <br />
              <span className="text-xl md:text-2xl font-normal text-muted-foreground">
                Yet Another Parent Portal
              </span>
              <br />
                <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
                <span className="mr-2">🌍</span>
                Powered by Lingo.dev sdk
              </Badge>
              <br />
              
              Connect Parents & Teachers
              <br />
              <span className="text-primary">In Any Language</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Break language barriers in your school. Send messages, reports, and updates 
              that parents receive in their preferred language via WhatsApp.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6">
                  Get Started
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Watch Demo
              </Button>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple, powerful tools for multilingual parent communication
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 hover:shadow-lg transition-shadow border-2">
                  <div className="text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Connect Your School?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join schools using Yapp to communicate with diverse parent communities
            </p>
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-10 py-6">
                Start Free Trial
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}