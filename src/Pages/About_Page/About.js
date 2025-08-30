"use client";
import React from "react";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  Users,
  Smile,
  HeartHandshake,
  Globe,
  Award,
} from "lucide-react";

const About = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-50 via-white to-blue-50 py-20 px-6 text-center overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block px-6 py-2 border-2 border-pink-500 rounded-full text-pink-600 font-semibold mb-6 animate-bounce">
            About Us
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 animate-fade-down">
            Welcome to <span className="text-pink-600">Our Store</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-up">
            Discover fashion, lifestyle, and everything in between — curated
            with love, shipped with care, and trusted by thousands worldwide.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
          alt="Our Store"
          className="rounded-2xl shadow-lg transform hover:-translate-y-3 hover:scale-105 transition duration-700 animate-float"
        />
        <div className="space-y-5 animate-fade-right">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed">
            Started with a simple idea: making fashion and lifestyle accessible
            to everyone. From day one, we focused on curating collections that
            combine quality, style, and affordability.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Today, we proudly serve thousands of happy customers worldwide,
            continuing to innovate and grow with every step we take.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-12 animate-fade-down">
          Why Choose Us?
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <ShoppingBag className="w-10 h-10 text-pink-600 mx-auto" />,
              title: "Wide Range",
              desc: "Thousands of curated products in one place.",
            },
            {
              icon: <Truck className="w-10 h-10 text-pink-600 mx-auto" />,
              title: "Fast Delivery",
              desc: "Quick and reliable shipping at your doorstep.",
            },
            {
              icon: <ShieldCheck className="w-10 h-10 text-pink-600 mx-auto" />,
              title: "Secure Shopping",
              desc: "Safe payments and easy returns.",
            },
            {
              icon: <Users className="w-10 h-10 text-pink-600 mx-auto" />,
              title: "Trusted by Many",
              desc: "Thousands of happy customers worldwide.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transform hover:-translate-y-2 transition duration-500 animate-fade-up"
            >
              {item.icon}
              <h3 className="font-semibold text-lg mt-4">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 md:px-20 text-center">
        <Smile className="w-16 h-16 text-pink-600 mx-auto mb-4 animate-bounce" />
        <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
        <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed animate-fade-up">
          To create an affordable and enjoyable shopping experience where
          customers can find products they love, backed with excellent service
          and care.
        </p>
      </section>

      {/* Our Values Section */}
      <section className="bg-gray-50 py-20 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-12 animate-fade-down">
          Our Core Values
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <HeartHandshake className="w-12 h-12 text-pink-600 mx-auto" />,
              title: "Customer First",
              desc: "We listen, we care, and we deliver value.",
            },
            {
              icon: <Globe className="w-12 h-12 text-pink-600 mx-auto" />,
              title: "Global Reach",
              desc: "Connecting people with products across the globe.",
            },
            {
              icon: <Award className="w-12 h-12 text-pink-600 mx-auto" />,
              title: "Quality Assurance",
              desc: "Every product is tested and curated with trust.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transform hover:scale-105 transition duration-500 animate-fade-up"
            >
              {item.icon}
              <h3 className="font-semibold text-xl mt-4">{item.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-100 py-20 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-12 animate-fade-down">
          Meet Our Team
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { name: "Sarah Johnson", role: "Founder & CEO" },
            { name: "David Smith", role: "Head of Marketing" },
            { name: "Emily Brown", role: "Customer Support" },
            { name: "Michael Lee", role: "Logistics Manager" },
          ].map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 transform hover:-translate-y-2 animate-fade-up"
            >
              <img
                src={`https://randomuser.me/api/portraits/${
                  idx % 2 === 0 ? "women" : "men"
                }/${20 + idx}.jpg`}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-pink-500"
              />
              <h3 className="font-semibold text-lg">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="bg-pink-600 py-16 px-6 text-center text-white">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-fade-down">
          Join Our Journey
        </h2>
        <p className="max-w-2xl mx-auto mb-6 animate-fade-up">
          Be a part of our growing family. Shop with us and experience the
          difference.
        </p>
        <button className="bg-white text-pink-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition transform hover:scale-105">
          Shop Now
        </button>
      </section>
    </div>
  );
};

export default About;
