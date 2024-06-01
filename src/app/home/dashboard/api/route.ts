const BASE_URI = 'http://localhost:8080'

export async function getNumberOfCategory() {
    const response = await fetch(`${BASE_URI}/api/category/numberOfCategory`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.json()
}

export async function getNumberOfProduct() {
    const response = await fetch(`${BASE_URI}/api/product/numberOfProduct`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.json()
}