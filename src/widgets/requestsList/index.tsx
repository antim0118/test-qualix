import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";
import { Box, List, Text } from "@chakra-ui/react";

const RequestsList = () => {
    const requests = useSelector((state: RootState) => state.requests.items);
    const navigate = useNavigate();

    return (
        <Box>
            {requests.length === 0 ? (
                <Text>Нет данных</Text>
            ) : (
                <List.Root p={0} listStyle="none">
                    {requests.map((req) => (
                        <List.Item
                            key={req.id}
                            border="1px solid #ccc"
                            borderRadius={16}
                            p={4}
                            mb={2}
                            cursor="pointer"
                            onClick={() => navigate(`/requests/${req.id}`)}
                        >
                            <Text fontSize="medium" fontWeight={600}>
                                {req.title}
                            </Text>
                            <Text fontSize="smaller">{req.description}</Text>
                            <Text fontSize="smaller" color="gray">
                                {req.category} - {new Date(req.createdAt).toLocaleString()}
                            </Text>
                        </List.Item>
                    ))}
                </List.Root>
            )}
        </Box>
    );
};

export default RequestsList;
