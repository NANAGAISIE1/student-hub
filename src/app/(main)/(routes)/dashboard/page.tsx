"use client";
import { useQuery } from "convex/react";

import { api } from "../../../../../convex/_generated/api";
import { DocumentList } from "../../_components/document-list";
import EmptyDashboard from "../../_components/empty-dashboard";

const DashboardPage = () => {
  const data = useQuery(api.documents.getAll, {});

  if (data === undefined)
    return (
      <section>
        <DocumentList data={data} />
        {/* <Spinner size="lg" /> */}
      </section>
    );

  return (
    <section>
      {!data ? <EmptyDashboard /> : <DocumentList data={data} />}
    </section>
  );
};

export default DashboardPage;
