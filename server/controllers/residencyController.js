import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';

export const createResidency = asyncHandler(async (req, res) => {
    const {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        userEmail,
    } = req.body.data;

    console.log(req.body.data);

    try {
        if (!userEmail) {
            res.status(400).send({ message: "User email is required" });
            return;
        }

        // Check if the User with the provided email exists
        const user = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (!user) {
            res.status(404).send({ message: "User not found" });
            return;
        }

        const residency = await prisma.residency.create({
            data: {
                title,
                description,
                price,
                address,
                country,
                city,
                facilities,
                image,
                owner: { connect: { email: userEmail } },
            },
        });

        res.send({ message: "Residency created successfully", residency });

    } catch (err) {
        if (err.code === "P2002") {
            throw new Error("A Residency with the same address already exists");
        }
        throw new Error(err.message);
    }
});

// function to get all the documents/residencies
export const getAllResidencies = asyncHandler(async (req, res) => {
    const residencies = await prisma.residency.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.send(residencies);
});

// function to get a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const residency = await prisma.residency.findUnique({
        where: { id },
      });
      res.send(residency);
    } catch (err) {
      throw new Error(err.message);
    }
});
