import amqp from "amqplib";
import { PrismaClient } from "@prisma/client";
const amqpServer = "amqp://localhost:5672";

const prisma = new PrismaClient();

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

      // console.log(myData);

      const account: any = await prisma.crowdAbeg.findUnique({
        where: { id: myData?.abegID },
      });

      // console.log(account);

      account?.givers.push(myData);

      const prof = await prisma.crowdAbeg.update({
        where: { id: myData?.abegID },
        data: {
          givers: account?.givers,
          amountNeeded: account.amountNeeded - myData.amount,
          amountRaised: account.amountRaised + myData.amount,
        },
      });

      console.log(account.amountNeeded);
      console.log(myData.amount);

      console.log(prof);

      await channel.ack(message);
    });
  } catch (error) {
    console.log(error);
  }
};
