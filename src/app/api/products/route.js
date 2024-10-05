import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import {isAdminRequest} from "@/app/api/auth/[...nextauth]/route";


export async function GET (request) {
    try {
        await mongooseConnect();
        await isAdminRequest();

        if (request.query?.id) {
            return Response.json(await Product.findOne({_id:request.query.id}), {
                status: 200,
            });
          } else {
            return Response.json(await Product.find(), {
                status: 200,
            });
          }
    } catch (error) {
        return Response.json("Something went wrong.", {
            status: 500,
        })
    }
}
export async function POST (request) {
    try {
        await mongooseConnect();
        await isAdminRequest();

        const {title,description,price,images,category,properties} = request.body;
        const productDoc = await Product.create({
        title,description,price,images,category,properties,
        })
        return Response.json(productDoc, {
            status: 200,
        });
    } catch (error) {
        return Response.json("Something went wrong.", {
            status: 500,
        })
    }
}
export async function PUT (request) {
    try {
        await mongooseConnect();
        await isAdminRequest();

        const {title,description,price,images,category,properties,_id} = request.body;
        await Product.updateOne({_id}, {title,description,price,images,category,properties});
        return Response.json(true, {
            status: 200,
        });
    } catch (error) {
        return Response.json("Something went wrong.", {
            status: 500,
        })
    }
}
export async function DELETE (request) {
    try {
        await mongooseConnect();
        await isAdminRequest();

        if (request.query?.id) {
            await Product.deleteOne({_id:request.query?.id});
            return Response.json(true, {
                status: 200,
            });
          }
    } catch (error) {
        return Response.json("Something went wrong.", {
            status: 500,
        })
    }
}