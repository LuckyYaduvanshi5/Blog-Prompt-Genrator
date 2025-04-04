
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PromptFormData } from "@/utils/generatePrompt";

interface ExamplePromptsProps {
  onSelectExample: (example: PromptFormData) => void;
}

const examplePrompts: { title: string; description: string; data: PromptFormData }[] = [
  {
    title: "Ultimate Guide to Remote Work",
    description: "A comprehensive guide for professionals transitioning to remote work",
    data: {
      topic: "Remote Work Best Practices",
      tone: "professional",
      description: "Cover all essential aspects of successful remote work, including productivity tips, work-life balance, and communication strategies.",
      contentType: "comprehensive guide",
      targetAudience: "professionals transitioning to remote work",
      language: "English",
      formatPreference: "headings and subheadings with actionable steps",
      focusKeywords: "remote work, work from home, remote productivity",
      relatedKeywords: "digital nomad, virtual communication, home office setup, remote collaboration tools",
      targetWordCount: "2000",
      callToAction: "Download our free remote work toolkit to get started today"
    }
  },
  {
    title: "Healthy Meal Prep for Beginners",
    description: "A beginner-friendly guide to meal prepping for health-conscious individuals",
    data: {
      topic: "Beginner's Guide to Healthy Meal Prep",
      tone: "casual and encouraging",
      description: "Provide practical meal prepping tips, simple recipes, and time-saving strategies for beginners.",
      contentType: "how-to guide",
      targetAudience: "busy health-conscious individuals",
      language: "English",
      formatPreference: "step-by-step instructions with bullet points",
      focusKeywords: "meal prep, healthy eating, beginner meal prep",
      relatedKeywords: "meal planning, batch cooking, food storage, time-saving recipes",
      targetWordCount: "1800",
      callToAction: "Sign up for our weekly recipe newsletter for more inspiration"
    }
  },
  {
    title: "Digital Marketing Trends 2025",
    description: "Analysis of upcoming digital marketing trends for marketers and business owners",
    data: {
      topic: "Digital Marketing Trends for 2025",
      tone: "analytical and forward-thinking",
      description: "Analyze emerging technologies and strategies in digital marketing that will dominate the industry in 2025.",
      contentType: "trend analysis",
      targetAudience: "marketing professionals and business owners",
      language: "English",
      formatPreference: "numbered lists with detailed explanations",
      focusKeywords: "digital marketing trends, marketing innovation, 2025 marketing",
      relatedKeywords: "AI marketing, voice search optimization, interactive content, privacy-first marketing",
      targetWordCount: "2500",
      callToAction: "Book a strategy session with our experts to prepare your business for these trends"
    }
  }
];

const ExamplePrompts = ({ onSelectExample }: ExamplePromptsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Prompts</CardTitle>
        <CardDescription>
          Select a template to get started quickly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px] pr-4">
          <div className="space-y-4">
            {examplePrompts.map((example, index) => (
              <Card key={index} className="hover:border-purple-400 transition-all cursor-pointer">
                <CardHeader className="p-4">
                  <CardTitle className="text-base">{example.title}</CardTitle>
                  <CardDescription className="text-xs">{example.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => onSelectExample(example.data)}
                    className="w-full"
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ExamplePrompts;
