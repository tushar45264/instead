type FieldType = "text" | "date" | "checkbox" | "amount" | "ssn";

type optionalValueType = string | date | number | boolean | undefined

export type FieldAnnotation = {
    id:string
    label: string
    type: FieldType
    page: number
    isMandatory: boolean
    position: Coordinates
    dataPath: string | string[]
    invertCheckbox?: boolean
    format?: 'currency' | 'ssn' | 'date' | 'uppercase';
    options?: {
        multiline?: boolean;
        allowNull?: boolean;
    }
    optionalValues: Record<string, optionalValueType>
    created_at: string
    updated_at: string
}

type incomingData = {
    id:string
    version:string
    label: string
    description: string
    coordinates: Coordinates,
    formFields: Record<string, FieldAnnotation>
    created_at:string
    updated_at:string
}

type Coordinates = {
  x: number;
  y: number;
  width: number;
  height: number;
}

