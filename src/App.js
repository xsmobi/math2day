import { useState, useEffect } from "react";
//import "./App.css";

const query = `
{
  pageCollection(where: { title_contains: "Seite" }) {
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
  const [pages, setPages] = useState([]); // Changed to pages to indicate it's an array

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
        } else {
          setPages(data.pageCollection.items); // Set the array of pages
        }
      });
  }, []);

  if (pages.length === 0) {
    return "Loading...";
  }

  // render the fetched Contentful data
  return (
    <div className="App">
      {pages.map((page, index) => (
        <div key={index} className="App-header">
          {page.logo && page.logo.url && (
            <img src={page.logo.url} className="App-logo" alt="logo" />
          )}
          <p>{page.title}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
