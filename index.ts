import { BigCommerceApiClient } from "bigcommerce-api-client";
import { Cart_Line_Item_Update_Post } from "bigcommerce-api-client/lib/model/generated/carts.v3";

const CART_ID = "XXXXXXXXXXXXXXXXXXXXXXX";
const bigCommerceApiClient = new BigCommerceApiClient({
    accessToken: "XXXXXXXXXXXXXXXXXXXXXX",
    storeHash: "XXXXXXXXXXXXXXXXXXXXXX",
});

async function test() {
    const start = new Date();
    try {
        const addToCartLineItems: Cart_Line_Item_Update_Post = {
            line_items: [],
        };
        const allProducts =
            await bigCommerceApiClient.catalog.products.getAllProducts(
                {
                    include_fields: ["id"],
                    is_visible: true,
                    availability: "available",
                },
                1,
                -1
            );

        if (allProducts.data) {
            for (let product of allProducts.data) {
                const allVariants =
                    await bigCommerceApiClient.catalog.productVariants.getAllVariants(
                        product.id as number,
                        {
                            include_fields: [
                                "id",
                                "sku",
                                "inventory_level",
                                "purchasing_disabled",
                            ],
                        },
                        1,
                        -1
                    );

                if (allVariants.data) {
                    for (let variant of allVariants.data) {
                        if (
                            variant.inventory_level &&
                            !variant.purchasing_disabled
                        ) {
                            console.log(
                                `/cart.php?action=add&sku=${variant.sku}`
                            );

                            if (
                                (addToCartLineItems.line_items?.length || 0) <
                                150
                            ) {
                                addToCartLineItems.line_items?.push({
                                    quantity: 1,
                                    product_id: product.id,
                                    variant_id: variant.id,
                                });
                            }
                        }
                    }
                }
            }

            console.log(JSON.stringify(addToCartLineItems));

            await bigCommerceApiClient.carts.items.addCartLineItems(
                CART_ID,
                addToCartLineItems
            );
        }

        console.log(
            `Time lapsed: ${
                (new Date().getTime() - start.getTime()) / 1000
            } sec`
        );
    } catch (err: any) {
        console.log(err.message, err);
    }
    return;
}

test();
