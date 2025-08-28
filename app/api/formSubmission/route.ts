
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongoose';
import FormSubmission from '../../../models/formSubmission';
import type { IFormSubmission } from '../../../types/form';

export async function POST(request: Request) {
  try {
    // Connect to database
    await dbConnect();
    console.log(request);
    // Get request body with error handling
    let body: IFormSubmission;
    try {
      body = await request.json() as IFormSubmission;
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      return NextResponse.json({
        success: false,
        message: 'Invalid JSON in request body'
      }, { status: 400 });
    }

    // Enhanced logging for debugging
    console.log('Received body:', JSON.stringify(body, null, 2));
    console.log('Email check:', body.email, typeof body.email);
    console.log('RollNo check:', body.rollNo, typeof body.rollNo);

    // Improved validation - check for empty strings and whitespace
    const email = body.email?.toString().trim();
    const rollNo = body.rollNo?.toString().trim();

    if (!email || !rollNo) {
      console.log('Validation failed - missing required fields');
      console.log('Email:', email, 'RollNo:', rollNo);
      return NextResponse.json({
        success: false,
        message: 'Email and Roll Number are required',
        debug: {
          emailProvided: !!email,
          rollNoProvided: !!rollNo,
          emailValue: email,
          rollNoValue: rollNo
        }
      }, { status: 400 });
    }

    // Clean the data before saving
    const cleanedBody = {
      ...body,
      email: email,
      rollNo: rollNo,
      // Ensure year is properly set
      year: body.year || ' '
    };

    // Create new form submission
    const formSubmission = new FormSubmission(cleanedBody);

    // Save to database (this will trigger validation)
    const savedSubmission = await formSubmission.save();

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      data: {
        id: savedSubmission._id.toString(),
        email: savedSubmission.email,
        rollNo: savedSubmission.rollNo,
        createdAt: savedSubmission.createdAt
      }
    }, { status: 201 });

  } catch (error: any) {
    console.error('Database error:', error);

    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors: string[] = Object.values(error.errors).map((err: any) => err.message);
      console.log('Mongoose validation errors:', validationErrors);
      return NextResponse.json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      }, { status: 400 });
    }

    // Handle duplicate key errors (unique constraint violations)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern || {})[0] || 'field';
      console.log('Duplicate key error for field:', field);
      return NextResponse.json({
        success: false,
        message: `A user with this ${field} already exists`,
        field: field
      }, { status: 409 });
    }

    // Handle MongoDB connection errors
    if (error.name === 'MongoNetworkError' || error.name === 'MongoServerError') {
      console.log('MongoDB connection error:', error.message);
      return NextResponse.json({
        success: false,
        message: 'Database connection failed'
      }, { status: 503 });
    }

    // Handle other errors
    console.log('Unexpected error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: 'Something went wrong'
    }, { status: 500 });
  }
}