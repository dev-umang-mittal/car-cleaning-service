const baseUrl = "http://localhost:8000/"

export async function invoke(url, params) {
    try {
        const responseObj = await window.fetch(baseUrl + url, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        if (!responseObj.ok) {
            throw new Error(`Response status: ${responseObj.status}`);
        }
        const response = await responseObj.json();
        console.log(response);
        return response;
    } catch (e) {
        console.log("🚀 ~ invoke ~ e:", e?.message);
        alert('Invalid Credentails');
    }
}

export async function fetch(url, params={}){
    try {
        let queryParams = "";
        Object.keys(params).forEach((key, index) => {
            if(index!==0) queryParams += "&";
            queryParams+=`${key}=${params[key]}`;
        });
        console.log("🚀 ~ fetch ~ queryParams:", queryParams)
        const responseObj = await window.fetch(`${baseUrl}${url}?${queryParams}`);
        if (!responseObj?.ok) {
            throw new Error(`Response status: ${responseObj?.status || 400}`);
        }
        const response = await responseObj.json();
        console.log(response);
        return response;
    } catch (e) {
        console.log("🚀 ~ invoke ~ e:", e.message);
        // alert('Invalid Credentails');
    }
}

export function validateSchema(schema, object) {
    for (let key in schema) {
        const fieldSchema = schema[key];
        const value = object[key];
        if (fieldSchema?.required && !value) throw new Error(`${key} is required`);
    }
    return true;
}