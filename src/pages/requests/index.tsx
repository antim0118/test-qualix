import RequestsList from "@/widgets/requestsList";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const RequestsPage = () => {
    const navigate = useNavigate();

    return (
        <Flex direction="column" minW={256}>
            <Flex direction="column" p={5} gap={5}>
                <Heading size="4xl">Список заявок</Heading>
                <Button onClick={() => navigate("/requests/new")}>Создать заявку</Button>
            </Flex>
            <RequestsList />
        </Flex>
    );
};

export default RequestsPage;
