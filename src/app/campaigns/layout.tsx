import { Section, Container } from "@/components/Layout";

export default function CampaignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Section size="spacious">
      <Container width="prose">{children}</Container>
    </Section>
  );
}
