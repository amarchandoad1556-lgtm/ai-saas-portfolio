import AIToolPage from "@/app/components/AIToolPage";

export default function ContentWriterPage() {
  return (
    <AIToolPage
      title="Content Writer"
      icon="✍️"
      description="Write blogs, social posts, captions, emails, and marketing content."
      starterPrompt="Write high-quality content about "
    />
  );
}