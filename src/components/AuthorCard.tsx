import Image from "next/image";
import { Twitter, Linkedin, Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Author } from "@/lib/types";
import { useState } from "react";

interface AuthorCardProps {
  author: Author;
  variant?: "default" | "compact";
  showBio?: boolean;
  className?: string;
}

export default function AuthorCard({
  author,
  variant = "default",
  showBio = true,
  className,
}: AuthorCardProps) {
  const isCompact = variant === "compact";
  const [imgSrc, setImgSrc] = useState(author.avatar || "/avatar.png");

  return (
    <div
      className={cn(
        "flex gap-4",
        isCompact ? "items-center" : "items-start",
        className
      )}
    >
      <div className="flex-shrink-0">
        <Image
          src={imgSrc}
          alt={`${author.name} avatar`}
          width={isCompact ? 40 : 64}
          height={isCompact ? 40 : 64}
          className="rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
          onError={() => setImgSrc("/avatar.png")}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3
            className={cn(
              "font-semibold text-gray-900 dark:text-gray-100",
              isCompact ? "text-sm" : "text-lg"
            )}
          >
            {author.name}
          </h3>
        </div>

        {showBio && author.bio && !isCompact && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {author.bio}
          </p>
        )}

        {/* Social links */}
        <div className="flex items-center gap-3 mt-3">
          {author.social.twitter && (
            <a
              href={`https://twitter.com/${author.social.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 transition-colors"
              aria-label={`${author.name} on Twitter`}
            >
              <Twitter size={18} />
            </a>
          )}

          {author.social.linkedin && (
            <a
              href={`https://linkedin.com/in/${author.social.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 transition-colors"
              aria-label={`${author.name} on LinkedIn`}
            >
              <Linkedin size={18} />
            </a>
          )}

          {author.social.github && (
            <a
              href={`https://github.com/${author.social.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              aria-label={`${author.name} on GitHub`}
            >
              <Github size={18} />
            </a>
          )}

          {author.social.website && (
            <a
              href={author.social.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
              aria-label={`${author.name}'s website`}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
