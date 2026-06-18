"use client";

import NextLink from "next/link";
import { forwardRef, type ComponentProps } from "react";
import { usePageTransition } from "@/components/layout/PageTransitionProvider";

type TransitionLinkProps = ComponentProps<typeof NextLink>;

function isInternalHref(href: TransitionLinkProps["href"]): href is string {
  return typeof href === "string" && href.startsWith("/") && !href.startsWith("//");
}

export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(
  function TransitionLink({ href, onClick, children, ...props }, ref) {
    const { navigate } = usePageTransition();

    if (!isInternalHref(href)) {
      return (
        <NextLink ref={ref} href={href} onClick={onClick} {...props}>
          {children}
        </NextLink>
      );
    }

    return (
      <NextLink
        ref={ref}
        href={href}
        {...props}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented) return;

          event.preventDefault();
          navigate(href);
        }}
      >
        {children}
      </NextLink>
    );
  },
);
