const BASE_URI = 'http://localhost:8080'

export async function getProductByCategoryId(categoryId: number) {
    const response = await fetch(`${BASE_URI}/api/product/category?categoryId=${categoryId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.json()
}

export async function getAllCategory() {
    const response = await fetch(`${BASE_URI}/api/category/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.json()
}

export async function deleteProductById(id: number) {
    const response = await fetch(`${BASE_URI}/api/product/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.json()
}

export async function createProduct(formData: FormData) {
    const response = await fetch(`${BASE_URI}/api/product/create`, {
        method: 'POST',
        body: formData
    })
    return await response.json()
}

export async function updateProduct(formData: FormData) {
    const response = await fetch(`${BASE_URI}/api/product/update`, {
        method: 'PUT',
        body: formData
    })
    return await response.json()
}