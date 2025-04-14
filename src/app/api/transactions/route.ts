'use server';

import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri!, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(e){
    console.log(e)
  }
}
run().catch(console.dir);

export async function POST(req: Request, res: NextResponse) {
  try {
    const body = await req.json();
    // Validate the body as needed
    const db = client.db('expense_tracker');
    const transactions = db.collection('transactions');
    const result = await transactions.insertOne(body);

    return NextResponse.json({ result }, { status: 201 });
  } catch (e) {
    console.error("Error adding transaction:", e);
    return NextResponse.json({ error: "Failed to add transaction" }, { status: 500 });
  }
}

export async function GET(req: Request, res: NextResponse) {
  try {
    const db = client.db('expense_tracker');
    const transactions = db.collection('transactions');
    const allTransactions = await transactions.find({}).toArray();

    return NextResponse.json(allTransactions, { status: 200 });
  } catch (e) {
    console.error("Error getting transactions:", e);
    return NextResponse.json({ error: "Failed to get transactions" }, { status: 500 });
  }
}

export async function DELETE(req: Request, res: NextResponse) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const db = client.db('expense_tracker');
    const transactions = db.collection('transactions');
    const result = await transactions.deleteOne({ _id:id });

    return NextResponse.json({ result }, { status: 200 });
  } catch (e) {
    console.error("Error deleting transaction:", e);
    return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
  }
}
