import { supabase } from "@/utils/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { productId, quantity, color, price, image_url } = await request.json();
  console.log({ productId, quantity, color, price, image_url });

  const { data: existingItems, error: findError } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("product_id", productId)
    .eq("color", color)
    .limit(1);

  if (findError) {
    return NextResponse.json({ error: findError.message }, { status: 500 });
  }

  if (existingItems && existingItems.length > 0) {
    const existingItem = existingItems[0];
    const newQuantity = existingItem.quantity + quantity;
    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("id", existingItem.id)
      .select();
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  } else {
    const { data, error } = await supabase
      .from("cart_items")
      .insert([{ product_id: productId, quantity, color, price, image_url }]);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ data });
  }
}

export async function GET() {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      "id, quantity, color, price, image_url, product_id, products(name)"
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result = data.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    color: item.color,
    price: item.price,
    image_url: item.image_url,
    product_id: item.product_id,
    name: item.products?.[0]?.name || "",
  }));

  return NextResponse.json(result);
}
export async function PATCH(request: NextRequest) {
  const { id, quantity } = await request.json();

  const { data, error } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function DELETE(request: NextRequest) {
  const { id } = await request.json();

  const { data, error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
