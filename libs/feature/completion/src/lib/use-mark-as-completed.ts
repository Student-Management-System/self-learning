import { trpc } from "@self-learning/api-client";
import { useSession } from "next-auth/react";
import { useCallback } from "react";

export function useMarkAsCompleted(lessonId: string, onSettled?: () => void) {
	const session = useSession();

	const { mutate } = trpc.useMutation("user-completion.markAsCompleted", {
		onSettled(data, error) {
			console.log(data);
			console.log(error);
			trpc.useContext().invalidateQueries(["user-completion.getCourseCompletion"]);
		}
	});

	const markAsCompleted = useCallback(() => {
		const username = session.data?.user?.name;

		if (!username) {
			console.error("markAsCompleted was called without a logged in user.");
			return () => {
				/** NOOP */
			};
		}

		return mutate(
			{ lessonId },
			{
				onSettled: (data, error) => {
					if (!error) {
						console.log(`Lesson ${lessonId} marked as completed.`);
						console.log(data);
					} else {
						console.error(error);
					}

					if (onSettled) {
						onSettled();
					}
				}
			}
		);
	}, [lessonId, session.data?.user?.name, mutate, onSettled]);

	return markAsCompleted;
}
