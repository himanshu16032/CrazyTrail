import { useParams } from "react-router";
import { MarketingPageBySlug } from "../../components/marketing/MarketingContentPage";

export default function ResourceDetailPage() {
  const { slug } = useParams();
  return <MarketingPageBySlug slug={`resources/${slug ?? ""}`} />;
}
