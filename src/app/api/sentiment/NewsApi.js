import axios from 'axios';

// Your NewsAPI key
const API_KEY = '3d266328613541008fa83e545942dc85';
const BASE_URL = 'https://newsapi.org/v2/everything';

/**
 * Fetches the top 10 news articles for a given cryptocurrency.
 * @param {string} cryptoName - The name of the cryptocurrency.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of objects containing article titles, links, and images.
 */
export default async function fetchCryptoNews(cryptoName) {
  try {
    // Make API request to NewsAPI
    const response = await axios.get(BASE_URL, {
      params: {
        q: `"${cryptoName}"`, // Search for exact phrase
        apiKey: API_KEY,
        sortBy: 'relevancy',
        pageSize: 20, // Fetch more articles initially
        language: 'en', // Filter by English articles if needed
      },
    });

    // Extract articles and map to desired format
    let articles = response.data.articles;

    // Filter out articles that don't mention the cryptocurrency name in the title or description
    articles = articles.filter(article => 
      article.title.toLowerCase().includes(cryptoName.toLowerCase()) || 
      (article.description && article.description.toLowerCase().includes(cryptoName.toLowerCase()))
    );

    // Limit to top 10 relevant articles
    const newsDetails = articles.slice(0, 10).map(article => ({
      title: article.title,
      url: article.url,
      image: article.urlToImage || 'No image available',
    }));

    return newsDetails;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

// Example usage
// (Uncomment and use in your application)
// fetchCryptoNews('Bitcoin').then(news => {
//   console.log('Top 10 News Articles:', news);
// });
