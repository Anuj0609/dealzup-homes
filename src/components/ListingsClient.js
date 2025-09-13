"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ListingsClient({
  setType,
  setPropertyType,
  setLocation,
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    setType(searchParams.get("type") || "");
    setPropertyType(searchParams.get("propertyType") || "");
    setLocation(searchParams.get("location") || "");
  }, [searchParams, setType, setPropertyType, setLocation]);

  return null;
}
