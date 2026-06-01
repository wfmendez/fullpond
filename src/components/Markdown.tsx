import React from "react";

// Minimal, safe markdown for trusted (admin-authored) job descriptions.
// Supports: "## " headings, "**bold**", "- " bullet lists, blank-line
// paragraphs. Never injects raw HTML.

function renderInline(text: string, keyBase: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith("**") && p.endsWith("**") ? (
      <strong key={`${keyBase}-${i}`} className="font-semibold text-ink-900">
        {p.slice(2, -2)}
      </strong>
    ) : (
      <React.Fragment key={`${keyBase}-${i}`}>{p}</React.Fragment>
    ),
  );
}

export function Markdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      blocks.push(
        <p key={`p-${blocks.length}`} className="mt-3 leading-relaxed text-stone-600">
          {renderInline(para.join(" "), `p${blocks.length}`)}
        </p>,
      );
      para = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push(
        <ul key={`u-${blocks.length}`} className="mt-3 list-disc space-y-1 pl-5 text-stone-600">
          {list.map((it, i) => (
            <li key={i} className="leading-relaxed">
              {renderInline(it, `l${blocks.length}-${i}`)}
            </li>
          ))}
        </ul>,
      );
      list = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    if (line.startsWith("## ")) {
      flushPara();
      flushList();
      blocks.push(
        <h2 key={`h-${blocks.length}`} className="mt-7 font-display text-xl text-ink-900">
          {line.slice(3)}
        </h2>,
      );
    } else if (line.startsWith("- ")) {
      flushPara();
      list.push(line.slice(2));
    } else if (line.trim() === "") {
      flushPara();
      flushList();
    } else {
      flushList();
      para.push(line.trim());
    }
  }
  flushPara();
  flushList();

  return <div>{blocks}</div>;
}
