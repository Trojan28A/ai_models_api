import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Multiple AI Models',
      description: 'Access a wide range of powerful AI models from top providers.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Fast Performance',
      description: 'Optimized infrastructure for low-latency responses.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Reliable Uptime',
      description: 'Enterprise-grade reliability with 99%+ uptime.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-300">Powered by Leading AI Models</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              AI Models Hub
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            Access a wide range of powerful AI models through our unified platform.
            From text generation to image creation and audio processing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => navigate('/models')}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg group"
            >
              Explore Models
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => navigate('/playground')}
              size="lg"
              variant="outline"
              className="border-gray-700 text-gray-300 hover:bg-gray-800 px-8 py-6 text-lg"
            >
              Try Playground
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all group"
            >
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <div className="text-purple-400">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-gray-800">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              50+
            </div>
            <div className="text-gray-400">AI Models</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              99%
            </div>
            <div className="text-gray-400">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              10+
            </div>
            <div className="text-gray-400">Providers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;