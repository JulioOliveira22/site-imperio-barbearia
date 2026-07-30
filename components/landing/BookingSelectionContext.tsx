"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useSearchParams } from "next/navigation";
import {
  buildServiceIdsParam,
  getServiceById,
  parseServiceIdsParam,
} from "@/data/services";

type BookingSelectionContextValue = {
  barberId: string | null;
  selectedIds: string[];
  toggleService: (serviceId: string) => void;
  isServiceBlocked: (serviceId: string) => boolean;
  setBarberId: (id: string | null) => void;
};

const BookingSelectionContext = createContext<BookingSelectionContextValue | null>(
  null,
);

function readIdsFromSearchParams(searchParams: URLSearchParams) {
  const fromList = parseServiceIdsParam(searchParams.get("servicos"));
  const legacy = searchParams.get("servico");
  if (fromList.length > 0) return fromList;
  return legacy ? [legacy] : [];
}

function writeUrl(barberId: string | null, selectedIds: string[]) {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams();
  if (barberId) {
    params.set("barbeiro", barberId);
  }
  const encoded = buildServiceIdsParam(selectedIds);
  if (encoded) {
    params.set("servicos", encoded);
  }

  const query = params.toString();
  const hash = window.location.hash;
  const nextUrl = query ? `/?${query}${hash}` : `/${hash}`;
  window.history.replaceState(window.history.state, "", nextUrl);
}

export function BookingSelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const urlBarberId = searchParams.get("barbeiro");
  const urlSelectedIds = useMemo(
    () => readIdsFromSearchParams(searchParams),
    [searchParams],
  );

  const [barberId, setBarberIdState] = useState<string | null>(urlBarberId);
  const [selectedIds, setSelectedIds] = useState<string[]>(urlSelectedIds);

  // Sync from Next navigation (ex.: Link do barbeiro)
  useEffect(() => {
    setBarberIdState(urlBarberId);
    if (!urlBarberId) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds(urlSelectedIds);
  }, [urlBarberId]); // eslint-disable-line react-hooks/exhaustive-deps -- só realinha ao trocar barbeiro via Link

  const setBarberId = useCallback((id: string | null) => {
    setBarberIdState(id);
    setSelectedIds([]);
    writeUrl(id, []);
  }, []);

  const toggleService = useCallback(
    (serviceId: string) => {
      if (!barberId) return;

      const service = getServiceById(serviceId);
      if (!service) return;

      setSelectedIds((current) => {
        const exists = current.includes(serviceId);
        let next: string[];

        if (exists) {
          next = current.filter((id) => id !== serviceId);
        } else if (service.category === "Corte") {
          const withoutOtherCortes = current.filter((id) => {
            const currentService = getServiceById(id);
            return currentService?.category !== "Corte";
          });
          next = [...withoutOtherCortes, serviceId];
        } else {
          next = [...current, serviceId];
        }

        writeUrl(barberId, next);
        return next;
      });
    },
    [barberId],
  );

  const isServiceBlocked = useCallback(
    (serviceId: string) => {
      if (!barberId) return false;

      const service = getServiceById(serviceId);
      if (!service || service.category !== "Corte") return false;
      if (selectedIds.includes(serviceId)) return false;

      return selectedIds.some((id) => getServiceById(id)?.category === "Corte");
    },
    [barberId, selectedIds],
  );

  const value = useMemo(
    () => ({
      barberId,
      selectedIds,
      toggleService,
      isServiceBlocked,
      setBarberId,
    }),
    [barberId, selectedIds, toggleService, isServiceBlocked, setBarberId],
  );

  return (
    <BookingSelectionContext.Provider value={value}>
      {children}
    </BookingSelectionContext.Provider>
  );
}

export function useBookingSelection() {
  const context = useContext(BookingSelectionContext);
  if (!context) {
    throw new Error("useBookingSelection must be used within BookingSelectionProvider");
  }
  return context;
}
