
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Copy, Download } from "lucide-react";
import { toast } from "sonner";

interface PromptPreviewProps {
  promptText: string;
  isGenerating: boolean;
}

const PromptPreview = ({ promptText, isGenerating }: PromptPreviewProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  const downloadAsText = () => {
    const element = document.createElement("a");
    const file = new Blob([promptText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "blog-prompt.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success("Prompt downloaded!");
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Generated Prompt</span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={copyToClipboard}
              disabled={isGenerating || !promptText}
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={downloadAsText}
              disabled={isGenerating || !promptText}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          Your AI-optimized blog writing prompt
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <ScrollArea className="h-[calc(100vh-300px)]">
          {isGenerating ? (
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded shimmer w-full" style={{ width: `${Math.random() * 40 + 60}%` }} />
              ))}
            </div>
          ) : promptText ? (
            <pre className="whitespace-pre-wrap text-sm font-mono pb-4">{promptText}</pre>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              Fill in the form and click "Generate Prompt" to create your blog writing prompt
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PromptPreview;
