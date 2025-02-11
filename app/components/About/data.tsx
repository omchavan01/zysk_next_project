import { Users, Rocket, Heart } from "lucide-react";
import React, { ReactNode } from "react";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface Stat {
  number: number;
  label: string;
}

export const features: Feature[] = [
  {
    icon: <Users className="h-8 w-8" />,
    title: "Expert Team",
    description:
      "Our dedicated team of professionals brings years of experience and passion to every project.",
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "Innovation First",
    description:
      "We stay ahead of the curve, embracing new technologies and creative solutions.",
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Client-Focused",
    description:
      "Your success is our priority. We work closely with you to achieve your goals.",
  },
];

export const stats: Stat[] = [
  { number: 478, label: "Projects Completed" },
  { number: 80, label: "Team Members" },
  { number: 95, label: "Client Satisfaction" },
];
