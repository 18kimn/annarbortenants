import { Section } from "@/components/Layout";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Section size="spacious">{children}</Section>;
}
