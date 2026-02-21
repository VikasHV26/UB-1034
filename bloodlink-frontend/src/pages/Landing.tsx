import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: "👤",
    title: "For Patients",
    description: "Request blood with one click and track approvals in real-time."
  },
  {
    icon: "🏥",
    title: "For Hospitals",
    description: "Manage patient requests and access blood inventory instantly."
  },
  {
    icon: "🩸",
    title: "For Blood Banks",
    description: "Maintain inventory and respond to urgent blood requests."
  },
  {
    icon: "👨‍💼",
    title: "For Admins",
    description: "Monitor system analytics and manage all stakeholders."
  }
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass border-b border-red-600/20">
        <div className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">🩸</span>
            <h1 className="text-2xl md:text-3xl font-bold text-red-600">BloodLink</h1>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-12 py-20">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
                Smart Blood Management System
              </h2>
              <div className="h-1 w-24 bg-white/40 mx-auto rounded-full"></div>
            </div>

            <p className="text-lg md:text-xl max-w-3xl mx-auto text-red-50 leading-relaxed">
              Connecting Patients, Hospitals, and Blood Banks in real-time.
              <span className="block mt-4 font-semibold text-white">
                ⚡ Fast approvals • 🎯 Smart inventory management • 🚨 Emergency-ready system for saving lives
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button
                onClick={() => navigate("/login")}
                className="btn btn-lg bg-white text-red-600 hover:bg-gray-100 font-bold shadow-professional-xl hover:shadow-professional-lg"
              >
                🚀 Get Started Now
              </button>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn btn-lg bg-white/20 text-white border-2 border-white hover:bg-white/30 font-bold"
              >
                📚 Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="section bg-gradient-to-b from-gray-50 to-white">
        <div className="section-container">
          <h3 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Features for Everyone
          </h3>
          <p className="text-center text-gray-600 text-lg mb-16 max-w-2xl mx-auto">
            Powerful tools designed for every stakeholder in the blood management ecosystem
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="card-hover shadow-professional p-8 rounded-2xl border border-gray-100 bg-white"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="hero-gradient-dark py-16 md:py-20 px-6 md:px-12">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div className="space-y-3">
              <div className="text-6xl font-bold">∞</div>
              <p className="text-red-100 text-lg">Lives Saved</p>
            </div>
            <div className="space-y-3">
              <div className="text-6xl font-bold">24/7</div>
              <p className="text-red-100 text-lg">Emergency Support</p>
            </div>
            <div className="space-y-3">
              <div className="text-6xl font-bold">⚡</div>
              <p className="text-red-100 text-lg">Real-time Updates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Section */}
      <div className="section bg-white">
        <div className="section-container">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose BloodLink?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🔒', title: 'Secure', desc: 'Enterprise-grade security for sensitive health data' },
              { icon: '⚡', title: 'Fast', desc: 'Real-time notifications and instant blood matching' },
              { icon: '📊', title: 'Smart', desc: 'AI-powered inventory management and analytics' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="hero-gradient-primary py-16 md:py-20 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="section-container relative z-10 text-center text-white space-y-8">
          <h3 className="text-4xl md:text-5xl font-bold">
            Ready to Save Lives?
          </h3>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Join thousands of healthcare professionals making a difference in their communities
          </p>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-lg bg-white text-red-600 hover:bg-gray-100 font-bold shadow-professional-xl hover:shadow-professional-lg inline-block"
          >
            Start Your Journey →
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-6 md:px-12 border-t border-gray-800">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <span>🩸</span>BloodLink
              </h4>
              <p className="text-sm text-gray-400">Smart Blood Management System</p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>© 2026 BloodLink • Built for National Hackathon</p>
            <p className="mt-2">Connecting communities. Saving lives. One drop at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}