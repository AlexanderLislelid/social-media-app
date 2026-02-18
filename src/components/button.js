/**
 * Creates a reusable button element with Tailwind variants.
 *
 * @param {string} [text="button"] Text displayed inside the button.
 * @param {string} [variant="primary"] Styling variant. Defaults to "primary".
 * @returns {HTMLButtonElement} A styled button element.
 *
 * @example
 * const deleteButton = createButton("Delete", "danger");
 *
 * If no variant is provided, the button will use the primary styling.
 */

export function createButton(text = "button", variant = "primary") {
  const button = document.createElement("button");

  const base = "px-3 py-2 text-sm rounded-lg";

  const variants = {
    primary: "bg-indigo-500 hover:bg-indigo-600 text-white font-medium",
    danger: "bg-red-600 hover:bg-red-700 text-white font-medium",
    logout:
      " bg-slate-900 hover:bg-slate-950 border border-slate-600 text-white font-medium",
    close:
      "bg-slate-900 border border-slate-700  hover:border-indigo-500 hover:text-indigo-300",
  };

  button.className = `${base} ${variants[variant]}`.trim();
  button.textContent = text;
  return button;
}
