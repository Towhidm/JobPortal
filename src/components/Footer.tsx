"use client";
import { Facebook, Linkedin, Twitter, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B1120] text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">JobHunt</h2>
          <p className="mt-3 text-sm text-gray-300">
            Find your dream job or hire top talent. Connecting opportunities with skills.
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="#" aria-label="Facebook"><Facebook className="hover:text-gray-400" /></Link>
            <Link href="#" aria-label="LinkedIn"><Linkedin className="hover:text-gray-400" /></Link>
            <Link href="#" aria-label="Twitter"><Twitter className="hover:text-gray-400" /></Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link href="/jobs" className="hover:text-gray-100">Browse Jobs</Link></li>
            <li><Link href="/companies" className="hover:text-gray-100">Companies</Link></li>
            <li><Link href="/apply" className="hover:text-gray-100">How to Apply</Link></li>
            <li><Link href="/blog" className="hover:text-gray-100">Career Tips</Link></li>
          </ul>
        </div>

        {/* For Employers */}
        <div>
          <h3 className="text-lg font-semibold mb-4">For Employers</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link href="/post-job" className="hover:text-gray-100">Post a Job</Link></li>
            <li><Link href="/dashboard" className="hover:text-gray-100">Employer Dashboard</Link></li>
            <li><Link href="/pricing" className="hover:text-gray-100">Pricing & Plans</Link></li>
            <li><Link href="/support" className="hover:text-gray-100">Support</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex gap-2"><Mail className="w-4" /> support@jobhunt.com</li>
            <li className="flex gap-2"><Phone className="w-4" /> +880 1234 567890</li>
            <li className="flex gap-2"><MapPin className="w-4" /> Dhaka, Bangladesh</li>
          </ul>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 py-4 text-xs text-center text-gray-400">
        © {new Date().getFullYear()} JobHunt — All Rights Reserved.
      </div>
    </footer>
  );
}
