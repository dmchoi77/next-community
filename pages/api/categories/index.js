import { connectToDatabase } from '../../lib/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const categories = await db.collection('categories').find({}).toArray();

  res.json(categories);
};
