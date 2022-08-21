import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../utils/prismaClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') return res.status(404).json({ message: 'please use with a slug' });

  const data = await prisma.slug.findFirst({
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  if (!data) return res.status(404).json({ message: 'slug not found' });

  return res.json(data);
};
