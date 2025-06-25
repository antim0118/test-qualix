import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type Request = {
    id: string;
    title: string;
    description: string;
    category: string;
    createdAt: string;
};

interface RequestsState {
    items: Request[];
}

const STORAGE_KEY = "requests";

function loadRequestsFromStorage(): Request[] {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) return JSON.parse(data);
    } catch (err) {
        console.warn("Не удалось загрузить localStorage: ", err);
    }
    return [];
}

function saveRequestsToStorage(requests: Request[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    } catch (err) {
        console.warn("Не удалось загрузить localStorage: ", err);
    }
}

const initialState: RequestsState = {
    items: loadRequestsFromStorage(),
};

const requestSlice = createSlice({
    name: "requests",
    initialState,
    reducers: {
        addRequest: (state, action: PayloadAction<Omit<Request, "id" | "createdAt">>) => {
            state.items.push({
                ...action.payload,
                id: uuidv4(),
                createdAt: new Date().toISOString(),
            });
            saveRequestsToStorage(state.items);
        },
        removeRequest: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((req) => req.id !== action.payload);
            saveRequestsToStorage(state.items);
        },
        updateRequest: (state, action: PayloadAction<Request>) => {
            const idx = state.items.findIndex((req) => req.id === action.payload.id);
            if (idx !== -1) state.items[idx] = action.payload;
            saveRequestsToStorage(state.items);
        },
        setRequests: (state, action: PayloadAction<Request[]>) => {
            state.items = action.payload;
            saveRequestsToStorage(state.items);
        },
    },
});

export const { addRequest, removeRequest, updateRequest, setRequests } = requestSlice.actions;
export const requestReducer = requestSlice.reducer;
