'use server';

import Tag from '@/database/models/tag.model';
import { connectToDatabase } from '../../database/mongoose';
import { GetAllTagsParams, GetTopInteractedTagsParams } from './shared.types';
import User from '@/database/models/user.model';

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // find interactions with the user and group by tags
    // Interaction

    return [
      {
        _id: '1',
        name: 'tag1'
      },
      {
        _id: '2',
        name: 'tag2'
      }
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    const tags = await Tag.find({});

    return { tags };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
