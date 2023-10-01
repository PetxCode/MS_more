import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { publishConnection } from "../utils/connection";
import axios from "axios";

const prisma = new PrismaClient();

export const createProfile = async (req: any, res: Response) => {
  try {
    const { id } = req.user;
    const { fullName, userName } = req.body;

    const profile = await prisma.crowdProile.create({
      data: {
        email: "email",
        userID: id,

        fullName,
        userName,

        walletBalance: 0,
        history: [],
      },
    });

    publishConnection("profiled2", profile);

    return res.status(201).json({
      message: "Your profile has been created successfully",
      data: profile,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
      data: error,
    });
  }
};

export const viewProfile = async (req: Request, res: Response) => {
  try {
    const { profileID } = req.params;

    const profile = await prisma.crowdProile.findUnique({
      where: { id: profileID },
    });
    return res.status(200).json({
      message: "profile",
      data: profile,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};

export const updateCompanyProfile = async (req: any, res: Response) => {
  try {
    const { id } = req.user;
    const { profileID } = req.params;
    const { companyName, companyLocation, companyRole } = req.body;

    const profile = await prisma.crowdProile.update({
      where: { id: profileID },
      data: {
        companyName,
        companyLocation,
        companyRole,
      },
    });
    // publishConnection("profiled2", profile);

    const data = await axios
      .patch(`http://localhost:3300/api/${id}/update-account`, profile)
      .then((res) => {
        return res.data.data.profile;
      });

    // const newData = data.filter((el: any) => {
    //   return el.id === profileID;
    // });

    // newData.push(profile);
    // console.log(profile);

    return res.status(201).json({
      message: "profile",
      data,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error Profile",
      data: error,
    });
  }
};

export const daleteProfile = async (req: Request, res: Response) => {
  try {
    const { profileID } = req.params;

    await prisma.crowdProile.delete({
      where: { id: profileID },
    });
    return res.status(201).json({
      message: "profile deleted",
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error",
    });
  }
};
