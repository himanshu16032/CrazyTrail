import { useParams } from "react-router";
import { MarketingPageBySlug } from "../../components/marketing/MarketingContentPage";

export default function SolutionDetailPage() {
  const { slug } = useParams();
  return <MarketingPageBySlug slug={`solutions/${slug ?? ""}`} />;
}
