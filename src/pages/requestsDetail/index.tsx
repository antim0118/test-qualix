import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/app/store";
import { removeRequest, updateRequest } from "@/entities/request/model";
import { RequestForm } from "@/features/request-form";
import type { RequestFormValues } from "@/features/request-form";
import { useState } from "react";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useColorMode } from "@/shared/components/ui/color-mode";

const RequestDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const request = useSelector((state: RootState) => state.requests.items.find((r) => r.id === id));
    const [editOpen, setEditOpen] = useState(false);
    const colorMode = useColorMode().colorMode;

    if (!request) {
        return <Text m={8}>Заявка не найдена</Text>;
    }

    const handleDelete = () => {
        dispatch(removeRequest(request.id));
        navigate("/requests");
    };

    const handleEdit = (values: RequestFormValues) => {
        dispatch(updateRequest({ ...request, ...values }));
        setEditOpen(false);
    };

    return (
        <Flex direction="column" m={8}>
            <Heading as="h2">{request.title}</Heading>
            <Text fontSize="small" color="gray">
                {new Date(request.createdAt).toLocaleString()}
            </Text>
            <Text style={{ margin: "16px 0" }}>
                <b>Категория:</b> {request.category}
            </Text>
            <Text style={{ marginBottom: 24 }}>
                <b>Описание:</b>
                <br />
                {request.description}
            </Text>
            <Flex gap={8}>
                <Button onClick={() => setEditOpen(true)}>Редактировать заявку</Button>
                <Button onClick={handleDelete} color="white" bg="#d32f2f">
                    Удалить заявку
                </Button>
            </Flex>
            {editOpen && (
                <Flex
                    pos="fixed"
                    left={0}
                    top={0}
                    width="100vw"
                    height="100vh"
                    bg="rgba(128, 128, 128, 0.3)"
                    zIndex={1000}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Flex
                        direction="column"
                        gap={4}
                        background={colorMode === "light" ? "white" : "black"}
                        p={8}
                        borderRadius={8}
                        minW={320}
                    >
                        <Heading as="h3">Редактировать заявку</Heading>
                        <RequestForm
                            initialValues={{
                                title: request.title,
                                description: request.description,
                                category: request.category,
                            }}
                            onSubmit={handleEdit}
                            submitText="Сохранить"
                            onCancel={() => setEditOpen(false)}
                        />
                    </Flex>
                </Flex>
            )}
        </Flex>
    );
};

export default RequestDetailPage;
