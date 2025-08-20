import { Button, Group, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import type {DeleteDialogProps} from "@/lib/types.ts";

export default function DeleteDialog({
                                         title = "Eliminar",
                                         description = "¿Seguro que querés eliminar este elemento? Esta acción no se puede deshacer.",
                                         onConfirm,
                                         triggerLabel = "Eliminar",
                                         confirmLabel = "Sí, eliminar",
                                         size = "sm",
                                         color = "red",
                                     }: DeleteDialogProps) {
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useDisclosure(false);

    const handleConfirm = async () => {
        try {
            setLoading.open();
            await onConfirm();
            close();
        } finally {
            setLoading.close();
        }
    };

    return (
        <>
            <Button color={color} variant="light" onClick={open}>
                {triggerLabel}
            </Button>

            <Modal opened={opened} onClose={close} title={title} size={size} centered>
                <Text mb="md">{description}</Text>
                <Group justify="flex-end">
                    <Button variant="default" onClick={close}>Cancelar</Button>
                    <Button color={color} loading={loading} onClick={handleConfirm}>
                        {confirmLabel}
                    </Button>
                </Group>
            </Modal>
        </>
    );
}