
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { 
  Upload, 
  Copy, 
  X, 
  RefreshCw, 
  Download, 
  Translate,
  SwapHorizontal,
  Sparkles
} from "lucide-react";

const Index = () => {
  const [sourceText, setSourceText] = useState("");
  const [sourceLang, setSourceLang] = useState("english");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isTraining, setIsTraining] = useState(false);

  const handleTranslate = () => {
    if (!sourceText.trim()) {
      toast({
        description: "Please enter text to translate.",
        variant: "destructive",
      });
      return;
    }

    setIsTranslating(true);
    
    // Simulate translation process
    setTimeout(() => {
      setTranslatedText(`Translated: ${sourceText}`);
      setIsTranslating(false);
      toast({
        description: "Translation completed successfully!",
      });
    }, 1000);
  };

  const handleTrain = () => {
    setIsTraining(true);
    toast({
      description: "Training process started. This may take a while...",
    });

    // Simulate training process
    setTimeout(() => {
      setIsTraining(false);
      toast({
        description: "Model training completed successfully!",
      });
    }, 3000);
  };

  const handleCopyInput = () => {
    navigator.clipboard.writeText(sourceText);
    toast({
      description: "Input copied to clipboard!",
    });
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(translatedText);
    toast({
      description: "Output copied to clipboard!",
    });
  };

  const handleClear = () => {
    setSourceText("");
    toast({
      description: "Input cleared!",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setSourceText(content);
      toast({
        description: "File uploaded successfully!",
      });
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    if (!translatedText) {
      toast({
        description: "No translation to download",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([translatedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "translation.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      description: "Translation downloaded!",
    });
  };

  const swapLanguages = () => {
    setSourceLang(sourceLang === "english" ? "spanish" : "english");
    // In a real application, you might also want to swap the text
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="w-full max-w-6xl p-6 md:p-8 font-sans bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-2">
            Neural Machine Translation System
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Execute bidirectional linguistic conversion between English and Spanish utilizing our advanced
            neural network translation algorithm.
          </p>
        </header>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Corpus */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-4">
              <Translate className="text-indigo-500 mr-2" />
              <h2 className="text-xl font-semibold">Input Corpus</h2>
            </div>
            
            <div className="mb-4 relative">
              <select 
                id="sourceLang" 
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
                className="w-full py-3 px-4 appearance-none bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition-all duration-200 font-medium text-center"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
              </select>
            </div>
            
            <div className="mb-4">
              <Textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none resize-none transition-all duration-200"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative group">
                <Input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <label
                  htmlFor="fileUpload"
                  className="flex items-center justify-center w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer border border-gray-300 transition-all duration-200"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload File
                </label>
              </div>
              
              <Button
                variant="outline"
                onClick={handleCopyInput}
                className="flex items-center justify-center"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              
              <Button
                variant="outline"
                onClick={handleClear}
                className="flex items-center justify-center"
              >
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>

          {/* Translation Output */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="flex items-center mb-4">
              <Sparkles className="text-indigo-500 mr-2" />
              <h2 className="text-xl font-semibold">Translation</h2>
            </div>
            
            <div className="mb-4 relative">
              <div 
                className="absolute -top-4 -translate-x-1/2 left-1/2 bg-white p-2 rounded-full shadow-md border border-gray-200 hover:shadow-lg cursor-pointer transition-all duration-200 z-10"
                onClick={swapLanguages}
              >
                <SwapHorizontal className="text-gray-500 hover:text-indigo-500 transform transition-transform duration-300 hover:rotate-180" />
              </div>
              
              <div 
                id="outputArea" 
                className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-auto"
              >
                {translatedText ? (
                  <p>{translatedText}</p>
                ) : (
                  <p className="text-gray-500 italic">Translation will appear here...</p>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleTranslate}
                disabled={isTranslating}
                className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white flex-1"
              >
                {isTranslating ? (
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Translate className="mr-2 h-4 w-4" />
                )}
                Translate
              </Button>
              
              <Button
                variant="outline"
                onClick={handleCopyOutput}
                className="flex items-center justify-center"
                disabled={!translatedText}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              
              <Button
                variant="outline"
                onClick={handleDownload}
                className="flex items-center justify-center"
                disabled={!translatedText}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>
        </div>
        
        {/* Train Button */}
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleTrain}
            disabled={isTraining}
            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2"
          >
            {isTraining ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Train Model
          </Button>
        </div>

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2023 AI Translation Engine. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
