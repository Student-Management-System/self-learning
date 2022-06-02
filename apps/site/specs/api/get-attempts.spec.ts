import { Prisma } from "@prisma/client";
import { database } from "@self-learning/database";
import { getAllAttempts } from "../../pages/api/users/[username]/lessons/[lessonId]/quiz-attempts/get-attempts";

// describe("getAttemptsApiHandler", () => {
// 	// it("Query: Missing [username] -> ValidationError (400)", async () => {
// 	// 	return testApiHandler({
// 	// 		handler: addCompetenceApiHandler,
// 	// 		params: {
// 	// 			competenceId: "competence-1"
// 	// 		},
// 	// 		test: async ({ fetch }) => {
// 	// 			const res = await fetch({ method: "POST" });
// 	// 			const json = await res.json();

// 	// 			expect(res.status).toEqual(400);
// 	// 			expect(json.error.statusCode).toEqual(400);
// 	// 			expect(res.status).toEqual(400);
// 	// 		}
// 	// 	});
// 	// });

// });

describe("getAllAttempts", () => {
	it("Gets all attempts of user for a lesson", async () => {
		await database.quizAttempt.deleteMany();

		const lesson: Prisma.LessonCreateInput = {
			lessonId: "lesson-1",
			slug: "test-lesson",
			title: "Test Lesson"
		};

		const otherLesson: Prisma.LessonCreateInput = {
			lessonId: "other-lesson",
			slug: "other-lesson",
			title: "Other Lesson"
		};

		await database.lesson.create({ data: lesson });
		await database.lesson.create({ data: otherLesson });

		const username = "potter";
		const otherUser = "weasley";

		await database.quizAttempt.create({
			data: {
				answers: "[]",
				state: "COMPLETED",
				lessonId: lesson.lessonId,
				username: username
			}
		});

		await database.quizAttempt.create({
			data: {
				answers: "[]",
				state: "COMPLETED",
				lessonId: lesson.lessonId,
				username: username
			}
		});

		await database.quizAttempt.create({
			data: {
				answers: "[]",
				state: "COMPLETED",
				lessonId: otherLesson.lessonId,
				username: username
			}
		});

		await database.quizAttempt.create({
			data: {
				answers: "[]",
				state: "COMPLETED",
				lessonId: otherLesson.lessonId,
				username: otherUser
			}
		});

		const attempts = await getAllAttempts(username, lesson.lessonId);

		expect(attempts).toHaveLength(2);
	});
});