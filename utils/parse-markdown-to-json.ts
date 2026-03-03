export function parseMarkdownToJson(markdownText: string): any | null {
  const regex = /```json\s+([\s\S]*?)\s+```/;
  const match = markdownText.match(regex);
  const cleanText = match ? match[1] : markdownText;

  try {
    return JSON.parse(cleanText.trim());
  } catch (error) {
    try {
      const start = cleanText.indexOf("{");
      const end = cleanText.lastIndexOf("}");
      if (start !== -1 && end !== -1) {
        return JSON.parse(cleanText.substring(start, end + 1));
      }
    } catch (innerError) {
      console.error("No valid JSON found in text:", innerError);
    }
    return null;
  }
}
