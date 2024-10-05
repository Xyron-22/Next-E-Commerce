
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export async function GET(request) {
    console.log(request)
    return Response.json({ name: 'John Doe' }, {
        status: 200,
    })
  }
  