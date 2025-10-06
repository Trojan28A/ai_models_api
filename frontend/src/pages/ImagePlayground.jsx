import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Wand2, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useAPIKey } from '../contexts/APIKeyContext';
import { playgroundAPI } from '../services/api';
import { toast } from '../hooks/use-toast';

const ImagePlayground = () => {
  const location = useLocation();
  const model = location.state?.model;
  const { apiKey, hasAPIKey } = useAPIKey();
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getModelId = () => {
    if (!model) return '';
    const provider = model.proxy_providers?.[0];
    return provider?.id || model.base_model;
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    if (!hasAPIKey()) {
      toast({
        title: "API Key Required",
        description: "Please set your A4F.co API key in the navbar to use the playground.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);

    try {
      const response = await playgroundAPI.imageGeneration(
        apiKey,
        getModelId(),
        prompt
      );

      if (response.data && response.data[0] && response.data[0].url) {
        setGeneratedImage(response.data[0].url);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to generate image",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {model?.name || 'Image Model'} Playground
              </h1>
              <p className="text-gray-400">{model?.description}</p>
            </div>
            {model?.tier && (
              <Badge className="capitalize">
                {model.tier} Tier
              </Badge>
            )}
          </div>
          
          {!hasAPIKey() && (
            <Alert className="bg-yellow-500/10 border-yellow-500/50 text-yellow-400">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please set your A4F.co API key in the navbar to use this playground.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Generation Area */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-white text-lg">Generated Image</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center overflow-hidden">
                  {isLoading ? (
                    <div className="flex flex-col items-center space-y-4">
                      <Loader2 className="w-12 h-12 animate-spin text-purple-400" />
                      <p className="text-gray-400">Generating image...</p>
                    </div>
                  ) : generatedImage ? (
                    <img
                      src={generatedImage}
                      alt="Generated"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center space-y-2">
                      <Wand2 className="w-12 h-12 text-gray-600 mx-auto" />
                      <p className="text-gray-500">Enter a prompt to generate an image</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Input Form */}
            <form onSubmit={handleGenerate} className="mt-4">
              <div className="space-y-3">
                <Textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="bg-gray-900/50 border-gray-800 text-white resize-none"
                  rows={4}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !prompt.trim() || !hasAPIKey()}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Model Info */}
          <div>
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-white text-lg">Model Info</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Type</p>
                  <p className="text-white">{model?.type || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Features</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {model?.features?.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {feature.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
                {model?.proxy_providers?.[0]?.performance_metrics && (
                  <div>
                    <p className="text-gray-400 text-sm mb-2">Performance</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Latency:</span>
                        <span className="text-white">
                          {model.proxy_providers[0].performance_metrics.latency}s
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Uptime:</span>
                        <span className="text-white">
                          {model.proxy_providers[0].performance_metrics.uptime_percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePlayground;