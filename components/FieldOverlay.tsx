import React from "react";

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

interface Props {
  annotation: FieldAnnotation;
  data: any;
}

function getValue(path: string | string[], data: any): any {
  const paths = Array.isArray(path) ? path : [path];
  for (const p of paths) {
    const parts = p.split(".");
    let val = data;
    try {
      for (const part of parts) val = val[part];
      if (val != null) return val;
    } catch {
      continue;
    }
  }
  return "";
}

function formatValue(val: any, format?: string): string {
  if (val == null) return "";
  switch (format) {
    case "currency": return `$${Number(val).toLocaleString()}`;
    case "ssn": return val.toString().replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3");
    case "uppercase": return val.toString().toUpperCase();
    case "date": return new Date(val).toLocaleDateString();
    default: return val.toString();
  }
}

const FieldOverlay: React.FC<Props> = ({ annotation, data }) => {
  const { position, type, format, invertCheckbox } = annotation;
  const rawVal = getValue(annotation.dataPath, data);
  const val = formatValue(rawVal, format);

  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${position.width}px`,
    height: `${position.height}px`
  };

  if (type === "checkbox") {
    const checked = invertCheckbox ? !rawVal : !!rawVal;
    return (
      <div className="absolute" style={style}>
        {checked && <div className="text-lg">✓</div>}
      </div>
    );
  }

  return (
    <div className="absolute text-xs" style={style}>
      {val}
    </div>
  );
};

export default FieldOverlay;
