## PreRead

Lets refresh the mind with some react basics before looking into the project

### Using the react Router

#### Install React Router

```cmd
npm install react-router-dom
```

#### Set Up the Router

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
```

#### Create Component Pages

```jsx
// home.jsx
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/about">Go to About</Link>
    </div>
  );
}

export default Home;
```

```jsx
//about.jsx
import { Link } from "react-router-dom";

function About() {
  return (
    <div>
      <h1>About Page</h1>
      <Link to="/">Go to Home</Link>
    </div>
  );
}

export default About;
```

#### Navigation using Link and useNavigate.

- The `<a>` tag reloads the page, we can use the link or useNavigate for better performance of the web UI.

using Link

```jsx
<Link to="/about">Go to About</Link>
```

using use Navigate to dynamically navigate.

```jsx
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={() => navigate("/about")}>Go to About</button>
    </div>
  );
}

export default Home;
```

#### Dynamic Routes (URL Parameters)

You can define routes with parameters like /profile/:id.

Profile.js

```jsx
import { useParams } from "react-router-dom";

function Profile() {
  const { id } = useParams(); // Extracts the "id" from the URL

  return <h1>Profile Page - ID: {id}</h1>;
}

export default Profile;
```

```jsx
<Route path="/profile/:id" element={<Profile />} />
```

#### Lazy Loading with react suspense

```jsx
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Suspense>
  );
}
```
