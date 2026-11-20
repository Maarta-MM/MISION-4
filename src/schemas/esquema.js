import {z} from "zod";

export const esquemaCancionItunes = z.object({
    trackId: z.number(),
    trackName: z.string(),
    artistName: z.string(),
    artworkUrl100: z.string().optional(),
    previewUrl: z.string().optional(),
    trackViewUrl: z.string().optional(),
});

// coerce cambia a lo que quieras que sea, si mete string saca numero
export const esquemaFavorita = z.object({
    titulo: z.string().trim().min(1, "El título es obligatorio"),
    artista: z.string().trim().min(1, "El artista es obligatorio"),
    nota: z.coerce.number({error: "La nota debe ser un número"}).int("La nota debe ser un número entero").min(1, "Mínimo 1").max(5, "Máximo 5"),
    comentario: z.string().trim().max(350, "Máximo 350 caracteres"),
});

export const esquemaBusqueda = z.object({
    termino: z.string().trim().min(1, "Escribe algo para buscar"),
    tipo: z.enum(["cancion", "artista"]),
});

export const esquemaResupuestaItunes = z.array(esquemaCancionItunes);