'use server';

import Question from '@/database/models/question.model';
import Tag from '@/database/models/tag.model';
import { connectToDatabase } from '../../database/mongoose';
import { CreateQuestionParams, GetQuestionsParams } from './shared.types';
import User from '@/database/models/user.model';
import { revalidatePath } from 'next/cache';

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({ path: 'tags', model: Tag })
      .populate({ path: 'author', model: User })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createQuestion(paraams: CreateQuestionParams) {
  try {
    connectToDatabase();

    const { title, content, tags, author, path } = paraams;

    const question = new Question({
      title,
      content,
      author
    });

    await question.save();

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, 'i') } },
        { $setOnInsert: { name: tag, $push: { question: question._id } } },
        { upsert: true, new: true }
      );

      tagDocuments.push(existingTag);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } }
    });

    // create a interacction record for the users ask question

    // increment authors reputation by +5 for creating a question

    revalidatePath(path);
  } catch (error) {}
}
