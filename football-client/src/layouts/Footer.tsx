import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
} from "../components/Icon/AntdIcons";

function Footer() {
  return (
    <footer
      className="mt-20 text-white rounded-t-3xl"
      style={{
         background: "linear-gradient(to right, rgba(192, 235, 106, 0.7), #485550)"
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Info */}
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-wide leading-tight">
            ⚽ Football Hub
          </h2>
          <p className="text-sm text-white leading-relaxed font-medium">
            Discover top football players, explore stats, and stay updated with
            the latest in world football.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-base">
            <li>
              <a
                href="/"
                className="text-white hover:text-green-600 transition font-medium"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/players"
                className="text-white hover:text-green-600 transition font-medium"
              >
                Players
              </a>
            </li>
            <li>
              <a
                href="/teams"
                className="text-white hover:text-green-600 transition font-medium"
              >
                Teams
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-white hover:text-green-600 transition font-medium"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold text-white">Follow Us</h3>
          <div className="flex gap-4 text-3xl">
            <a href="#" className="text-white hover:text-green-600 transition">
              <FacebookFilled />
            </a>
            <a href="#" className="text-white hover:text-green-600 transition">
              <TwitterSquareFilled />
            </a>
            <a href="#" className="text-white hover:text-green-600 transition">
              <InstagramFilled />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#ffffff]/30 text-center text-sm text-white py-4 font-medium tracking-wide">
        &copy; {new Date().getFullYear()} Football Hub. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
