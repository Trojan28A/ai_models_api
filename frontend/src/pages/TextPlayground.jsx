import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useAPIKey } from '../contexts/APIKeyContext';
import { playgroundAPI } from '../services/api';
import { toast } from '../hooks/use-toast';

const TextPlayground = () => {
  const location = useLocation();
  const model = location.state?.model;
  const { apiKey, hasAPIKey } = useAPIKey();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get the model ID to use for API calls (with provider prefix)
  const getModelId = () => {
    if (!model) return '';
    const provider = model.proxy_providers?.[0];
    return provider?.id || model.base_model;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!hasAPIKey()) {
      toast({
        title: "API Key Required",
        description: "Please set your A4F.co API key in the navbar to use the playground.",
        variant: "destructive"
      });
      return;
    }

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await playgroundAPI.textCompletion(
        apiKey,
        getModelId(),
        [...messages, userMessage]
      );

      const aiMessage = {
        role: 'assistant',
        content: response.choices?.[0]?.message?.content || 'No response generated'
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to get response from AI model",
        variant: "destructive"
      });
      // Remove the user message if the API call failed
      setMessages(prev => prev.slice(0, -1));
      setInput(userMessage.content);
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
                {model?.name || 'Text Model'} Playground
              </h1>
              <p className="text-gray-400">{model?.description}</p>
            </div>
            {model?.tier && (
              <Badge className="capitalize">
                {model.tier} Tier
              </Badge>
            )}
          </div>
          
          {/* API Key Warning */}
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
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 border-gray-800 h-[calc(100vh-280px)] flex flex-col">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-white text-lg">Chat</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500 text-center">
                      Start a conversation with {model?.name || 'the AI model'}
                    </p>
                  </div>
                ) : (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-3 ${
                          msg.role === 'user'
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-800 text-gray-200'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-800 rounded-lg px-4 py-3 flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                      <span className="text-gray-400">Thinking...</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex gap-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="bg-gray-900/50 border-gray-800 text-white resize-none"
                  rows={3}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Send className="w-4 h-4" />
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
                  <p className="text-gray-400 text-sm mb-1">Context Window</p>
                  <p className="text-white">
                    {model?.context_window?.toLocaleString() || 'N/A'} tokens
                  </p>
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
                        <span className="text-gray-400">Throughput:</span>
                        <span className="text-white">
                          {model.proxy_providers[0].performance_metrics.throughput} t/s
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

export default TextPlayground;