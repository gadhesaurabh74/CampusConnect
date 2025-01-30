import React, { useEffect, useRef } from 'react';
import { Printer, Coffee, CreditCard, Clock, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const featuresRef = useRef(null);

  const features = [
    {
      icon: <Printer className="h-8 w-8 text-blue-500" />,
      title: "Smart Printing",
      description: "Queue your prints from anywhere on campus. Get notifications when they're ready."
    },
    {
      icon: <Coffee className="h-8 w-8 text-orange-500" />,
      title: "Campus Dining",
      description: "Order ahead from the canteen. Skip the lines, enjoy your break."
    },
    {
      icon: <CreditCard className="h-8 w-8 text-green-500" />,
      title: "Easy Payments",
      description: "One balance for all campus services. Top up easily, track expenses."
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      title: "Real-time Updates",
      description: "Track your orders and print jobs in real-time. Never miss a notification."
    },
    {
      icon: <Shield className="h-8 w-8 text-red-500" />,
      title: "Secure Platform",
      description: "Your data is protected with enterprise-grade security."
    },
    {
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      title: "Community",
      description: "Connect with other students, share resources, and save time together."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (featuresRef.current) {
      const featureElements = featuresRef.current.querySelectorAll('.feature-card');
      featureElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to CampusConnect
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your all-in-one platform for campus services
            </p>
            <div className="flex justify-center space-x-4">
                <Link to="/print">
              <button
                className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
              >
                 Get Started As Service Provider
              </button>
                </Link>
              <Link to='/homepage'>
              <button
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
              >
                 Get Started As Student
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            Everything You Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card opacity-0 translate-y-10 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-1000 transform hover:scale-105 border border-gray-100"
              >
                <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to get started?
          </h2>
          <div className="flex justify-center space-x-4">
            <button
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-300"
            >
              Get Started As Student
            </button>
            <button
              className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              Get Started As Service Provider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
