"use client";
import React from "react";
import {
  Mail,
  PhoneCall,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";

const Contact = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 via-white to-pink-50 py-20 px-6 text-center overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block px-6 py-2 border-2 border-blue-500 rounded-full text-blue-600 font-semibold mb-6 animate-bounce">
            Contact Us
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 animate-fade-down">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-up">
            Have questions, feedback, or need help? We’d love to hear from you.
            Our team is ready to assist you anytime.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6 md:px-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {[
          { icon: <Mail className="w-10 h-10 text-blue-600 mx-auto" />, title: "Email", desc: "support@shop.com" },
          { icon: <PhoneCall className="w-10 h-10 text-blue-600 mx-auto" />, title: "Phone", desc: "+1 234 567 8900" },
          { icon: <MapPin className="w-10 h-10 text-blue-600 mx-auto" />, title: "Address", desc: "New Delhi, India" },
          { icon: <Clock className="w-10 h-10 text-blue-600 mx-auto" />, title: "Hours", desc: "Mon-Sat (9am - 9pm)" },
        ].map((info, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transform hover:-translate-y-2 transition duration-500 animate-fade-up"
          >
            {info.icon}
            <h3 className="font-semibold text-lg mt-4">{info.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{info.desc}</p>
          </div>
        ))}
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 px-6 md:px-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-right">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              rows="4"
              placeholder="Message"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition transform hover:scale-105">
              <Send className="w-5 h-5" /> Send Message
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div className="rounded-2xl overflow-hidden shadow-lg animate-fade-left">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.79604818128!2d77.068899!3d28.5272803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2b2c75b1e63%3A0x9a0fbb5c0f1561d6!2sDelhi!5e0!3m2!1sen!2sin!4v1676543210"
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Social Links */}
      <section className="bg-gray-50 py-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Follow Us</h2>
        <div className="flex justify-center gap-6">
          {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="p-3 bg-white rounded-full shadow hover:bg-blue-50 transition transform hover:scale-110"
            >
              <Icon className="w-6 h-6 text-blue-600" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
