import { createSubscriber } from '../../lib/redisPubSub';
import { getCart } from '../../lib/cartservice';

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  // Retrieve the userId from the query (you could also use sessions).
  const { userId } = req.query;
  if (!userId) {
    console.error("Missing userId in SSE endpoint");
    res.status(400).json({ error: 'Missing userId query parameter' });
    return;
  }
  // Set the SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.write('\n');

  try {
    // Fetch initial cart state from DB or Redis cache
    const cartData = await getCart(userId); 
    const initialQuantity = cartData.cart.reduce((sum, curr) => sum + curr.quantity, 0);
    const productIds = cartData.cart.map(item => item.productId);

    // Send initial totalQuantity to client
    res.write(`data: ${JSON.stringify({ sseData: { totalQuantity: initialQuantity, productId: productIds }})}\n\n`);
    res.flush();
  } catch (error) {
    console.error("[SSE] Failed to fetch initial cart data:", error);
  }

  // Create a separate subscriber connection.
  const redisSubscriber = createSubscriber();
  const channel = `cart-updates:${userId}`;

  // Subscribe to the channel.
  redisSubscriber.subscribe(channel, (err, count) => {
    if (err) {
      console.error("[SSE] Failed to subscribe:", err);
      res.end();
    } else {
      console.log(`[SSE] Subscribed to channel: ${channel}`);
    }
  });

  // When a new message comes on the channel, send it via SSE.
  redisSubscriber.on('message', (_channel, message) => {
    const parsedMessage = JSON.parse(message);
    res.write(`data: ${JSON.stringify({ sseData: parsedMessage })}\n\n`);
    res.flush();
  });
  
  // Clean up when the client disconnects.
  req.on('close', () => {
    redisSubscriber.disconnect();
    res.end();
  });
}