import { Code, Palette, Globe, Zap, Users, MessageSquare } from "lucide-react";
import React,{ ReactNode } from "react";

interface ServicesFeatures {
  icon: ReactNode;
  title: string;
  description: string;
}

// Home page services
export const services: ServicesFeatures[] = [
  {
    icon: <Code className="md:w-12 md:h-12 w-8 h-8" />,
    title: "Custom Development",
    description: "Tailored solutions that perfectly match your business needs",
  },
  {
    icon: <Palette className="md:w-12 md:h-12 w-8 h-8" />,
    title: "UI/UX Design",
    description:
      "Beautiful, intuitive interfaces that users love to interact with",
  },
  {
    icon: <Globe className="md:w-12 md:h-12 w-8 h-8" />,
    title: "Web Applications",
    description: "Powerful, scalable apps that drive business growth",
  },
];

// Home page features
export const features: ServicesFeatures[] = [
  {
    icon: <Zap className="md:w-16 md:h-16 w-10 h-10 mx-auto" />,
    title: "Lightning Fast",
    description: "Optimized performance for the best user experience",
  },
  {
    icon: <Users className="md:w-16 md:h-16 w-10 h-10 mx-auto" />,
    title: "Client-Focused",
    description: "Your success is our top priority",
  },
  {
    icon: <MessageSquare className="md:w-16 md:h-16 w-10 h-10 mx-auto" />,
    title: "24/7 Support",
    description: "Always here when you need us",
  },
];
