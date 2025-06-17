export async function GET() {
  return new Response("Hello from nextjs route handler",{
    status: 200
  });
} 

export async function POST() {
    return new Response("Thankyou for posying handler",{
      status: 200
    });
  } 
  
  