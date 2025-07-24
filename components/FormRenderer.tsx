import React, { useState } from "react";
import FieldOverlay from "./FieldOverlay";
import Image from "next/image";
import IrsLogo from "../data/irslogo.png"
import Data from "../data/sampleData.json"

type FieldType = "text" | "date" | "checkbox" | "amount" | "ssn";

interface FieldAnnotation {
  id: string;
  page: number;
  type: FieldType;
  position: { x: number; y: number; width: number; height: number };
  dataPath: string | string[];
  invertCheckbox?: boolean;
  format?: "currency" | "ssn" | "date" | "uppercase";
}
type Props = {
  schema: any; 
};

const FormRenderer= ({ schema }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Array.isArray(Data)
    ? Math.max(...schema.map((s: any) => s.page ?? 2), 2)
    : (schema.page ?? 1);
  const PAGES = Array.from({ length: maxPage }, (_, i) => i + 1);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= PAGES.length) setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-lg font-semibold">
          Page {currentPage} of {PAGES.length}
        </span>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === PAGES.length}
          className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <div className="relative w-[816px] h-[1056px] border shadow overflow-hidden">
          <Image
            src={IrsLogo}
            alt={`Form Page ${currentPage}`}
            className="w-20 h-20 m-2"
          />
        {Array.isArray(schema) ? schema.map((field: FieldAnnotation) => (
          <FieldOverlay key={field.id} annotation={field} data={Data} />
        )): null}
      </div>
    </div>
  );
};

export default FormRenderer;
