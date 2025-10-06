import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, Activity, TrendingUp } from 'lucide-react';

const ModelCard = ({ model }) => {
  const navigate = useNavigate();
  
  const getTierColor = (tier) => {
    switch (tier?.toLowerCase()) {
      case 'free':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'basic':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'pro':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'ultra':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const provider = model.proxy_providers?.[0];
  const metrics = provider?.performance_metrics;

  const handleCardClick = () => {
    navigate(`/playground/${model.category}`, { state: { model } });
  };

  return (
    <Card 
      className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer group hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1"
      onClick={handleCardClick}
    >
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {model.logoUrl && (
              <img 
                src={model.logoUrl} 
                alt={model.name}
                className="w-10 h-10 rounded-lg bg-white/5 p-2"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div>
              <CardTitle className="text-white text-lg group-hover:text-purple-400 transition-colors">
                {model.name}
              </CardTitle>
              <p className="text-xs text-gray-500 mt-1">{provider?.owned_by}</p>
            </div>
          </div>
          {model.tier && (
            <Badge className={`${getTierColor(model.tier)} text-xs capitalize`}>
              {model.tier}
            </Badge>
          )}
        </div>
        <CardDescription className="text-gray-400 text-sm line-clamp-2">
          {model.description || 'No description available.'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Features */}
        {model.features && model.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {model.features.slice(0, 3).map((feature, idx) => (
              <Badge 
                key={idx} 
                variant="outline" 
                className="text-xs bg-gray-800/50 border-gray-700 text-gray-300"
              >
                {feature.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        )}

        {/* Performance Metrics */}
        {metrics && (
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-800">
            {metrics.latency && metrics.latency !== 'N/A' && (
              <div className="flex flex-col items-center space-y-1">
                <Clock className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs text-gray-400">{metrics.latency}s</span>
              </div>
            )}
            {metrics.throughput && metrics.throughput !== 'N/A' && (
              <div className="flex flex-col items-center space-y-1">
                <TrendingUp className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs text-gray-400">{metrics.throughput} t/s</span>
              </div>
            )}
            {metrics.uptime_percentage && metrics.uptime_percentage !== 'N/A' && (
              <div className="flex flex-col items-center space-y-1">
                <Activity className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs text-gray-400">{metrics.uptime_percentage}%</span>
              </div>
            )}
          </div>
        )}

        {/* Context Window */}
        {model.context_window > 0 && (
          <div className="text-xs text-gray-500 pt-1">
            Context: {model.context_window.toLocaleString()} tokens
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ModelCard;