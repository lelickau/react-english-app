export  const createClassNamesProgressBarData = (numOfQuestions: number) => {
    const barData: string[] = []
    for (let i = 0; i < numOfQuestions; i++) {
        if (i === 0) barData.push('progress__start')
        if (i === numOfQuestions - 1) barData.push('progress__end')
        if (i !== 0 && i !== numOfQuestions - 1) barData.push('progress__middle')
    }
    return barData
}