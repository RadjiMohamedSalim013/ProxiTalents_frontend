// src/components/home/TestimonialsSection.tsx
import React from 'react';
import { testimonials } from '../../data/testimonials.data';

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Ils parlent de WAKAWAKA</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
              <p className="italic text-gray-700 mb-4">“{item.message}”</p>
              <h4 className="font-semibold text-lg">{item.nom}</h4>
              <p className="text-sm text-gray-500">{item.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
