const averagefinder=(reviews:[{review:string,score:number}])=>{
    const sumOfScores = reviews.reduce((total, review) => total + review.score, 0)
    const averageScore = sumOfScores / reviews.length;
    return averageScore
}

export {averagefinder}