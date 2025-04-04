
import React, { useState } from "react";
import Header from "@/components/Header";
import PromptForm from "@/components/PromptForm";
import PromptPreview from "@/components/PromptPreview";
import ExamplePrompts from "@/components/ExamplePrompts";
import { PromptFormData, generatePrompt } from "@/utils/generatePrompt";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { toast } from "sonner";

const Index = () => {
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [formValues, setFormValues] = useState<PromptFormData | undefined>(undefined);

  const handleGeneratePrompt = (data: PromptFormData) => {
    setIsGenerating(true);
    setFormValues(data);
    
    // Simulate an API call or processing delay
    setTimeout(() => {
      try {
        const prompt = generatePrompt(data);
        setGeneratedPrompt(prompt);
        toast.success("Prompt generated successfully!");
      } catch (error) {
        toast.error("Failed to generate prompt");
        console.error(error);
      } finally {
        setIsGenerating(false);
      }
    }, 1000);
  };

  const handleSelectExample = (example: PromptFormData) => {
    setFormValues(example);
    toast.info("Example template loaded");
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 space-y-8">
              <PromptForm 
                onGeneratePrompt={handleGeneratePrompt} 
                isGenerating={isGenerating}
                initialValues={formValues}
              />
            </div>
            <div className="lg:col-span-4">
              <PromptPreview promptText={generatedPrompt} isGenerating={isGenerating} />
            </div>
            <div className="lg:col-span-3">
              <ExamplePrompts onSelectExample={handleSelectExample} />
            </div>
          </div>
        </main>
        <footer className="border-t border-border/50 py-6">
          <div className="container text-center text-sm text-muted-foreground">
            <p>BlogPrompt Generator — Create detailed, high-quality blog prompts in seconds</p>
            <p className="mt-1">© {new Date().getFullYear()} — Built with React, TypeScript, and Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default Index;
