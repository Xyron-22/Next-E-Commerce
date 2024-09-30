import {Category} from "@/models/Category";
import {mongooseConnect} from "@/lib/mongoose";
import { getServerSession } from "next-auth/next"
import {authOptions, isAdminRequest, adminEmails} from "@/app/api/auth/[...nextauth]/route";

// export async function handle(req, res) {
//   const {method} = req;

//   await mongooseConnect();
//   await isAdminRequest(req,res);

//   if (method === 'GET') {
//     res.json(await Category.find().populate('parent'));
//   }

//   if (method === 'POST') {
//     const {name,parentCategory,properties} = req.body;
//     const categoryDoc = await Category.create({
//       name,
//       parent: parentCategory || undefined,
//       properties,
//     });
//     res.json(categoryDoc);
//   }

//   if (method === 'PUT') {
//     const {name,parentCategory,properties,_id} = req.body;
//     const categoryDoc = await Category.updateOne({_id},{
//       name,
//       parent: parentCategory || undefined,
//       properties,
//     });
//     res.json(categoryDoc);
//   }

//   if (method === 'DELETE') {
//     const {_id} = req.query;
//     await Category.deleteOne({_id});
//     res.json('ok');
//   }
// }

// export async function GET (req, res) {
//     await mongooseConnect();
//     console.log("test")
//     // await isAdminRequest()
//     const session = await getServerSession(authOptions);
//     console.log("test2")
//     if (!adminEmails.includes(session?.user?.email)) {
//     //   res.status(401);
//     //   res.end();
//       throw 'not an admin';
//     }
    
//     res.json(await Category.find().populate('parent'));
// }

 
export async function GET(request) {
    try {
        await mongooseConnect();
        await isAdminRequest();
        let data = await Category.find().populate('parent')
        let responseData = await data.json()
   
        return Response.json(responseData, {
            status: 200,
        })
    } catch (error) {
        console.log(error)
        return Response.json("Error login, not an admin")
    }
  }

// export async function POST (req, res) {
//   await mongooseConnect();
//   await isAdminRequest();

//    const {name,parentCategory,properties} = req.body;
//     const categoryDoc = await Category.create({
//       name,
//       parent: parentCategory || undefined,
//       properties,
//     });
//     res.json(categoryDoc);
// }

// export async function PUT (req, res) {
//     await mongooseConnect();
//     await isAdminRequest();

//     const {name,parentCategory,properties,_id} = req.body;
//         const categoryDoc = await Category.updateOne({_id},{
//           name,
//           parent: parentCategory || undefined,
//           properties,
//         });
//         res.json(categoryDoc);
// }

// export async function DELETE () {
//     await mongooseConnect();
//     await isAdminRequest();

//     const {_id} = req.query;
//     await Category.deleteOne({_id});
//     res.json('ok');
// }