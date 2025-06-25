import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RequestsPage from "@/pages/requests";
import RequestsNewPage from "@/pages/requestsNew";
import RequestDetailPage from "@/pages/requestsDetail";
import { Center } from "@chakra-ui/react";

function App() {
    return (
        <Center>
            <BrowserRouter basename="/test-qualix">
                <Routes>
                    <Route path="/" element={<Navigate to="/requests" />} />
                    <Route path="/requests" element={<RequestsPage />} />
                    <Route path="/requests/new" element={<RequestsNewPage />} />
                    <Route path="/requests/:id" element={<RequestDetailPage />} />
                </Routes>
            </BrowserRouter>
        </Center>
    );
}

export default App;
