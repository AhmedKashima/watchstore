
'use client';
import { PhoneArrowUpRightIcon } from '@heroicons/react/24/solid';

export default function ProductCard({ product }) {
  
  // Format the price to be more readable (e.g., 5,000)
  const formattedPrice = new Intl.NumberFormat('ar-SA').format(product.price);

  // The WhatsApp message logic
  const handleWhatsAppInquiry = () => {
    const message = `
      مرحباً، أنا مهتم بشراء هذه الساعة:
      *${product.name}*
      - السعر: ${formattedPrice} ريال
      هل ما زالت متوفرة؟
    `.trim();
    
    // Use your actual phone number here
    const whatsappUrl = `https://wa.me/966XXXXXXXXX?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all hover:border-amber-500/50 hover:shadow-2xl hover:shadow-black/50">
      
      {/* Product Image */}
      <div className="relative w-full h-72 overflow-hidden">
        <img
          src={product.image || '/placeholder.png'} // Use a placeholder if no image
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent"></div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
        
        <p className="text-slate-400 mb-4 h-12 overflow-hidden">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          {/* Price */}
          <p className="text-2xl font-black text-amber-500">
            {formattedPrice}
            <span className="text-base font-medium text-slate-400"> ريال</span>
          </p>
          
          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsAppInquiry}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-2 px-4 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-green-500/20"
          >
            <PhoneArrowUpRightIcon className="h-5 w-5" />
            <span>شراء عبر واتساب</span>
          </button>
        </div>
      </div>
    </div>
  );
}
