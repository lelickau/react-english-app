import results from 'data/test-results.json'

export const getResult = (testName: string, points: number) => {
    return results
                .filter(item => item.test === testName)
                .filter(r => r.max >= points && r.min <= points)
}