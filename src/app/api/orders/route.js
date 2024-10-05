import {mongooseConnect} from "@/lib/mongoose";
import {Order} from "@/models/Order";

export async function GET(request) {
    try {
        await mongooseConnect();
        return Response.json(await Order.find().sort({createdAt:-1}), {
          status: 200,
        });
    } catch (error) {
        return Response.json("Something went wrong.", {
            status: 500,
        })
    }
}