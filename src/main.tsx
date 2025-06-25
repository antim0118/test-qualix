import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { Provider as ChakraProvider } from "@/shared/components/ui/provider";
import { store } from "@/app/store";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ReduxProvider store={store}>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </ReduxProvider>
    </StrictMode>
);
