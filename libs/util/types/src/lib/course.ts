import type { EnrollmentStatus } from "@prisma/client";

export type Completion = {
	/** Number of lessons in this chapter (includes nested chapters). */
	lessonCount: number;
	/** Number of completed lessons in this chapter (includes nested chapters). */
	completedLessonCount: number;
	completionPercentage: number;
};

export type CourseCompletion = {
	completion: Completion;
	content: (LessonWithCompletion | ChapterWithCompletion)[];
};

type ChapterWithCompletion = CourseChapter & {
	completion: Completion;
	content: (LessonWithCompletion | ChapterWithCompletion)[];
};

type LessonWithCompletion = CourseLesson & {
	isCompleted: boolean;
};

export type CourseEnrollment = {
	completedAt: Date | null;
	status: EnrollmentStatus;
	course: {
		title: string;
		slug: string;
	};
};

export type CourseChapter = {
	type: "chapter";
	/** Dot-separated chapter number, i.e. `1` or `1.1` or `1.1.1` */
	chapterNr: string;
	title: string;
	description: string | null;
	content: CourseContent;
};

export type CourseLesson = {
	type: "lesson";
	lessonNr: number;
	lessonId: string;
};

export type CourseContent = (CourseChapter | CourseLesson)[];

export function extractLessonIds(content: CourseContent): string[] {
	const lessonIds: string[] = [];

	for (const chapterOrLesson of content) {
		if (chapterOrLesson.type === "chapter") {
			lessonIds.push(...extractLessonIds(chapterOrLesson.content));
		} else {
			lessonIds.push(chapterOrLesson.lessonId);
		}
	}

	return lessonIds;
}

/** Creates an object with the shape of a {@link CourseChapter}.*/
export function createChapter(
	title: string,
	content: CourseContent,
	description?: string
): CourseChapter {
	return {
		type: "chapter",
		title,
		description: description ?? null,
		content,
		chapterNr: title
	};
}

/** Creates an object with the shape of a {@link CourseLesson}. */
export function createLesson(lessonId: string): CourseLesson {
	return {
		type: "lesson",
		lessonId,
		lessonNr: 0
	};
}

/**
 * Traverses a {@link CourseContent} array and executes the given callback `fn` for every chapter or lesson.
 *
 * @example
 * let lessonCount = 0;
 * let chapterCount = 0;
 * traverseCourseContent(content, lessonOrChapter => {
 * 	if (lessonOrChapter.type === "chapter") chapterCount++;
 * 	else if (lessonOrChapter.type === "lesson") lessonCount++;
 * });
 */
export function traverseCourseContent<
	T extends ({ type: "chapter"; content: Array<unknown> } | { type: "lesson" })[] // T only extends necessary types; allows custom attributes
>(content: T, fn: (chapterOrLesson: T[0]) => void) {
	content.forEach(item => {
		if (item.type === "chapter") {
			fn(item);
			traverseCourseContent(item.content as T, fn);
		} else {
			fn(item);
		}
	});
}

/** Sets `chapterNr` and `lessonNr` for each chapter/lesson. */
export function createCourseContent(
	content: CourseContent,
	lessonNrRef = { value: 1 },
	parentChapterNr = ""
): CourseContent {
	let chapterNr = 1;

	for (const chapterOrLesson of content) {
		if (chapterOrLesson.type === "chapter") {
			chapterOrLesson.chapterNr =
				parentChapterNr === "" ? `${chapterNr}` : `${parentChapterNr}.${chapterNr}`;
			chapterOrLesson.content = createCourseContent(
				chapterOrLesson.content,
				lessonNrRef,
				chapterOrLesson.chapterNr
			);
			chapterNr++;
		} else {
			chapterOrLesson.lessonNr = lessonNrRef.value++;
		}
	}

	return content;
}
