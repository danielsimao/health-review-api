import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { Condition } from "../../interfaces/condition.interface";
import Button from "../Button";
import ConditionInput from "./ConditionInput";
import ConditionsList from "./ConditionsList";

interface ConditionsSectionProps {
  onSelect: (condition: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  condition?: string;
  style?: HTMLAttributes<HTMLDivElement>["style"];
}

export default function ConditionsSection({
  condition,
  onSelect,
  onSubmit,
  onClear,
  style,
}: ConditionsSectionProps) {
  const [search, setSearch] = useState(condition || "");
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearch(condition || "");
  }, [condition]);

  useEffect(() => {
    const condition = document.querySelector("#ehr");
    if (ref.current && ref2.current && condition) {
      const height = condition.scrollHeight;

      ref.current.style.height = `${height}px`;
      ref2.current.style.height = `${height - 65 - 80}px`;
    }
  }, []);

  function handleSelect(option: string) {
    onSelect(option);
    setSearch(option);
  }

  return (
    <div
      ref={ref}
      style={style}
      className="hidden md:block md:flex-1 md:overflow-hidden bg-white shadow rounded-lg"
    >
      <div className="">
        <div className="flex items-center py-2 pl-4 border-b border-gray-200">
          <ConditionInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onClear={onClear}
          />
        </div>
        <div ref={ref2} className="flex flex-col overflow-y-auto h-10">
          <ConditionsList onSelect={handleSelect} filter={search} />
        </div>
        <div className="flex items-center p-4 border-t border-gray-200">
          <Button onClick={onSubmit} className="w-full" variant="primary">
            Submit & Next
          </Button>
        </div>
      </div>
    </div>
  );
}
