
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { 
  PencilSquareIcon, 
  TrashIcon, 
  PlusCircleIcon,
  ArrowRightOnRectangleIcon,
  WrenchScrewdriverIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

// --- Main Admin Page Component ---
export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalValue: 0, totalItems: 0 });
  const router = useRouter();

  // Security Check: Ensure user is an admin
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || !userInfo.isAdmin) {
      toast.error("غير مصرح لك بالدخول.");
      router.push('/'); 
    } else {
      fetchProducts();
    }
  }, [router]);

  // Fetch all products from the backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // We need to fetch ALL products, including inactive ones, for the admin
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products/`);
      setProducts(data);
      calculateStats(data);
    } catch (error) {
      toast.error('فشل في جلب المنتجات.');
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics from the product list
  const calculateStats = (allProducts) => {
    const totalItems = allProducts.length;
    const totalValue = allProducts.reduce((sum, item) => sum + parseFloat(item.price), 0);
    setStats({ totalValue, totalItems });
  };
  
  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    toast.success('تم تسجيل الخروج.');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* --- Sidebar --- */}
      <aside className="w-64 bg-slate-900 p-6 flex flex-col justify-between border-l border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-12">
            <WrenchScrewdriverIcon className="h-8 w-8 text-amber-500" />
            <h1 className="text-xl font-black text-white">لوحة التحكم</h1>
          </div>
          <nav className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-3 bg-slate-800 text-white p-3 rounded-lg font-bold">
              <HomeIcon className="h-5 w-5" />
              <span>إدارة المنتجات</span>
            </a>
            {/* Add more links here if needed */}
          </nav>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 hover:bg-red-500/10 p-3 rounded-lg transition"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5" />
          <span>تسجيل الخروج</span>
        </button>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-white">مرحباً أيها المدير!</h2>
          <button className="bg-amber-500 text-black font-bold py-2 px-4 rounded-full flex items-center gap-2 hover:bg-amber-400 transition">
            <PlusCircleIcon className="h-6 w-6" />
            <span>إضافة ساعة جديدة</span>
          </button>
        </header>

        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <StatCard title="إجمالي المنتجات" value={stats.totalItems.toLocaleString('ar-SA')} />
          <StatCard title="قيمة المخزون (ريال)" value={stats.totalValue.toLocaleString('ar-SA')} />
        </div>

        {/* --- Products Table --- */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center text-slate-500">جاري تحميل المنتجات...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="border-b border-slate-800">
                  <tr>
                    <Th>صورة</Th>
                    <Th>اسم الساعة</Th>
                    <Th>السعر (ريال)</Th>
                    <Th>الحالة</Th>
                    <Th>إجراءات</Th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <ProductRow key={p.id} product={p} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


// --- Sub-Components for the Admin Page ---

// A reusable Table Header cell
const Th = ({ children }) => <th className="p-4 font-bold text-slate-400">{children}</th>;

// A reusable Table Data cell
const Td = ({ children, className }) => <td className={`p-4 border-t border-slate-800 ${className}`}>{children}</td>;

// Stat Card component
const StatCard = ({ title, value }) => (
  <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
    <h3 className="text-slate-400 font-bold text-sm mb-2">{title}</h3>
    <p className="text-white text-3xl font-black">{value}</p>
  </div>
);

// Product Row for the table
const ProductRow = ({ product }) => (
  <tr className="hover:bg-slate-800/50 transition-colors">
    <Td>
      <img src={product.image || '/placeholder.png'} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
    </Td>
    <Td className="font-bold text-white">{product.name}</Td>
    <Td>{Number(product.price).toLocaleString('ar-SA')}</Td>
    <Td>
      {product.is_active ? (
        <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded-full">متاح</span>
      ) : (
        <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded-full">مخفي</span>
      )}
    </Td>
    <Td>
      <div className="flex gap-2">
        <button className="text-slate-400 hover:text-amber-500 p-2 rounded-full transition"><PencilSquareIcon className="h-5 w-5" /></button>
        <button className="text-slate-400 hover:text-red-500 p-2 rounded-full transition"><TrashIcon className="h-5 w-5" /></button>
      </div>
    </Td>
  </tr>
);
