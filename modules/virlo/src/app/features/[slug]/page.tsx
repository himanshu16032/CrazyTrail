import { useParams } from "react-router";
import { MarketingPageBySlug } from "../../components/marketing/MarketingContentPage";

export default function FeatureDetailPage() {
  const { slug } = useParams();
  return <MarketingPageBySlug slug={`features/${slug ?? ""}`} />;
}
