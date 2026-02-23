import AnalyticsBar from "./AnalyticsBar";
import AnalyticsDemoCards from "./AnalyticsDemoCards";
import DailyAddedRevenue from "./DailyAddedRevenue";
import FilterBar from "./FilterBar";

export default function AnalyticsTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <FilterBar />
      <AnalyticsBar />
      <AnalyticsDemoCards />
      <DailyAddedRevenue />
    </div>
  );
}
