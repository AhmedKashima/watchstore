
'use client';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import toast from 'react-hot-toast';

// This is our main component
export default function AuthModal({ isOpen, onClose }) {
  // State to switch between "Sign In" and "Sign Up"
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        
        {/* The blurry background */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        {/* The Modal itself */}
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-8 text-right shadow-2xl shadow-black/50 transition-all">
                
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 left-4 text-slate-500 hover:text-white transition"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>

                {/* Tabs (Login / Register) */}
                <div className="flex justify-center gap-2 mb-8">
                  <TabButton 
                    text="تسجيل الدخول" 
                    isActive={activeTab === 'login'}
                    onClick={() => setActiveTab('login')}
                  />
                  <TabButton 
                    text="حساب جديد" 
                    isActive={activeTab === 'register'}
                    onClick={() => setActiveTab('register')}
                  />
                </div>

                {/* Show the correct form based on the active tab */}
                {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

// --- Sub-Components for the Modal ---

// 1. The Login Form
const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/login/`, 
          { email, password } 
        );
        
        // Save user data and token to localStorage
        localStorage.setItem('userInfo', JSON.stringify(data));
        
        toast.success('تم تسجيل الدخول بنجاح!');
  
        // Wait a moment then reload to see admin changes
        setTimeout(() => {
          window.location.reload(); 
        }, 1000);
  
      } catch (err) {
        setError("فشل تسجيل الدخول. تأكد من بريدك الإلكتروني وكلمة المرور.");
        toast.error("فشل تسجيل الدخول!");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField 
          label="البريد الإلكتروني" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <InputField 
          label="كلمة المرور" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div>
          <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-black bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:ring-offset-slate-900 transition-all disabled:opacity-50">
            {loading ? 'الرجاء الانتظار...' : 'دخول'}
          </button>
        </div>
      </form>
    );
  };
  

// 2. The Registration Form
const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
  
      if (password.length < 6) {
        setError("يجب أن تكون كلمة المرور 6 أحرف على الأقل.");
        setLoading(false);
        return;
      }
  
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/register/`,
          { name, email, password }
        );
        
        toast.success('تم إنشاء حسابك بنجاح! يمكنك الآن تسجيل الدخول.');
        
        // Optionally, switch to login tab after successful registration
        // For now, we'll just inform the user.
        
      } catch (err) {
        setError(err.response?.data?.detail || "حدث خطأ ما. قد يكون البريد مسجلاً مسبقاً.");
        toast.error("فشل إنشاء الحساب.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField 
          label="الاسم الكامل" 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
        />
        <InputField 
          label="البريد الإلكتروني" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <InputField 
          label="كلمة المرور" 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div>
          <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-black bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:ring-offset-slate-900 transition-all disabled:opacity-50">
            {loading ? 'جاري الإنشاء...' : 'إنشاء حساب'}
          </button>
        </div>
      </form>
    );
  };

// 3. A reusable Input Field component
function InputField({ label, type, value, onChange, required }) {
    return (
      <div>
        <label className="block text-sm font-bold text-slate-300 text-right mb-2">
          {label}
        </label>
        <div className="mt-1">
          <input
            type={type}
            required={required}
            value={value}
            onChange={onChange}
            className="appearance-none text-right block w-full px-4 py-3 border border-slate-700 rounded-lg shadow-sm bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition"
          />
        </div>
      </div>
    );
  }
  
// 4. A reusable Tab Button component
function TabButton({ text, isActive, onClick }) {
    return (
      <button
        onClick={onClick}
        className={`px-6 py-2 text-sm font-bold rounded-full transition-all
          ${isActive 
            ? 'bg-amber-500 text-black' 
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          }`}
      >
        {text}
      </button>
    );
  }
