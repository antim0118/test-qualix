import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RequestForm } from "@/features/request-form";
import type { RequestFormValues } from "@/features/request-form";
import { addRequest } from "@/entities/request/model";
import type { AppDispatch } from "@/app/store";
import { Flex, Heading } from "@chakra-ui/react";

const RequestsNewPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleSubmit = (values: RequestFormValues) => {
        dispatch(addRequest(values));
        navigate("/requests");
    };

    return (
        <Flex direction="column" gap={5}>
            <Heading size="4xl" mt={5}>
                Создание заявки
            </Heading>
            <RequestForm onSubmit={handleSubmit} />
        </Flex>
    );
};

export default RequestsNewPage;
