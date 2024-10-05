import {Category} from "@/models/Category";
import {mongooseConnect} from "@/lib/mongoose";
import { getServerSession } from "next-auth/next"
import { isAdminRequest } from "@/app/api/auth/[...nextauth]/route";

 
export async function GET(request) {
    try {
        await mongooseConnect();
        await isAdminRequest();
        let data = await Category.find().populate('parent')
        // let responseData = await data.json()
   
        return Response.json(data, {
            status: 200,
        })
    } catch (error) {
        return Response.json("Error login, not an admin.", {
            status: 401,
        })
    }
  }

export async function POST (request) {
    try {
        await mongooseConnect();
        await isAdminRequest();
      
         const {name,parentCategory,properties} = request.body;
          const categoryDoc = await Category.create({
            name,
            parent: parentCategory || undefined,
            properties,
          });
        return Response.json(categoryDoc, {
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
    
        const {name,parentCategory,properties,_id} = request.body;
            const categoryDoc = await Category.updateOne({_id},{
              name,
              parent: parentCategory || undefined,
              properties,
            });
        return Response.json(categoryDoc, {
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
    
        const {_id} = request.query;
        await Category.deleteOne({_id});
        return Response.json('ok', {
            status: 200,
        });
    } catch (error) {
        return Response.json("Something went wrong.", {
            status: 500,
        })
    }
}