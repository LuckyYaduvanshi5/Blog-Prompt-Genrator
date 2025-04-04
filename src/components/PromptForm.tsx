
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PromptFormData } from "@/utils/generatePrompt";

const formSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  tone: z.string().min(1, "Tone is required"),
  description: z.string(),
  contentType: z.string().min(1, "Content type is required"),
  targetAudience: z.string().min(1, "Target audience is required"),
  language: z.string().min(1, "Language is required"),
  formatPreference: z.string().min(1, "Format preference is required"),
  focusKeywords: z.string(),
  relatedKeywords: z.string(),
  targetWordCount: z.string(),
  callToAction: z.string(),
});

const toneOptions = [
  "professional", "casual", "conversational", "formal", "friendly",
  "humorous", "inspirational", "authoritative", "educational", "enthusiastic"
];

const contentTypeOptions = [
  "how-to guide", "listicle", "tutorial", "review", "case study", 
  "opinion piece", "industry news", "comprehensive guide", "comparison", "interview"
];

const formatOptions = [
  "headings and subheadings", "numbered lists", "bullet points", 
  "step-by-step guide", "Q&A format", "problem-solution format"
];

const languageOptions = [
  "English", "Spanish", "French", "German", "Portuguese", 
  "Italian", "Dutch", "Chinese", "Japanese", "Korean"
];

interface PromptFormProps {
  onGeneratePrompt: (data: PromptFormData) => void;
  isGenerating: boolean;
  initialValues?: PromptFormData;
}

const PromptForm = ({ onGeneratePrompt, isGenerating, initialValues }: PromptFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      topic: "",
      tone: "",
      description: "",
      contentType: "",
      targetAudience: "",
      language: "English",
      formatPreference: "",
      focusKeywords: "",
      relatedKeywords: "",
      targetWordCount: "1500",
      callToAction: "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onGeneratePrompt(data as PromptFormData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blog Prompt Generator</CardTitle>
        <CardDescription>
          Fill in the details to generate your perfect blog writing prompt
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic*</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Sustainable Living Tips" {...field} />
                  </FormControl>
                  <FormDescription>
                    The main subject of your blog post
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="tone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tone*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {toneOptions.map(tone => (
                          <SelectItem key={tone} value={tone}>
                            {tone.charAt(0).toUpperCase() + tone.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The writing style and emotion
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content Type*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select content type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {contentTypeOptions.map(type => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The format of your blog post
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide additional context about what you want to cover" 
                      className="min-h-[80px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Additional context or specific points to include
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience*</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Small Business Owners" {...field} />
                    </FormControl>
                    <FormDescription>
                      Who will be reading this content
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languageOptions.map(language => (
                          <SelectItem key={language} value={language}>
                            {language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="formatPreference"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Format Preference*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {formatOptions.map(format => (
                        <SelectItem key={format} value={format}>
                          {format.charAt(0).toUpperCase() + format.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    How you want your content structured
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-6 border-t pt-6">
              <h3 className="text-lg font-medium">SEO Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="focusKeywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Focus Keywords</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., sustainable living, eco-friendly" {...field} />
                      </FormControl>
                      <FormDescription>
                        Primary keywords (comma-separated)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="relatedKeywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Related Keywords</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., zero waste, environmental impact" {...field} />
                      </FormControl>
                      <FormDescription>
                        Secondary keywords (comma-separated)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="targetWordCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Word Count</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="callToAction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Call to Action</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Sign up for our newsletter" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-purple-gradient hover:opacity-90"
              disabled={isGenerating}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "Generate Prompt"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PromptForm;
