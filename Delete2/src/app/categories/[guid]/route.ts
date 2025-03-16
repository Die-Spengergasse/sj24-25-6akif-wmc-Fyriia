// src/app/api/categories/[guid]/route.ts

import { NextResponse } from "next/server";
import { axiosInstance, createErrorResponse } from "@/app/utils/apiClient";

export async function DELETE(
    request: Request,
    { params }: { params: { guid: string } }
) {
    const { guid } = params;

    try {
        // Make your backend request with axios
        await axiosInstance.delete(`categories/${guid}`);

        // If you need to revalidate, you can do that here:
        // revalidatePath("/categories");

        // Return success
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
        // Return an error in JSON
        return NextResponse.json(createErrorResponse(error), { status: 500 });
    }
}
