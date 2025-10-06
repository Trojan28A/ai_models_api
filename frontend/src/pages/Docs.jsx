import React from 'react';
import { ExternalLink, Key, Code, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const Docs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Documentation
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Learn how to use AI Models Hub to access powerful AI models
          </p>
        </div>

        <div className="space-y-8">
          {/* Getting Started */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Key className="w-6 h-6 mr-2 text-purple-400" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h3 className="text-white text-lg font-semibold mb-2">1. Get Your API Key</h3>
                <p className="mb-2">
                  To use the playground features, you need an API key from A4F.co:
                </p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>Visit <a href="https://www.a4f.co" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 inline-flex items-center">
                    A4F.co <ExternalLink className="w-3 h-3 ml-1" />
                  </a></li>
                  <li>Sign up or log in to your account</li>
                  <li>Navigate to the API section</li>
                  <li>Generate a new API key</li>
                </ol>
              </div>

              <div>
                <h3 className="text-white text-lg font-semibold mb-2">2. Set Your API Key</h3>
                <p className="mb-2">
                  Once you have your API key:
                </p>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>Click the "Set API Key" button in the navigation bar</li>
                  <li>Paste your API key in the dialog</li>
                  <li>Click "Save API Key"</li>
                </ol>
                <div className="bg-gray-800/50 rounded-lg p-3 mt-3">
                  <p className="text-sm text-gray-400">
                    <strong>Note:</strong> Your API key is stored locally in your browser and never sent to our servers.
                    It's only used to make direct requests to A4F.co.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-purple-400" />
                Features
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h3 className="text-white text-lg font-semibold mb-2">Browse Models</h3>
                <p>
                  Explore over 400+ AI models from various providers. Filter by:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li><Badge className="bg-green-500/20 text-green-400">Free Tier</Badge> - No cost models</li>
                  <li><Badge className="bg-blue-500/20 text-blue-400">Basic Tier</Badge> - Low-cost models</li>
                  <li><Badge className="bg-purple-500/20 text-purple-400">Pro Tier</Badge> - Advanced models</li>
                  <li><Badge className="bg-orange-500/20 text-orange-400">Ultra Tier</Badge> - Premium models</li>
                </ul>
                <p className="mt-2">
                  Filter by category: Text, Image, Audio, Video
                </p>
              </div>

              <div>
                <h3 className="text-white text-lg font-semibold mb-2">Playgrounds</h3>
                <p className="mb-2">
                  Test AI models in real-time with our interactive playgrounds:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Text & Chat:</strong> Have conversations with language models</li>
                  <li><strong>Image Generation:</strong> Create images from text descriptions</li>
                  <li><strong>Audio Processing:</strong> Transcribe audio or generate speech</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* API Format */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Code className="w-6 h-6 mr-2 text-purple-400" />
                API Format
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div>
                <h3 className="text-white text-lg font-semibold mb-2">Model IDs</h3>
                <p className="mb-2">
                  When using the API, models are identified by their provider prefix and name:
                </p>
                <div className="bg-gray-800/50 rounded-lg p-3 font-mono text-sm">
                  provider-1/chatgpt-4o-latest<br />
                  provider-2/claude-3-opus<br />
                  provider-3/deepseek-v3
                </div>
              </div>

              <div>
                <h3 className="text-white text-lg font-semibold mb-2">Example: Text Completion</h3>
                <div className="bg-gray-800/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre className="text-gray-300">{`curl https://api.a4f.co/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "provider-1/chatgpt-4o-latest",
    "messages": [
      {"role": "user", "content": "Hello!"}
    ]
  }'`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-white text-lg font-semibold mb-2">Example: Image Generation</h3>
                <div className="bg-gray-800/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre className="text-gray-300">{`curl https://api.a4f.co/v1/images/generations \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "provider-1/dall-e-3",
    "prompt": "A beautiful sunset",
    "size": "1024x1024"
  }'`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">
                For more information and detailed API documentation, visit:
              </p>
              <a
                href="https://www.a4f.co/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-purple-400 hover:text-purple-300 text-lg"
              >
                A4F.co Official Documentation
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Docs;
