// // 'use client'; // We use client side fetching for simplicity

// // import AuthModal from '../components/AuthModal';
// // import { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import ProductCard from '../components/ProductCard';

// // export default function Home() {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [isAuthOpen, setAuthOpen] = useState(false);
// //   // Fetch data from Django when the page loads
// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         const response = await axios.get('`${process.env.NEXT_PUBLIC_API_URL}`/api/products/');
// //         setProducts(response.data);
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching products:", error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchProducts();
// //   }, []);

// //   return (
// //     <div className="min-h-screen">
// //       {/* --- HEADER / NAVBAR --- */}
// //       <nav className="bg-white shadow-sm sticky top-0 z-50">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between h-16 items-center">
// //             <h1 className="text-2xl font-black text-gray-900">watchStore ⌚</h1>
            
// //             {/* Placeholder for Login Button (We will build this next) */}
// //               <button 
// //                 onClick={() => setAuthOpen(true)}
// //                 className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
// //               >
// //                 تسجيل الدخول
// //               </button>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* --- MAIN CONTENT --- */}
// //       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
// //         <div className="text-center mb-12">
// //           <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
// //             أحدث الساعات الفاخرة
// //           </h2>
// //           <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
// //             تسوق مجموعتنا الحصرية وتواصل معنا مباشرة للشراء.
// //           </p>
// //         </div>

// //         {/* --- LOADING STATE --- */}
// //         {loading ? (
// //           <div className="flex justify-center items-center h-64">
// //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
// //           </div>
// //         ) : (
// //           /* --- PRODUCT GRID --- */
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //             {products.map((product) => (
// //               <ProductCard key={product.id} product={product} />
// //             ))}
// //           </div>
// //         )}
        
// //         {/* Empty State Check */}
// //         {!loading && products.length === 0 && (
// //           <div className="text-center text-gray-500 mt-10">
// //             لا توجد ساعات مضافة حالياً.
// //           </div>
// //         )}

// //       </main>
// //     </div>
// //   );
// // }



// 'use client'; 

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import ProductCard from '../components/ProductCard';
// // 1. IMPORT THE MODAL HERE
// import AuthModal from '../components/AuthModal';

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // 2. ADD THIS STATE TO CONTROL THE POPUP
//   const [isAuthOpen, setAuthOpen] = useState(false);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get('`${process.env.NEXT_PUBLIC_API_URL}`/api/products/');
//         setProducts(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="min-h-screen">
//       <nav className="bg-white shadow-sm sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between h-16 items-center">
//             <h1 className="text-2xl font-black text-gray-900">watchStore ⌚</h1>
            
//             {/* 3. UPDATE THE BUTTON CLICK ACTION */}
//             <button 
//               onClick={() => setAuthOpen(true)}
//               className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition"
//             >
//               تسجيل الدخول
//             </button>
//           </div>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
//             أحدث الساعات الفاخرة
//           </h2>
//           <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
//             تسوق مجموعتنا الحصرية وتواصل معنا مباشرة للشراء.
//           </p>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {products.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}
        
//         {!loading && products.length === 0 && (
//           <div className="text-center text-gray-500 mt-10">
//             لا توجد ساعات مضافة حالياً.
//           </div>
//         )}

//       </main>

//       {/* 4. PLACE THE MODAL COMPONENT HERE (AT THE END) */}
//       <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} />

//     </div>
//   );
// }


'use client'; 

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import AuthModal from '../components/AuthModal';
import { UserCircleIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/`
        );
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <ShoppingBagIcon className="h-8 w-8 text-amber-500" />
              <h1 className="text-2xl font-black text-white tracking-wider">
                watch<span className="text-amber-500">Store</span>
              </h1>
            </div>
            
            {/* Login Button */}
            <button 
              onClick={() => setAuthOpen(true)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-full border border-slate-700 transition-all hover:border-amber-500/50"
            >
              <UserCircleIcon className="h-5 w-5" />
              <span className="text-sm font-bold">دخول الأعضاء</span>
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION (Banner) --- */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            فخامة <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600">الوقت</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed">
            اكتشف مجموعتنا الحصرية من الساعات الفاخرة. الأناقة التي تستحقها، بأسعار تنافسية. تواصل معنا مباشرة للشراء.
          </p>
          <a href="#collection" className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 px-10 rounded-full text-lg shadow-lg shadow-amber-500/20 transition-all transform hover:scale-105">
            تصفح المجموعة
          </a>
        </div>
      </div>

      {/* --- MAIN CONTENT (Collection) --- */}
      <main id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        <div className="flex items-center justify-between mb-12 border-b border-slate-800 pb-4">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <span className="w-2 h-8 bg-amber-500 rounded-full"></span>
            أحدث الساعات
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        {!loading && products.length === 0 && (
          <div className="text-center py-20 bg-slate-900 rounded-3xl border border-slate-800">
            <p className="text-slate-500 text-lg">لا توجد ساعات مضافة حالياً.</p>
          </div>
        )}

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-white mb-4">watch<span className="text-amber-500">Store</span></h2>
          <p className="text-slate-500">جميع الحقوق محفوظة © 2025</p>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} />

    </div>
  );
}