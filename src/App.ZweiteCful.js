import { useState, useEffect } from "react";
//import "./App.css";


//pageCollection {
const query = `
{
    pageCollection(where: { title_contains: "zweite" }) {
    items {
      title
      logo {
        url
      }
    }
  }
}
`;

function App() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    window
      .fetch(`https://graphql.contentful.com/content/v1/spaces/0b9irpaeq8gq/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 2ceb4b385ed34a86b131a37f0ef7f3cf89b06fb7b5516385da2846d79ca5d91a",
        },
        body: JSON.stringify({ query }),
      })
      .then((response) => response.json())
      .then(({ data, errors }) => {
        if (errors) {
          console.error(errors);
        }

        setPage(data.pageCollection.items[0]);
  
      });
  }, []);

  if (!page) {
    return "Loading...";
  }

  // render the fetched Contentful data
  return (
    <div className="App">
      <header className="App-header">
        <img src={page.logo.url} className="App-logo" alt="logo" />
        <p>{page.title}</p>
      </header>
    </div>
  );
}

export default App;