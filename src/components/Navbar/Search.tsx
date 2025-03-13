"use client"
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce'

const Search = () => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const [search, setSearch] = useState(searchParams.get('search')?.toString() || '')
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set('search', value)
    } else {
      params.delete('search')
    }
    replace(`/?${params.toString()}`)
  }, 200)

  useEffect(() => {
    if (!searchParams.get('search')) {
      setSearch('')
    }
  }, [searchParams])

  return (
    <Input
      type="text"
      placeholder="Search Something" className="max-w-xs" onChange={(e) => {
        setSearch(e.target.value)
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
};

export default Search;
