import { FiFacebook, FiGithub, FiLinkedin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-12 border-t border-gray-800">
      
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-white text-xl font-bold">
            AwaisJota Store
          </h2>
          <p className="text-sm mt-3 leading-6">
            Your one-stop shop for everything you need. Fast delivery,
            best prices, and trusted quality.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-4 text-lg">
            <a className="hover:text-white transition" href="https://web.facebook.com/" target="_blank"><FiFacebook /></a>
            <a className="hover:text-white transition" href="https://www.linkedin.com/in/awaisjota" target="_blank"><FiLinkedin /></a>
            <a className="hover:text-white transition" href="https://wa.me/923138062843" target="_blank"><FaWhatsapp /></a>
            <a className="hover:text-white transition" href="https://www.github.com/awaisjota" target="_blank"><FiGithub /></a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer"><a href="/">Home</a></li>
            <li className="hover:text-white cursor-pointer"><a href="/products">Products</a></li>
            <li className="hover:text-white cursor-pointer"><a href="/cart">Cart</a></li>
            <li className="hover:text-white cursor-pointer"><a href="/orders">Orders</a></li>
          </ul>
        </div>

        {/* HELP */}
        <div>
          <h3 className="text-white font-semibold mb-3">Help</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
            <li className="hover:text-white cursor-pointer">Support</li>
            <li className="hover:text-white cursor-pointer">FAQ</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} AwaisJota Store. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;