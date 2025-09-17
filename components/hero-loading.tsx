import { Skeleton } from "@/components/skeleton";
import { Icons } from "./icons";

export const HeroLoading = () => {
  return (
    <Skeleton className="flex h-[17.875rem] w-full flex-col items-center justify-center gap-y-(--sp-200) rounded-(--radius-12) bg-(--clr-neutral-800)">
      <Icons.loading />
      <p className="text-(length:--fs-18) leading-(--lh-120) font-medium text-(--clr-neutral-200)">
        Loading...
      </p>
    </Skeleton>
  );
};
