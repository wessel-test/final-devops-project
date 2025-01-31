"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Data for images
const images = [
  {
    title: "Emergency Preparedness",
    description:
      "Saving money gives you a safety net for unexpected emergencies, like medical expenses, car repairs, or even job loss.",
    src: "https://images.pexels.com/photos/7680480/pexels-photo-7680480.jpeg",
    id: "emergency-preparedness",
  },
  {
    title: "Financial Independence",
    description: "Savings allow you to live without relying on paycheck-to-paycheck income or loans.",
    src: "https://images.pexels.com/photos/6266641/pexels-photo-6266641.jpeg",
    id: "financial-independence",
  },
  {
    title: "Achieving Life Goals",
    description:
      "Whether it's buying a home, starting a business, or paying for education, saving helps you fund the big milestones in your life.",
    src: "https://images.pexels.com/photos/7599735/pexels-photo-7599735.jpeg",
    id: "achieving-life-goals",
  },
  {
    title: "Travel and Entertainment",
    description:
      "Saving lets you experience joys like exploring the world or attending concerts without worrying about finances.",
    src: "https://images.pexels.com/photos/5042248/pexels-photo-5042248.jpeg",
    id: "travel-entertainment",
  },
  {
    title: "Retirement Planning",
    description:
      "By saving now, you can secure your future and enjoy a comfortable lifestyle after retiring from work.",
    src: "https://images.pexels.com/photos/5961944/pexels-photo-5961944.jpeg",
    id: "retirement-planning",
  },
];

// Data for savings tips
const savingsTips = [
  {
    title: "Emergency Preparedness",
    description: "Tips to prepare for emergencies.",
    tips: [
      { heading: "Set a Clear Savings Goal", text: "Start by calculating how much you’d need to cover 3-6 months of essential expenses, like rent, food, and utilities. If that feels overwhelming, break it down into smaller milestones, such as saving for one month’s worth of expenses first. Use budgeting tools or calculators to determine an exact amount that works for your situation." },
      { heading: "Automate Your Savings", text: "Open a separate savings account specifically for emergencies and set up an automatic transfer from your paycheck or checking account. Even small amounts, like $10 a week, can add up over time. Automating removes the temptation to spend and keeps you consistent." },
      { heading: "Cut Unnecessary Expenses", text: "Review your spending habits and identify areas where you can cut back, such as dining out or unused subscriptions. Redirect those savings into your emergency fund. For example, skipping one coffee shop visit per week could save you $20 monthly." },
      { heading: "Use Windfalls Wisely", text: "Whenever you receive unexpected money—like a tax refund, bonus, or gift—put at least a portion of it into your emergency fund. This is an easy way to boost your savings without affecting your budget." },
      { heading: "Replenish After Use", text: "If you ever need to dip into your emergency fund, make it a priority to replenish it as soon as possible. Treat it as an ongoing project so you’re always prepared for the unexpected." },
    ],
  },
  {
    title: "Financial Independence",
    description: "Tips to achieve financial freedom.",
    tips: [
      { heading: "Track Your Spending", text: "Start by understanding where your money goes each month. Use a budgeting app or spreadsheet to categorize expenses and identify areas where you can save. Awareness is the first step toward taking control of your finances." },
      { heading: "Pay Yourself First", text: "Before paying bills or spending on non-essentials, set aside a portion of your income for savings—this could be 10% of each paycheck or whatever amount fits your budget. This habit ensures you’re prioritizing yourself over other financial obligations." },
      { heading: "Eliminate High-Interest Debt", text: "Work on paying off credit cards or other high-interest loans as quickly as possible. Financial independence is easier to achieve when you’re not burdened by debt payments." },
      { heading: "Build Multiple Income Streams", text: "Explore side hustles or freelance work to increase your income and funnel the extra earnings into savings or investments. This diversifies your income and accelerates your path to independence." },
      { heading: "Invest in Your Future", text: "Consider opening an investment account or contributing more to retirement funds. Long-term growth through investments can significantly boost your financial freedom." },
    ],
  },
  {
    title: "Achieving Life Goals",
    description: "Tips to achieve your personal goals.",
    tips: [
      { heading: "Define Your Goal Clearly", text: "Whether it’s buying a home or starting a business, write down exactly what you’re saving for and how much it will cost. Break the total amount into smaller milestones with deadlines to make it feel more achievable." },
      { heading: "Create a Dedicated Savings Account", text: "Open a separate account specifically for this goal and nickname it (e.g., “Dream Home Fund”). This keeps the money distinct from other savings and prevents accidental spending." },
      { heading: "Cut Back on Luxuries Temporarily", text: "Identify non-essential expenses—like dining out or premium subscriptions—that you can reduce while working toward your goal. Redirect these funds into your dedicated savings account." },
      { heading: "Earn Extra Income", text: "Take on freelance work, sell unused items online, or monetize hobbies to generate additional income that goes directly toward your goal." },
      { heading: "Celebrate Milestones", text: "Reward yourself when you hit smaller milestones along the way (e.g., saving the first $1,000). This keeps you motivated without derailing progress." },
    ],
  },
  {
    title: "Travel and Entertainment",
    description: "Tips to save for fun experiences.",
    tips: [
      { heading: "Set a Fun Budget", text: "Decide how much you’ll need for the trip or event and break it down into manageable monthly savings goals. For example, if a vacation costs $2,000 and is six months away, aim to save about $333 per month." },
      { heading: "Use Travel Deals and Discounts", text: "Research deals on flights, accommodations, and events early on to save money upfront. Apps like Hopper or Skyscanner can help you find cheaper travel options." },
      { heading: "Cut Back on Everyday Luxuries", text: "Temporarily reduce spending on things like eating out or impulse buys and redirect that money toward your travel fund instead." },
      { heading: "Sell Unused Items", text: "Declutter your home by selling items you no longer need on platforms like eBay or Facebook Marketplace. Use the proceeds to boost your entertainment savings." },
      { heading: "Save Windfalls for Fun Experiences", text: "Allocate bonuses, tax refunds, or gifts toward this fund so you can enjoy guilt-free experiences without dipping into regular savings." },
    ],
  },
  {
    title: "Retirement Planning",
    description: "Tips to plan for retirement.",
    tips: [
      { heading: "Start Early with Small Contributions", text: "Open a retirement account (like an IRA) if you don’t already have one, and begin contributing whatever amount fits your budget—even $50 per month can grow significantly over time due to compound interest." },
      { heading: "Maximize Employer Benefits", text: "If your employer offers a match program, contribute enough to take full advantage of the match—it’s essentially free money for your future." },
      { heading: "Automate Contributions", text: "Set up automatic transfers from your paycheck into retirement accounts so saving becomes effortless and consistent." },
      { heading: "Reduce Unnecessary Expenses", text: "Free up more money for retirement by cutting back on discretionary spending now—this could mean fewer takeout meals or downgrading subscription services." },
      { heading: "Increase Contributions Gradually", text: "As your income grows, increase the percentage of earnings you contribute toward retirement accounts annually—aim for at least 15% of your income eventually." },
    ],
  },
];

