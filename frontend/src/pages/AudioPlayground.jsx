import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Mic, Volume2, Upload, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';

const AudioPlayground = () => {
  const location = useLocation();
  const model = location.state?.model;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isTranscription = model?.type?.includes('transcription');

  const handleProcess = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setOutput('');

    // Mock processing
    setTimeout(() => {
      if (isTranscription) {
        setOutput(`Transcribed text: This is a mock transcription of your audio input using ${model?.name}.`);
      } else {
        setOutput(`Audio generated successfully from the text: "${input}"`);
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {model?.name || 'Audio Model'} Playground
              </h1>
              <p className="text-gray-400">{model?.description}</p>
            </div>
            {model?.tier && (
              <Badge className="capitalize">
                {model.tier} Tier
              </Badge>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Processing Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Input Card */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader className="border-b border-gray-800">
                <CardTitle className="text-white text-lg flex items-center">
                  {isTranscription ? (
                    <>
                      <Mic className="w-5 h-5 mr-2" />
                      Audio Input
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-5 h-5 mr-2" />
                      Text Input
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {isTranscription ? (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-purple-500/50 transition-colors cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                      <p className="text-gray-400">Click to upload audio file</p>
                      <p className="text-gray-600 text-sm mt-1">MP3, WAV, M4A (Max 25MB)</p>
                    </div>
                    <div className="text-center text-gray-500">or</div>
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Paste audio file path or URL..."
                      className="bg-gray-800/50 border-gray-700 text-white"
                      rows={3}
                    />
                  </div>
                ) : (
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter text to convert to speech..."
                    className="bg-gray-800/50 border-gray-700 text-white"
                    rows={6}
                  />
                )}
              </CardContent>
            </Card>

            {/* Process Button */}
            <Button
              onClick={handleProcess}
              disabled={isLoading || !input.trim()}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : isTranscription ? (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Transcribe Audio
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 mr-2" />
                  Generate Speech
                </>
              )}
            </Button>

            {/* Output Card */}
            {output && (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader className="border-b border-gray-800">
                  <CardTitle className="text-white text-lg">Output</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <p className="text-gray-200">{output}</p>
                  </div>
                  {!isTranscription && (
                    <div className="mt-4 p-4 bg-gray-800/30 rounded-lg">
                      <audio controls className="w-full">
                        <source src="" type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
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
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-xs text-gray-500">
                    Note: This is a demo playground. Actual API integration required for production use.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayground;