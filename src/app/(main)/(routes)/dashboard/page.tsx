"use client";
import { DocumentList } from "../../_components/document-list";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  return (
    <section>
      {/* <EmptyDashboard /> */}
      <DocumentList query={searchParams} />
      {/* {!documents ? <EmptyDashboard /> : <DocumentList query={searchParams} />} */}
    </section>
  );
};

export default DashboardPage;
