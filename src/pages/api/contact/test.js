// src/pages/api/test.js
export async function POST({ request }) {
  console.log('Test endpoint called');
  
  try {
    const data = await request.json();
    console.log('Received data:', data);
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Test endpoint works!',
      receivedData: data
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Test endpoint error: ' + error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify({
    message: 'Test endpoint is working via GET'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}