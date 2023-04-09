import { BigCommerceApiClient } from "bigcommerce-api-client";
import { PaginatedData } from "bigcommerce-api-client/lib/model/common";
import { product_Full } from "bigcommerce-api-client/lib/model/generated/catalog.v3";

const bigCommerceApiClient = new BigCommerceApiClient({
    accessToken: "xxxxx",
    storeHash: "xxxxx",
});

async function test() {
    try {
        const results: PaginatedData<product_Full> =
            await bigCommerceApiClient.catalog.products.getAllProducts({
                include: ["images", "custom_fields", "options", "modifiers", "variants"]
            }, 1, 1000);

        console.log(
            JSON.stringify(results.data?.length)
        );
    } catch (err: any) {
        console.log(err.message, err);
    }
    return;
}

test();
