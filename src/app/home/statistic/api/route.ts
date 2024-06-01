const BASE_URI = 'http://localhost:8080'

export async function getAllStatisticYear() {
    const response = await fetch(`${BASE_URI}/api/statistic/year/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.json()
}

export async function getMonthlyStatisticByYear(year: number) {
    const response = await fetch(`${BASE_URI}/api/statistic/monthly/${year}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.json()
}

export async function getYearlyStatistic() {
    const response = await fetch(`${BASE_URI}/api/statistic/yearly`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.json()
}

export async function getDailyStatisticByMonth(month: string) {
    const response = await fetch(`${BASE_URI}/api/statistic/daily?month=${month}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.json()
}