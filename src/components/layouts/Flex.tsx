import { cn } from "@/lib/utils";
import React, { ComponentProps } from "react";

// const gapClasses = {
//   sm: "gap-2",
//   base: "gap-4",
//   lg: "gap-6",
//   xl: "gap-12",
// };

interface FlexProps extends ComponentProps<"div"> {
  direction?: "row" | "col";
//   gap?: "sm" | "base" | "lg" | "xl";
}

export const Flex: React.FunctionComponent<FlexProps> = ({
  direction = "row",
//   gap = "base",
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        // gapClasses[gap],
        `flex-${direction}`,
        "flex w-full",
        className,
      )}
    >
      {children}
    </div>
  );
};