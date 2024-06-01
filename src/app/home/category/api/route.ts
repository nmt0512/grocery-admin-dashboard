const BASE_URI = 'http://localhost:8080'

export async function deleteCategoryById(id: number) {
    const response = await fetch(`${BASE_URI}/api/category/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.json()
}

export async function createCategory(formData: FormData) {
    const response = await fetch(`${BASE_URI}/api/category/create`, {
        method: 'POST',
        body: formData
    })
    return await response.json()
}

export async function updateCategory(formData: FormData) {
    const response = await fetch(`${BASE_URI}/api/category/update`, {
        method: 'PUT',
        body: formData
    })
    return await response.json()
}