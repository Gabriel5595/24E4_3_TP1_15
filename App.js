import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { questions } from './assets/question';

const Question = ({ question, options, onAnswer }) => (
  <View style={styles.questionContainer}>
    <Text style={styles.question}>{question}</Text>
    {options.map((option, index) => (
      <Button key={index} title={option} onPress={() => onAnswer(option)} />
    ))}
  </View>
);

const QuizResult = ({ score, totalQuestions }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Fim do Quiz!</Text>
    <Text style={styles.score}>Sua pontuação: {score} de {totalQuestions}</Text>
  </View>
);

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    return <QuizResult score={score} totalQuestions={questions.length} />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz</Text>
      <Question
        question={currentQuestion.question}
        options={currentQuestion.options}
        onAnswer={handleAnswer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
