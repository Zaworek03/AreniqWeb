"use client";

import { useCallback, useEffect, useState } from "react";
import type { WaitlistEntry } from "@/lib/campaign";
import { getSupabase } from "@/lib/supabase";

/** All waitlist rows, newest first. Supabase returns at most 1000 rows per request, so page through. */
export function useWaitlist() {
  const [rows, setRows] = useState<WaitlistEntry[] | null>(null);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    const supabase = getSupabase();
    if (!supabase) return;
    setError(false);
    const all: WaitlistEntry[] = [];
    const pageSize = 1000;
    for (let from = 0; ; from += pageSize) {
      const { data, error: err } = await supabase
        .from("waitlist")
        .select("id, created_at, name, email, horses, stable, country, lang, source")
        .order("created_at", { ascending: false })
        .range(from, from + pageSize - 1);
      if (err) {
        setError(true);
        return;
      }
      all.push(...(data as WaitlistEntry[]));
      if (data.length < pageSize) break;
    }
    setRows(all);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch from an external system
    load();
  }, [load]);

  return { rows, error, reload: load };
}
