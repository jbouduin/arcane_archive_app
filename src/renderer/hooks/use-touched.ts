import React from "react";

export function useTouched() {
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});
  const markTouched = (field: string) => setTouched(prev => ({ ...prev, [field]: true }));
  const isTouched = (field: string) => !!touched[field];
  return { isTouched, markTouched };
}
