import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useFavorites } from "./useFavorites";

// --- Mock useUser ---
vi.mock("./useUser", () => ({
  useUser: () => ({ user: null }),
}));

// --- Mock Supabase ---
vi.mock("../supabaseClient", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        eq: async () => ({ data: [], error: null }),
      }),
      insert: async () => ({ error: null }),
      delete: () => ({
        eq: async () => ({ error: null }),
      }),
    }),
  },
}));

describe("useFavorites", () => {
  it("returns empty favorites when user is not logged in", () => {
    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual([]);
    expect(result.current.loading).toBe(false);
  });
});
