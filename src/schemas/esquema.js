import {z} from "zod";

export const esquemaCancionItunes = z.object({
    trackId: z.number(),
    trackName: z.string(),
    artistName: z.string(),
    artworkUrl100: z.string().optional(),
    previewUrl: z.string().optional(),
    trackViewUrl: z.string().optional(),
});

export const esquemaResupuestaItunes = z.array(esquemaCancionItunes);