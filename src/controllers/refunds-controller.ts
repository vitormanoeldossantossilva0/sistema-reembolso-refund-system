import { AppError } from "@/utils/AppError";
import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

const CategoriesEnum = z.enum([
  "food",
  "others",
  "services",
  "transport",
  "accommodation",
]);

class RefundsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().min(1),
      category: CategoriesEnum,
      amount: z.number().positive(),
      filename: z.string().min(20),
    });

    const { name, category, amount, filename } = bodySchema.parse(request.body);

    if (!request.user?.id) {
      throw new AppError("Não autorizado", 401);
    }

    const refund = await prisma.refunds.create({
      data: {
        name,
        category,
        amount,
        filename,
        userId: request.user.id,
      },
    });

    response.status(201).json(refund);
  }

  async index(request: Request, response: Response) {
  const querySchema = z.object({
    name: z.string().optional().default(""),
    page: z.coerce.number().optional().default(1),
    perPage: z.coerce.number().optional().default(10),
  });

  const { name, page, perPage } = querySchema.parse(request.query);

  const skip = (page - 1) * perPage;

  const refunds = await prisma.refunds.findMany({
    where: {
      name: {
        contains: name.trim(),
      },
    },
    skip,
    take: perPage,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  const totalRecords = await prisma.refunds.count({
    where: {
      name: {
        contains: name.trim(),
      },
    },
  });

  const totalPages = Math.ceil(totalRecords / perPage);

  response.json({
    refunds,
    pagination: {
      page,
      perPage,
      totalRecords,
      totalPages: totalPages > 0 ? totalPages : 1,
    },
  });
}
 async show(request: Request, response: Response) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  });

  const { id } = paramsSchema.parse(request.params);

  if (!request.user?.id) {
    throw new AppError("Não autorizado", 401);
  }

  const refund = await prisma.refunds.findFirst({
    where: {
      id,
      ...(request.user.role === "employee"
        ? { userId: request.user.id }
        : {}),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
    },
  });

  if (!refund) {
    throw new AppError("Reembolso não encontrado", 404);
  }

  response.json(refund);
}
}

export { RefundsController };
