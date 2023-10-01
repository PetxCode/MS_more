import amqp from "amqplib";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const amqpServer = "amqp://localhost:5672";

export const publishConnection = async (queue: string, data: any) => {
  try {
    const connect = await amqp.connect(amqpServer);
    const channel = await connect.createChannel();

    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
  } catch (error) {
    console.log(error);
  }
};

export const consumeConnection = async (queue: string) => {
  try {
    const connect = await amqp.connect(amqpServer);
    const channel = await connect.createChannel();

    await channel.assertQueue(queue);
    await channel.consume(queue, async (message: any) => {
      const myData = JSON.parse(message.content.toString());

      const account: any = await prisma.crowdAuth.findUnique({
        where: { id: myData?.userID },
      });

      // account?.profile.push(myData);

      // account?.profile.push(account?.profile[account?.profile.length - 1]);

      if (account?.profile.length === 0) {
        account?.profile.push(myData);

        const prof = await prisma.crowdAuth.update({
          where: { id: myData?.userID },
          data: {
            profile: account?.profile,
          },
        });

        console.log("first build: ", prof);
      } else {
        let arr = account?.profile.filter((el: any) => {
          return el.id !== myData.id;
        });
        arr.push(myData);

        const prof = await prisma.crowdAuth.update({
          where: { id: myData?.userID },
          data: {
            profile: arr,
          },
        });

        console.log("resolved build: ", prof);
      }

      await channel.ack(message);
    });
  } catch (error) {
    console.log(error);
  }
};

export const consumeAbegConnection = async (queue: string) => {
  try {
    const connect = await amqp.connect(amqpServer);
    const channel = await connect.createChannel();

    await channel.assertQueue(queue);
    await channel.consume(queue, async (message: any) => {
      const myData = JSON.parse(message.content.toString());

      const account: any = await prisma.crowdAuth.findUnique({
        where: { id: myData?.userID },
      });

      account?.abeg.push(myData);

      const prof = await prisma.crowdAuth.update({
        where: { id: myData?.userID },
        data: {
          abeg: account?.abeg,
        },
      });

      console.log(prof);
      await channel.ack(message);
    });
  } catch (error) {
    console.log(error);
  }
};
