import { SentimentAnalyzer, PorterStemmer } from 'natural';

const findSentimentalAnalysisScore=(review:string)=>{
    const arrayreview=review.split(" ")
    const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');
    const sentimentScore = analyzer.getSentiment(arrayreview);
    let score: number;
    if (sentimentScore > 0.5) {
        score = 5;
    } else if (sentimentScore > 0) {
        score = 3.5;
    } else if (sentimentScore > -0.5) {
        score = 2;
    } else {
        score = 0.5;
    }
    return score
}

export {findSentimentalAnalysisScore}

