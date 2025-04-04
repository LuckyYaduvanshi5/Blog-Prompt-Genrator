
export interface PromptFormData {
  topic: string;
  tone: string;
  description: string;
  contentType: string;
  targetAudience: string;
  language: string;
  formatPreference: string;
  focusKeywords: string;
  relatedKeywords: string;
  targetWordCount: string;
  callToAction: string;
}

export function generatePrompt(data: PromptFormData): string {
  const {
    topic,
    tone,
    description,
    contentType,
    targetAudience,
    language,
    formatPreference,
    focusKeywords,
    relatedKeywords,
    targetWordCount,
    callToAction,
  } = data;

  // Create focus keywords array
  const focusKeywordsArray = focusKeywords
    .split(',')
    .map(keyword => keyword.trim())
    .filter(keyword => keyword !== '');
  
  // Create related keywords array
  const relatedKeywordsArray = relatedKeywords
    .split(',')
    .map(keyword => keyword.trim())
    .filter(keyword => keyword !== '');

  // Build the prompt
  let prompt = `
# Create a comprehensive ${contentType} blog post about "${topic}"

## Content Brief:
Write a detailed, engaging, and ${tone} ${contentType} blog post about ${topic}. ${description}

## Target Audience:
This content is specifically created for ${targetAudience}.

## Content Structure:
- Create a compelling headline that grabs attention
- Write in a ${tone} tone throughout the article
- Structure the content using ${formatPreference}
- Aim for approximately ${targetWordCount} words
- Writing language: ${language}

## SEO Requirements:
- Primary keyword focus: ${focusKeywordsArray.join(', ')}
- Include these related keywords naturally throughout: ${relatedKeywordsArray.join(', ')}
- Create an SEO-friendly title, meta description, and URL slug
- Use proper heading hierarchy (H1, H2, H3) with keywords in headings where natural

## Content Must Include:
- An engaging introduction that hooks the reader
- Clear, valuable, and actionable insights
- Data points, statistics, or examples where relevant
- A logical flow of information with smooth transitions
- Rich, descriptive language appropriate for the topic
${callToAction ? `- Call to action at the end: ${callToAction}` : ''}
- A strong conclusion that summarizes key points

## Additional Notes:
- Avoid fluff or filler content
- Be authoritative and demonstrate expertise
- Incorporate storytelling elements where appropriate
- Address common questions or pain points of ${targetAudience}
- Make the content skimmable with clear sections and bullet points where useful
`;

  return prompt;
}
