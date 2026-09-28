export type ReportResponse = {
  report_id: string;
  status: "pending" | "ready" | "failed";
};

export function isReady(report: ReportResponse): boolean {
  return report.status === "ready";
}
