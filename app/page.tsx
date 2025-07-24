'use client';
import FormRenderer from "@/components/FormRenderer";
import { useState } from "react";

export default function Home() {
  const [jsonData, setJsonData] = useState("");
  const [formSchema, setFormSchema] = useState<any>(null);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonData(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      setFormSchema(parsed);
    } catch (error) {
      setFormSchema(null); 
    }
  };

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">Form Preview</h1>
      <div className="flex gap-4">
        <div className="w-1/2">
          <textarea
            className="w-full h-[80vh] p-2 border border-gray-300 rounded"
            placeholder="Paste your JSON schema here"
            value={jsonData}
            onChange={handleJsonChange}
          />
        </div>
        <div className="w-1/2 border-l border-gray-200 pl-4">
          {formSchema ? (
            <FormRenderer schema={formSchema} />
          ) : (
            <p className="text-gray-500">Enter valid JSON to preview the form</p>
          )}
        </div>
      </div>
    </div>
  );
}
