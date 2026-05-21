import AIToolPage from "@/app/components/AIToolPage";

export default function StartupIdeasPage() {
  return (
    <AIToolPage
      title="Startup Idea AI"
      icon="💡"
      description="Generate SaaS ideas, business models, niches, and product plans."
      starterPrompt="Give me a profitable SaaS startup idea about "
    />
  );
}