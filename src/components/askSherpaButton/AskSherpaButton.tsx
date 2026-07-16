import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AskSherpaButtonProps } from "@/components/askSherpaButton/types";

export function AskSherpaButton({
  onClick,
  className = "",
  disabled = false,
}: AskSherpaButtonProps) {
  return (
    <Button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 ${className}`}
      aria-label="Ask Sherpa AI Assistant"
      disabled={disabled}
    >
      <MessageSquare className="h-4 w-4" />
      Ask Sherpa
    </Button>
  );
}
