import { Icons } from "./icons";

const APIError = () => {
  return (
    <div className="mt-(--sp-800) flex flex-col items-center gap-y-(--sp-200) pt-(--sp-500)">
      {/* error icon */}
      <Icons.error />

      <h2 className="font-bricolage-grotesque text-[3.25rem] leading-(--lh-120) font-bold text-(--clr-neutral-0)">
        Something went wrong
      </h2>

      <p className="text-(length:--fs-20) leading-(--lh-120) font-medium text-(--clr-neutral-200)">
        We couldn&apos;t connect to the server (API error). Please try again in
        a few moments.
      </p>

      <button
        type="button"
        className="flex gap-x-(--sp-125) rounded-(--radius-8) bg-[#262540] px-(--sp-300) py-(--sp-150)"
      >
        <Icons.retry />
        <span className="text-(length:--fs-16) leading-(--lh-120) font-medium text-(--clr-neutral-0)">
          Retry
        </span>
      </button>
    </div>
  );
};

export default APIError;
