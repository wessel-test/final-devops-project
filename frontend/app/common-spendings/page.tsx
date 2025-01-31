"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const images = [
  {
    title: "Sharing the Journey",
    description:
      "You're a student, young professional, or someone who loves the social and financial perks of sharing a home with others. Living in a shared space often means lower rent and shared responsibilities like groceries or utilities.",
    src: "https://images.pexels.com/photos/4778417/pexels-photo-4778417.jpeg",
    id: "sharing-the-journey",
  },
  {
    title: "Independent Living",
    description:
      "You value your personal space and independence. Living alone gives you the freedom to decorate and organize without compromise.",
    src: "https://images.pexels.com/photos/14756354/pexels-photo-14756354.jpeg",
    id: "independent-living",
  },
  {
    title: "Partners in Life",
    description:
      "You're part of a couple sharing life—and expenses—together. Living together often means splitting costs like rent and groceries.",
    src: "https://images.pexels.com/photos/4199289/pexels-photo-4199289.jpeg",
    id: "partners-in-life",
  },
  {
    title: "Family Adventures",
    description:
      "You're part of a growing family! Your home is all about creating a safe and loving space for everyone.",
    src: "https://images.pexels.com/photos/9220741/pexels-photo-9220741.jpeg",
    id: "family-adventures",
  },
  {
    title: "Golden Years Living",
    description:
      "You're enjoying—or planning for—your well-deserved retirement years. This stage is about comfort, relaxation, and making the most of your time.",
    src: "https://images.pexels.com/photos/6975090/pexels-photo-6975090.jpeg",
    id: "golden-years-living",
  },
];

export default function CommonSpendingsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-8 p-4">
      <h2 className="text-center text-3xl font-bold">
        Do you know what people in your situation usually spend on?
      </h2>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative transition-transform duration-300 ${
              hoveredIndex === index ? "scale-105" : ""
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Caption Above Image */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-white bg-opacity-75 text-center rounded-t-lg">
              <h3 className="text-lg font-semibold">{image.title}</h3>
              <p className="text-sm">{image.description}</p>
            </div>
            {/* Image */}
            <a
              href={`#${image.id}`}
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById(image.id);
                if (target) {
                  const offset = 80; // Offset to prevent fixed header overlap
                  const elementPosition = target.getBoundingClientRect().top + window.scrollY;
                  window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
                }
              }}
              className="block w-full h-full" // Ensure the <a> tag covers the entire image
            >
              <Image
                src={image.src}
                alt={image.title}
                width={500}
                height={300}
                className="rounded-b-lg w-full h-auto"
              />
            </a>
          </div>
        ))}
      </div>

      {/* Spending Categories */}
      {[
        {
          title: "Sharing the Journey (Shared Living)",
          description:
            "Typical spending benchmarks for shared living situations.",
          details: [
            { label: "Rent", value: "25-30% - Living with roommates keeps rent affordable." },
            { label: "Utilities", value: "5-7% - Splitting bills like electricity, water, and internet." },
            { label: "Groceries", value: "10-12% - Cooking together can help you save." },
            { label: "Dining Out & Entertainment", value: "10-15% - Socializing and nightlife can be major expenses." },
            { label: "Transportation", value: "10-12% - Public transport or carpooling helps keep costs low." },
            { label: "Savings", value: "20-25% - Ideal time to save aggressively." },
          ],
        },
        {
          title: "Independent Living",
          description:
            "Typical spending benchmarks for independent living situations.",
          details: [
            { label: "Rent", value: "30-35% - Living alone means higher rent." },
            { label: "Utilities", value: "5-8% - Covering all utility bills yourself." },
            { label: "Groceries", value: "10-15% - Meal planning helps avoid overspending." },
            { label: "Dining Out & Entertainment", value: "10-15% - Balancing hobbies and savings." },
            { label: "Transportation", value: "10-12% - Commuting and occasional travel expenses." },
            { label: "Savings", value: "15-20% - Consistent saving is key." },
          ],
        },
        {
          title: "Partners in Life (Couples)",
          description: "Typical spending benchmarks for couples.",
          details: [
            { label: "Rent", value: "25-30% of combined income - Sharing rent makes housing more affordable." },
            { label: "Utilities", value: "5-8% of combined income - Splitting costs keeps expenses low." },
            { label: "Groceries", value: "10-12% of combined income - Buying in bulk saves money." },
            { label: "Dining Out & Entertainment", value: "5-10% - Budgeting for date nights and hobbies." },
            { label: "Transportation", value: "10-12% - Sharing a car can cut costs." },
            { label: "Savings", value: "20-25% - Essential for short-term and long-term goals." },
          ],
        },
        {
          title: "Family Adventures (Families with Kids)",
          description: "Typical spending benchmarks for families.",
          details: [
            { label: "Rent/Mortgage", value: "25-30% - Families need larger homes." },
            { label: "Utilities", value: "5-8% - More people means higher bills." },
            { label: "Groceries", value: "15-20% - Balancing nutrition and costs." },
            { label: "Childcare & Education", value: "10-15% - Daycare, school supplies, and activities." },
            { label: "Transportation", value: "12-15% - Costs increase with multiple vehicles." },
            { label: "Savings", value: "15-20% - Emergency funds and future planning." },
          ],
        },
        {
          title: "Golden Years Living (Retirees)",
          description: "Typical spending benchmarks for retirees.",
          details: [
            { label: "Housing Costs", value: "25-30% - Downsizing can help manage costs." },
            { label: "Healthcare", value: "10-15% - Medical expenses increase with age." },
            { label: "Groceries", value: "10-12% - Maintaining a healthy diet." },
            { label: "Entertainment & Travel", value: "10-15% - Hobbies and leisure activities." },
            { label: "Transportation", value: "5-8% - Fewer daily commutes reduce expenses." },
            { label: "Savings/Investments", value: "10-15% - Focus on preservation after retirement." },
          ],
        },
      ].map((category, index) => (
        <Card key={index} id={category.title.toLowerCase().replace(/\s+/g, "-")}>
          <CardHeader>
            <CardTitle>{category.title}</CardTitle>
            <CardDescription>{category.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {category.details.map((detail, idx) => (
              <div key={idx} className="mb-2">
                <h3 className="font-semibold">{detail.label}:</h3>
                <p>{detail.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}