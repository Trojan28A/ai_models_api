import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAPIKey } from '../contexts/APIKeyContext';
import { Key, ExternalLink } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const APIKeyDialog = ({ open, onOpenChange }) => {
  const { apiKey, saveAPIKey } = useAPIKey();
  const [inputKey, setInputKey] = useState(apiKey);

  const handleSave = () => {
    if (!inputKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive"
      });
      return;
    }
    saveAPIKey(inputKey.trim());
    toast({
      title: "Success",
      description: "API key saved successfully"
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5 text-purple-400" />
            <span>A4F.co API Key</span>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Enter your A4F.co API key to use the playground features.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="api-key" className="text-gray-300">API Key</Label>
            <Input
              id="api-key"
              type="password"
              placeholder="sk-...."
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-3 text-sm space-y-2">
            <p className="text-gray-400">Don't have an API key?</p>
            <a
              href="https://www.a4f.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
            >
              Get one from A4F.co
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default APIKeyDialog;