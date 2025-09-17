"use client";

interface THWPContainerProps {
  title: string;
  value: string;
  loading: boolean;
  unit: string;
}

/**
 * A component to display a title and a value in a card-like format.
 * It is used to display the current weather conditions.
 *
 * @param {string} title - The title of the weather condition.
 * @param {string} value - The value of the weather condition.
 * @param {string} loading - The loading state.
 * @param {string} unit - The weather unit.
 *
 * @returns {JSX.Element} A JSX element displaying the title and the value.
 */
const THWPContainer = ({ title, value, loading, unit }: THWPContainerProps) => {
  return (
    <div
      className={`${loading && !!value ? "animate-pulse" : ""} flex flex-col gap-y-(--sp-300) rounded-(--radius-12) border border-(--clr-neutral-600) bg-(--clr-neutral-800) p-(--sp-250)`}
    >
      <span className="text-(length:--fs-18) leading-(--lh-120) font-medium text-(--clr-neutral-200)">
        {title}
      </span>
      <span
        className={`${loading && !!value ? "animate-pulse" : ""} text-(length:--fs-32) font-light text-(--clr-neutral-0)`}
      >
        {loading && !!value ? "-" : `${value} ${unit}`}
      </span>
    </div>
  );
};

export default THWPContainer;
