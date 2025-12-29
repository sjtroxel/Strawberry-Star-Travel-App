import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFavorites } from "./useFavorites";

// --- Hoisted mocks ---
const { mockUseUser, mockFrom } = vi.hoisted(() => ({
    mockUseUser: vi.fn(),
    mockFrom: vi.fn(),
}))

// --- Mock useUser ---
vi.mock("./useUser", () => ({
  useUser: () => mockUseUser(),
}));

// --- Mock Supabase ---
vi.mock("../supabaseClient", () => ({
  supabase: {
    from: mockFrom,
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

// --- Tests ---
describe("useFavorites", () => {

  it("returns empty favorites when user is not logged in", async () => {
    mockUseUser.mockReturnValue({ user: null });

    mockFrom.mockReturnValue({
      select: () => ({
        eq: async () => ({ data: [], error: null }),
      }),
    });

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.favorites).toEqual([]);
      expect(result.current.loading).toBe(false);
    });
  });

    it("loads favorites when user is logged in", async () => {
    mockUseUser.mockReturnValue({
      user: { id: "user-123" },
    });

    mockFrom.mockReturnValue({
      select: () => ({
        eq: async () => ({
          data: [{ star_id: "42" }, { star_id: "7" }],
          error: null,
        }),
      }),
    });

    const { result } = renderHook(() => useFavorites());

    await waitFor(() => {
      expect(result.current.favorites).toEqual([42, 7]);
      expect(result.current.loading).toBe(false);
    });
  });
});