import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { MessageSquare, Image, Mic, Video } from 'lucide-react';

const PlaygroundSelector = () => {
  const navigate = useNavigate();

  const playgrounds = [
    {
      title: 'Text & Chat',
      description: 'Interact with language models for chat and text completion',
      icon: <MessageSquare className="w-8 h-8" />,
      path: '/playground/text',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Image Generation',
      description: 'Create images from text descriptions using AI',
      icon: <Image className="w-8 h-8" />,
      path: '/playground/image',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Audio Processing',
      description: 'Transcribe audio or generate speech from text',
      icon: <Mic className="w-8 h-8" />,
      path: '/playground/audio',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Video (Coming Soon)',
      description: 'Video generation and processing capabilities',
      icon: <Video className="w-8 h-8" />,
      path: '#',
      gradient: 'from-orange-500 to-red-500',
      disabled: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Playground
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            Choose a playground to start experimenting with AI models
          </p>
        </div>

        {/* Playground Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {playgrounds.map((playground, idx) => (
            <Card
              key={idx}
              onClick={() => !playground.disabled && navigate(playground.path)}
              className={`bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all group ${
                playground.disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1'
              }`}
            >
              <CardHeader>
                <div className={`bg-gradient-to-br ${playground.gradient} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <div className="text-white">{playground.icon}</div>
                </div>
                <CardTitle className="text-white text-2xl group-hover:text-purple-400 transition-colors">
                  {playground.title}
                </CardTitle>
                <CardDescription className="text-gray-400 text-base">
                  {playground.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaygroundSelector;