import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { CheckCircle2, RefreshCw, Smartphone, ShieldCheck, ArrowRight, Zap, Database, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';


export default function SecondHandPhones() {
  const benefits = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Quality Guaranteed",
      description: "Our refurbished devices use original parts. We only replace batteries with premium new ones—no cheap body swaps or low-quality screens."
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Trade-In Accepted",
      description: "Get credit towards your next phone. We accept trade-ins for working and unlocked devices (iOS/Android)."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Free Data Transfer",
      description: "Buy a phone from us and we'll transfer your contacts, photos, and messages from your old device for free."
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Bundle Savings",
      description: "Get exclusive discounts on cases, chargers, cables, and screen protectors when you purchase a device."
    }
  ];


  return (
    <div>
      <Helmet>
        <title>Buy Refurbished iPhones & Samsung Mayfield | Newcastle Quality Used Phones</title>
        <meta name="description" content="Premium refurbished iPhones and Samsung Galaxy phones in Mayfield. All devices include a warranty, new batteries, and original parts. Trade-ins welcome." />
        <meta property="og:title" content="Quality Used & Refurbished Phones - Mayfield Phone Repair" />
        <meta property="og:description" content="Looking for a reliable used phone? We stock high-quality refurbished devices with verified original components." />
