import React, { useState, useMemo, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import ModelCard from '../components/ModelCard';
import { modelsAPI } from '../services/api';

const Models = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch models on component mount and when filters change
  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        setError(null);
        const filters = {};
        if (selectedTier !== 'all') filters.tier = selectedTier;
        if (selectedCategory !== 'all') filters.category = selectedCategory;
        
        const data = await modelsAPI.fetchModels(filters);
        setModels(data.models || []);
      } catch (err) {
        console.error('Error fetching models:', err);
        setError('Failed to load models. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [selectedTier, selectedCategory]);

  const tiers = [
    { value: 'all', label: 'All Tiers' },
    { value: 'free', label: 'Free Tier' },
    { value: 'basic', label: 'Basic Tier' },
    { value: 'pro', label: 'Pro Tier' },
    { value: 'ultra', label: 'Ultra Tier' }
  ];

  const categories = [
    { value: 'all', label: 'All Types' },
    { value: 'text', label: 'Chat & Completion' },
    { value: 'image', label: 'Images & Generation' },
    { value: 'audio', label: 'Audio & Speech' },
    { value: 'video', label: 'Video' }
  ];

  const filteredModels = useMemo(() => {
    return models.filter(model => {
      const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           model.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesSearch;
    });
  }, [models, searchQuery]);

  const getTierColor = (tier) => {
    switch (tier) {
      case 'free':
        return 'bg-green-500/20 text-green-400 border-green-500/50 hover:bg-green-500/30';
      case 'basic':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50 hover:bg-blue-500/30';
      case 'pro':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50 hover:bg-purple-500/30';
      case 'ultra':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50 hover:bg-orange-500/30';
      default:
        return 'bg-gray-700/50 text-gray-300 border-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Models
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Access a wide range of powerful AI models through our platform
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-900/50 border-gray-800 text-white placeholder-gray-500 focus:border-purple-500 h-12"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-6 mb-10">
          {/* Category Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Filter by Purpose</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`cursor-pointer px-4 py-2 transition-all ${
                    selectedCategory === cat.value
                      ? 'bg-purple-500 text-white border-purple-500'
                      : 'bg-gray-800/50 text-gray-300 border-gray-700 hover:bg-gray-800'
                  }`}
                >
                  {cat.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tier Filter */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-3">Filter by Tier</h3>
            <div className="flex flex-wrap gap-2">
              {tiers.map((tier) => (
                <Badge
                  key={tier.value}
                  onClick={() => setSelectedTier(tier.value)}
                  className={`cursor-pointer px-4 py-2 transition-all ${
                    selectedTier === tier.value
                      ? tier.value === 'all' 
                        ? 'bg-gray-700 text-white border-gray-600'
                        : getTierColor(tier.value)
                      : 'bg-gray-800/50 text-gray-300 border-gray-700 hover:bg-gray-800'
                  }`}
                >
                  {tier.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400 text-sm">
            Showing <span className="text-white font-semibold">{filteredModels.length}</span> models
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-purple-400" />
            <p className="text-gray-400 text-lg">Loading models...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-400 text-lg">{error}</p>
          </div>
        ) : filteredModels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModels.map((model) => (
              <ModelCard key={model.base_model} model={model} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No models found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Models;