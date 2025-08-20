import { Button, Group, NumberInput, Select, TextInput, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { CreateBookData } from "@/lib/types";
import type { PropsForm } from "@/lib/types";

const GENRES = ["Fiction","Fantasy","Science Fiction","Historical Fiction","Romance","Mystery","Nonfiction"];
const LANGS  = ["English","Spanish","French","Italian","Russian","German","Portuguese"];

export default function BookForm({ initial, loading, onSubmit }: PropsForm){
    const form = useForm<CreateBookData>({
        initialValues: {
            title: "",
            author: "",
            publicationYear: new Date().getFullYear(),
            language: "",
            genre: "",
            pages: 100,
            isAvailable: true,
            ...initial,
        },
        validate: {
            title: (v) => (!v ? "El título es obligatorio" : null),
            author: (v) => (!v ? "El autor es obligatorio" : null),
            publicationYear: (v) =>
                !v ? "Año obligatorio" :
                    v < 0 ? "Año inválido" :
                        v > new Date().getFullYear() ? "No puede ser futuro" : null,
            language: (v) => (!v ? "Idioma obligatorio" : null),
            genre: (v) => (!v ? "Género obligatorio" : null),
            pages: (v) => (v && v > 0 ? null : "Debe ser mayor a 0"),
        },
    });

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <TextInput label="Título" placeholder="Ej: The Great Gatsby" withAsterisk {...form.getInputProps("title")} mt="sm" />
            <TextInput label="Autor" placeholder="F. Scott Fitzgerald" withAsterisk {...form.getInputProps("author")} mt="sm" />

            <Group grow mt="sm">
                <NumberInput label="Año de publicación" withAsterisk {...form.getInputProps("publicationYear")} />
                <NumberInput label="Páginas" withAsterisk min={1} {...form.getInputProps("pages")} />
            </Group>

            <Group grow mt="sm">
                <Select label="Idioma" data={LANGS} withAsterisk {...form.getInputProps("language")} />
                <Select label="Género" data={GENRES} withAsterisk {...form.getInputProps("genre")} />
            </Group>

            <Checkbox mt="md" label="Disponible" {...form.getInputProps("isAvailable", { type: "checkbox" })} />

            <Group justify="flex-end" mt="lg">
                <Button type="submit" loading={loading}>Guardar</Button>
            </Group>
        </form>
    );

}