// Reusable Card Component
function SavingsCard({
  title,
  description,
  tips,
}: {
  title: string;
  description: string;
  tips: { heading: string; text: string }[];
}) {
  const cardId = title.toLowerCase().replace(/\s+/g, "-"); // Unique ID for the card section
  return (
    <Card id={cardId}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {tips.map((tip, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{tip.heading}</h3>
            <p>{tip.text}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function SaveMorePage() {
  return (
    <div className="flex flex-col gap-8 p-4">
      <h2 className="text-center text-3xl font-bold">
        <span className="underline">Why</span> do you want to save money?
      </h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {images.map((image, index) => (
          <div key={index} className="relative transition-transform duration-300 hover:scale-105">
            <div className="absolute top-0 left-0 right-0 p-4 bg-white bg-opacity-75 text-center rounded-t-lg">
              <h3 className="text-lg font-semibold">{image.title}</h3>
              <p className="text-sm">{image.description}</p>
            </div>
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
                className="rounded-b-lg w-full h-[800px] object-cover"
              />
            </a>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <h2 className="text-center text-3xl font-bold">
        Start preparing for your savings journey <span className="underline">NOW!</span>
      </h2>

      {/* Savings Tips Section */}
      <div className="grid gap-6">
        {/* Assuming `savingsTips` is already defined */}
        {savingsTips.map((tip, index) => (
          <SavingsCard
            key={index}
            title={tip.title}
            description={tip.description}
            tips={tip.tips}
          />
        ))}
      </div>
    </div>
  );
}