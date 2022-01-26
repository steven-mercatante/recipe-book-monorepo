import * as React from "react";
import Markdown from "markdown-to-jsx";

interface Props {
  items: string[];
  showStepNum?: boolean;
}

export function ItemList({ items, showStepNum }: Props) {
  return (
    <div className="item-list">
      <ul>
        {items.map((item, i) => {
          return (
            <li className="mb-2" key={i}>
              {showStepNum && (
                <p>
                  <strong>Step {i + 1}</strong>
                </p>
              )}
              <Markdown options={{ forceInline: false }}>
                {item.trim()}
              </Markdown>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
