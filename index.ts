import { BigCommerceApiClient } from "bigcommerce-api-client";
import { PaginatedData } from "bigcommerce-api-client/lib/model/common";
import { product_Full } from "bigcommerce-api-client/lib/model/generated/catalog.v3";
import { order_Resp } from "bigcommerce-api-client/lib/model/generated/orders.v2.oas2";

const bigCommerceApiClient = new BigCommerceApiClient({
    accessToken: "XXXXX",
    storeHash: "XXXXX",
});

async function test() {
    try {
        const results: PaginatedData<product_Full> =
            await bigCommerceApiClient.catalog.products.getAllProducts({
                "date_modified:max": new Date(),
            });

        console.log(
            results.data && results.data[0].date_created?.toLocaleString()
        );

        const results2: order_Resp = await bigCommerceApiClient.orders.getOrder(
            200113
        );

        console.log(results2);
    } catch (err: any) {
        console.log(err.message, err);
    }
    return;
}

test();
