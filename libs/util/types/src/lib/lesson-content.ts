import { z } from "zod";

export const videoSchema = z.object({
	type: z.literal("video"),
	value: z.object({
		url: z.string()
	}),
	meta: z.object({
		duration: z.number()
	})
});

export const articleSchema = z.object({
	type: z.literal("article"),
	value: z.object({
		content: z.string()
	}),
	meta: z.object({
		estimatedDuration: z.number()
	})
});

export const lessonContentSchema = z.discriminatedUnion("type", [videoSchema, articleSchema]);

export type Video = z.infer<typeof videoSchema>;
export type Article = z.infer<typeof articleSchema>;

export type LessonContentType = z.infer<typeof lessonContentSchema>;
export type LessonContentMediaType = LessonContentType["type"];
export type LessonContent = LessonContentType[];

type InferContentType<
	CType extends LessonContentType["type"],
	Union = LessonContentType
> = Union extends {
	type: CType;
}
	? Union
	: never;

export type ValueByContentType<CType extends LessonContentType["type"]> =
	InferContentType<CType>["value"];

export type MetaByContentType<CType extends LessonContentType["type"]> =
	InferContentType<CType>["meta"];

export function findContentType<CType extends LessonContentType["type"]>(
	type: CType,
	content: LessonContent
): { content: InferContentType<CType> | null; index: number } {
	const index = content.findIndex(c => c.type === type);

	if (index >= 0) {
		return { content: content[index] as InferContentType<CType>, index };
	}

	return { content: null, index };
}

export function includesMediaType(
	types: LessonContentType["type"][],
	type: string
): { isIncluded: boolean; type: LessonContentType["type"] } {
	return {
		isIncluded: types.includes(type as LessonContentType["type"]),
		type: type as LessonContentType["type"]
	};
}
