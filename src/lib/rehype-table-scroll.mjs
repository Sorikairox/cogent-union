/**
 * Wraps every Markdown table in a horizontally scrollable region, so that a
 * wide table does not squeeze its columns to pieces on a phone. The wrapper is
 * focusable, which is what lets a keyboard user scroll it.
 */
export function rehypeTableScroll() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        walk(child);
        if (child.type === 'element' && child.tagName === 'table') {
          return {
            type: 'element',
            tagName: 'div',
            properties: { className: ['table-scroll'], tabIndex: 0 },
            children: [child],
          };
        }
        return child;
      });
    };
    walk(tree);
  };
}
