import { LabeledField } from "@self-learning/ui/forms";
import { motion } from "framer-motion";
import { useQuestion } from "../../use-question-hook";
import { ShortText } from "./schema";

export function ShortTextAnswer() {
	const { question, answer, setAnswer, evaluation } = useQuestion<
		ShortText["question"],
		ShortText["answer"],
		ShortText["evaluation"]
	>();

	return (
		<div className="flex flex-col gap-8">
			<LabeledField label="Antwort">
				<input
					value={answer.value ?? ""}
					onChange={e =>
						setAnswer({
							questionId: question.questionId,
							type: question.type,
							value: e.target.value
						})
					}
					disabled={!!evaluation}
					className="textfield"
					type="text"
				/>
			</LabeledField>

			{evaluation && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ type: "tween", duration: 0.5 }}
					className={`rounded-lg border p-8 text-white ${
						evaluation.isCorrect
							? "border-green-500 bg-green-100 text-green-500"
							: " border-red-500 bg-red-100 text-red-500"
					}`}
				>
					{evaluation.isCorrect ? (
						<span className="font-medium">Deine Antwort ist richtig!</span>
					) : (
						<div className="flex flex-col gap-2">
							<span className="font-medium">
								Deine Antwort ist leider nicht korrekt. Akzeptierte Antworten:
							</span>
							<ul className="list-inside list-disc">
								{question.acceptedAnswers.map(ans => (
									<li key={ans.acceptedAnswerId}>{ans.value}</li>
								))}
							</ul>
						</div>
					)}
				</motion.div>
			)}
		</div>
	);
}
