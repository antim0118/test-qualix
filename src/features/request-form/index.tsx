import { Button, createListCollection, Field, Flex, Input, Portal, Select, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const CATEGORIES = createListCollection({
    items: ["Баг", "Недочёт", "Уведомление"].map((item) => ({ label: item, value: item })),
});

export type RequestFormValues = {
    title: string;
    description: string;
    category: string;
};

interface RequestFormProps {
    initialValues?: RequestFormValues;
    onSubmit: (values: RequestFormValues) => void;
    submitText?: string;
    onCancel?: () => void;
}

const RequestForm = ({ initialValues, onSubmit, submitText = "Создать заявку", onCancel }: RequestFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RequestFormValues>({
        defaultValues: initialValues,
    });

    return (
        <form onSubmit={handleSubmit((data) => onSubmit(data))} style={{ maxWidth: 400 }}>
            <Flex direction="column" gap={5}>
                <Field.Root invalid={!!errors.title} required>
                    <Field.Label>
                        Название заявки <Field.RequiredIndicator />
                    </Field.Label>
                    <Input placeholder="Введите название заявки" {...register("title")} />
                    <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.description} required>
                    <Field.Label>
                        Описание <Field.RequiredIndicator />
                    </Field.Label>
                    <Textarea placeholder="Введите описание" minH={20} {...register("description")} />
                    <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={!!errors.category} required>
                    <Field.Label>
                        Категория <Field.RequiredIndicator />
                    </Field.Label>
                    <Select.Root collection={CATEGORIES} size="sm" width="320px" {...register("category")}>
                        <Select.HiddenSelect />
                        <Select.Control>
                            <Select.Trigger>
                                <Select.ValueText placeholder="Выберите категорию" />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Portal>
                            <Select.Positioner>
                                <Select.Content>
                                    {CATEGORIES.items.map((framework) => (
                                        <Select.Item item={framework} key={framework.value}>
                                            {framework.label}
                                            <Select.ItemIndicator />
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Positioner>
                        </Portal>
                    </Select.Root>
                    <Field.ErrorText>{errors.category?.message}</Field.ErrorText>
                </Field.Root>
                <Flex direction="column" gap={2}>
                    <Button type="submit">{submitText}</Button>
                    {onCancel && (
                        <Button type="button" onClick={onCancel}>
                            Отмена
                        </Button>
                    )}
                </Flex>
            </Flex>
        </form>
    );
};

export { RequestForm, CATEGORIES };
